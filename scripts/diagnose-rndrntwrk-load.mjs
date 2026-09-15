import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const outputDir = path.resolve(process.env.OUTPUT_DIR || 'artifacts/rndrntwrk-load');
await fs.mkdir(outputDir, { recursive: true });

const compactHeaders = (headers = {}) => {
  const keep = [
    'server',
    'content-type',
    'content-length',
    'cache-control',
    'age',
    'etag',
    'location',
    'x-vercel-id',
    'x-vercel-cache',
    'x-matched-path',
    'x-nextjs-cache',
    'cf-cache-status',
    'cf-ray',
  ];
  return Object.fromEntries(keep.filter((key) => headers[key] !== undefined).map((key) => [key, headers[key]]));
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function snapshot(page, label) {
  const state = await page.evaluate(() => {
    const resourceEntries = performance.getEntriesByType('resource').map((entry) => ({
      name: entry.name,
      initiatorType: entry.initiatorType,
      duration: Number(entry.duration.toFixed(1)),
      transferSize: entry.transferSize,
      encodedBodySize: entry.encodedBodySize,
      decodedBodySize: entry.decodedBodySize,
    }));

    const nextDataRaw = document.getElementById('__NEXT_DATA__')?.textContent || null;
    let nextData = null;
    if (nextDataRaw) {
      try {
        const parsed = JSON.parse(nextDataRaw);
        nextData = {
          buildId: parsed.buildId,
          page: parsed.page,
          query: parsed.query,
          runtimeConfig: parsed.runtimeConfig,
          assetPrefix: parsed.assetPrefix,
          isFallback: parsed.isFallback,
          isExperimentalCompile: parsed.isExperimentalCompile,
          dynamicIds: parsed.dynamicIds,
          gip: parsed.gip,
          appGip: parsed.appGip,
        };
      } catch (error) {
        nextData = { parseError: String(error), rawPrefix: nextDataRaw.slice(0, 500) };
      }
    }

    const storage = { local: {}, session: {} };
    try {
      for (let i = 0; i < localStorage.length; i += 1) {
        const key = localStorage.key(i);
        storage.local[key] = localStorage.getItem(key)?.slice(0, 500);
      }
    } catch (error) {
      storage.localError = String(error);
    }
    try {
      for (let i = 0; i < sessionStorage.length; i += 1) {
        const key = sessionStorage.key(i);
        storage.session[key] = sessionStorage.getItem(key)?.slice(0, 500);
      }
    } catch (error) {
      storage.sessionError = String(error);
    }

    const elementSummary = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const style = getComputedStyle(element);
      return {
        selector,
        tag: element.tagName,
        childElementCount: element.childElementCount,
        textPrefix: element.textContent?.trim().slice(0, 1000) || '',
        display: style.display,
        visibility: style.visibility,
        opacity: style.opacity,
        width: element.getBoundingClientRect().width,
        height: element.getBoundingClientRect().height,
      };
    };

    return {
      label,
      timestamp: new Date().toISOString(),
      href: location.href,
      origin: location.origin,
      title: document.title,
      readyState: document.readyState,
      bodyText: document.body?.innerText?.slice(0, 20000) || '',
      bodyTextLength: document.body?.innerText?.length || 0,
      bodyChildCount: document.body?.childElementCount || 0,
      htmlClass: document.documentElement.className,
      bodyClass: document.body?.className || '',
      scripts: [...document.scripts].map((script) => ({
        src: script.src || null,
        type: script.type || null,
        async: script.async,
        defer: script.defer,
        noModule: script.noModule,
        integrity: script.integrity || null,
        crossOrigin: script.crossOrigin || null,
        inlineLength: script.src ? 0 : script.textContent?.length || 0,
        inlinePrefix: script.src ? null : script.textContent?.slice(0, 300) || null,
      })),
      stylesheets: [...document.querySelectorAll('link[rel="stylesheet"]')].map((link) => ({
        href: link.href,
        media: link.media || null,
        integrity: link.integrity || null,
        crossOrigin: link.crossOrigin || null,
      })),
      preloads: [...document.querySelectorAll('link[rel="preload"], link[rel="modulepreload"]')].map((link) => ({
        rel: link.rel,
        href: link.href,
        as: link.as || null,
        type: link.type || null,
      })),
      roots: [
        elementSummary('#__next'),
        elementSummary('#root'),
        elementSummary('[data-reactroot]'),
        elementSummary('main'),
      ].filter(Boolean),
      nextData,
      resourceEntries,
      storage,
      serviceWorkerController: Boolean(navigator.serviceWorker?.controller),
      serviceWorkerSupported: 'serviceWorker' in navigator,
      userAgent: navigator.userAgent,
      viewport: { width: innerWidth, height: innerHeight, devicePixelRatio },
    };
  }, label);

  await fs.writeFile(path.join(outputDir, `${label}.json`), JSON.stringify(state, null, 2));
  await fs.writeFile(path.join(outputDir, `${label}.html`), await page.content());
  await page.screenshot({ path: path.join(outputDir, `${label}.png`), fullPage: true });
  return state;
}

async function runScenario({ name, url, viewport, javaScriptEnabled = true, waits = [2_000, 10_000, 30_000] }) {
  const browser = await chromium.launch({
    headless: true,
    args: ['--disable-dev-shm-usage', '--no-sandbox'],
  });

  const context = await browser.newContext({
    viewport,
    javaScriptEnabled,
    serviceWorkers: 'block',
    ignoreHTTPSErrors: false,
    recordHar: {
      path: path.join(outputDir, `${name}.har`),
      content: 'embed',
      mode: 'full',
    },
  });

  await context.tracing.start({ screenshots: true, snapshots: true, sources: true });
  const page = await context.newPage();

  const events = {
    scenario: name,
    requestedUrl: url,
    javaScriptEnabled,
    viewport,
    startedAt: new Date().toISOString(),
    console: [],
    pageErrors: [],
    requestFailures: [],
    responses: [],
    dialogEvents: [],
    navigationError: null,
    navigationResponse: null,
    snapshots: [],
  };

  page.on('console', (message) => {
    events.console.push({
      atMs: Date.now(),
      type: message.type(),
      text: message.text(),
      location: message.location(),
    });
  });

  page.on('pageerror', (error) => {
    events.pageErrors.push({
      atMs: Date.now(),
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
  });

  page.on('requestfailed', (request) => {
    events.requestFailures.push({
      atMs: Date.now(),
      url: request.url(),
      method: request.method(),
      resourceType: request.resourceType(),
      failure: request.failure(),
    });
  });

  page.on('response', async (response) => {
    const request = response.request();
    const resourceType = request.resourceType();
    const status = response.status();
    if (status >= 400 || ['document', 'script', 'stylesheet', 'xhr', 'fetch', 'font'].includes(resourceType)) {
      let headers = {};
      try {
        headers = await response.allHeaders();
      } catch {
        // Ignore header-read races during browser shutdown.
      }
      events.responses.push({
        atMs: Date.now(),
        url: response.url(),
        status,
        statusText: response.statusText(),
        ok: response.ok(),
        fromServiceWorker: response.fromServiceWorker(),
        resourceType,
        method: request.method(),
        headers: compactHeaders(headers),
      });
    }
  });

  page.on('dialog', async (dialog) => {
    events.dialogEvents.push({ type: dialog.type(), message: dialog.message(), defaultValue: dialog.defaultValue() });
    await dialog.dismiss();
  });

  const started = Date.now();
  try {
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    if (response) {
      events.navigationResponse = {
        url: response.url(),
        status: response.status(),
        statusText: response.statusText(),
        headers: compactHeaders(await response.allHeaders()),
      };
    }
  } catch (error) {
    events.navigationError = { name: error.name, message: error.message, stack: error.stack };
  }

  let elapsed = Date.now() - started;
  for (const targetWait of waits) {
    const remaining = targetWait - elapsed;
    if (remaining > 0) await sleep(remaining);
    elapsed = Date.now() - started;
    try {
      const state = await snapshot(page, `${name}-${Math.round(targetWait / 1000)}s`);
      events.snapshots.push({
        label: state.label,
        href: state.href,
        title: state.title,
        readyState: state.readyState,
        bodyTextLength: state.bodyTextLength,
        bodyTextPrefix: state.bodyText.slice(0, 1500),
        roots: state.roots,
        scripts: state.scripts,
        nextData: state.nextData,
      });
    } catch (error) {
      events.snapshots.push({ label: `${name}-${Math.round(targetWait / 1000)}s`, snapshotError: String(error) });
    }
  }

  events.finishedAt = new Date().toISOString();
  events.elapsedMs = Date.now() - started;
  events.finalUrl = page.url();
  await fs.writeFile(path.join(outputDir, `${name}-events.json`), JSON.stringify(events, null, 2));
  await context.tracing.stop({ path: path.join(outputDir, `${name}-trace.zip`) });
  await context.close();
  await browser.close();
  return events;
}

const scenarios = [
  {
    name: 'desktop-js',
    url: 'https://rndrntwrk.com/',
    viewport: { width: 1440, height: 1000 },
    javaScriptEnabled: true,
    waits: [2_000, 10_000, 30_000],
  },
  {
    name: 'mobile-js',
    url: 'https://www.rndrntwrk.com/',
    viewport: { width: 390, height: 844 },
    javaScriptEnabled: true,
    waits: [2_000, 10_000, 30_000],
  },
  {
    name: 'desktop-nojs',
    url: 'https://www.rndrntwrk.com/',
    viewport: { width: 1440, height: 1000 },
    javaScriptEnabled: false,
    waits: [2_000],
  },
];

const results = [];
for (const scenario of scenarios) {
  try {
    results.push(await runScenario(scenario));
  } catch (error) {
    results.push({ scenario: scenario.name, fatalError: { name: error.name, message: error.message, stack: error.stack } });
  }
}

const summary = {
  generatedAt: new Date().toISOString(),
  scenarios: results.map((result) => ({
    scenario: result.scenario,
    requestedUrl: result.requestedUrl,
    finalUrl: result.finalUrl,
    navigationError: result.navigationError,
    navigationResponse: result.navigationResponse,
    consoleErrors: result.console?.filter((entry) => entry.type === 'error') || [],
    consoleWarnings: result.console?.filter((entry) => entry.type === 'warning' || entry.type === 'warn') || [],
    pageErrors: result.pageErrors || [],
    requestFailures: result.requestFailures || [],
    badResponses: result.responses?.filter((entry) => entry.status >= 400) || [],
    scriptResponses: result.responses?.filter((entry) => entry.resourceType === 'script') || [],
    snapshots: result.snapshots || [],
    fatalError: result.fatalError,
  })),
};

await fs.writeFile(path.join(outputDir, 'summary.json'), JSON.stringify(summary, null, 2));
console.log('RNDRNTWRK_PROBE_SUMMARY_START');
console.log(JSON.stringify(summary, null, 2));
console.log('RNDRNTWRK_PROBE_SUMMARY_END');
