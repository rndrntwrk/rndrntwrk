import { writeFile } from "node:fs/promises";

const typing =
  "https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=22&pause=950&duration=2900&color=0969DA&center=true&vCenter=true&random=false&width=920&lines=building+infrastructure+for+human+and+agent+media;accelerating+the+abundance+economy+through+rndrntwrk+protocol;contributing+to+hyperia%2C+milady%2C+and+elizaos";

const streakLight =
  "https://streak-stats.demolab.com?user=rndrntwrk&hide_border=true&border_radius=4.5&card_width=980&background=00000000&stroke=D1D9E0&ring=0969DA&fire=0969DA&currStreakNum=0969DA&sideNums=24292F&currStreakLabel=57606A&sideLabels=57606A&dates=57606A";

const streakDark =
  "https://streak-stats.demolab.com?user=rndrntwrk&hide_border=true&border_radius=4.5&card_width=980&background=00000000&stroke=30363D&ring=58A6FF&fire=58A6FF&currStreakNum=58A6FF&sideNums=F0F6FC&currStreakLabel=9198A1&sideLabels=9198A1&dates=9198A1";

const links = {
  site: "https://rndrntwrk.com",
  docs: "https://docs.rndrntwrk.com",
  x: "https://twitter.com/enoomian",
  renderOrg: "https://github.com/Render-Network-OS",
  stream: "https://github.com/rndrntwrk/stream-plugin",
  arcade: "https://github.com/rndrntwrk/555-arcade-plugin",
  milaidy: "https://github.com/rndrntwrk/milaidy",
  eliza: "https://github.com/elizaOS/eliza",
  characterStudio: "https://github.com/rndrntwrk/CharacterStudio",
  unreal: "https://github.com/rndrntwrk/fal-3d-unreal",
  sw4p: "https://github.com/rndrntwrk/sw4p-docs",
  hyperbet: "https://github.com/rndrntwrk/hyperbet",
};

const readme = [
  '<div align="center">',
  "",
  "# (enoomian)",
  "",
  `[![Typing SVG](${typing})](https://git.io/typing-svg)`,
  "",
  "**systems for live environments where attention, play, identity, and value share one programmable state.**",
  "",
  '<p>',
  `  <a href="${links.site}"><img src="https://img.shields.io/badge/rndrntwrk-0969DA?style=flat&logo=githubpages&logoColor=white" alt="rndrntwrk" /></a>`,
  `  <a href="${links.docs}"><img src="https://img.shields.io/badge/protocol_docs-24292f?style=flat&logo=readthedocs&logoColor=white" alt="docs" /></a>`,
  `  <a href="${links.x}"><img src="https://img.shields.io/badge/@enoomian-000000?style=flat&logo=x&logoColor=white" alt="x" /></a>`,
  "</p>",
  "",
  "</div>",
  "",
  '<p align="center">',
  '  <img src="./assets/rndrntwrk-loop.svg" alt="Animated infrastructure loop for human and agent media" width="100%" />',
  "</p>",
  "",
  "## Core Interest",
  "",
  "> Live media is becoming infrastructure: a place where people and software operators coordinate, where participation has state, and where value can route through what happens in the moment.",
  "",
  "| Focus | Why it matters |",
  "| --- | --- |",
  "| Human and agent media | The next surface is not passive content. It is operated, responsive, and shared between people and agents. |",
  "| Verifiable participation | Attention, play, and contribution need stronger primitives than screenshots, vanity metrics, or platform dashboards. |",
  "| Abundance economy | The goal is more creation, more coordination, and more distribution without trapping value inside closed platforms. |",
  "| Protocol-shaped systems | The interface can change, but state, identity, rewards, and settlement need durable rails underneath. |",
  "",
  "## Activity",
  "",
  "<picture>",
  '  <source media="(prefers-color-scheme: dark)" srcset="./profile-3d-contrib/profile-night-green.svg">',
  '  <img src="./profile-3d-contrib/profile-green-animate.svg" alt="3D GitHub contribution calendar" width="100%">',
  "</picture>",
  "",
  "<picture>",
  `  <source media="(prefers-color-scheme: dark)" srcset="${streakDark}">`,
  `  <img src="${streakLight}" alt="GitHub contribution streak" width="100%">`,
  "</picture>",
  "",
  "## Current Throughline",
  "",
  "| I am looking for | Because |",
  "| --- | --- |",
  "| Protocol-minded system designers | The interface should feel immediate while the system underneath remains inspectable. |",
  "| Open-source contributors | The best primitives should be reusable, forkable, and legible. |",
  "| Weird but serious experiments | The abundance economy needs high-agency systems that are useful before they are obvious. |",
  "",
].join("\n");

const preview = String.raw`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>rndrntwrk profile preview</title>
    <style>
      :root {
        color-scheme: light dark;
        --bg: #ffffff;
        --text: #1f2328;
        --muted: #59636e;
        --border: #d1d9e0;
        --canvas: #f6f8fa;
        --link: #0969da;
        --soft: #f6f8fa;
        --accent: #0969da;
      }
      @media (prefers-color-scheme: dark) {
        :root {
          --bg: #0d1117;
          --text: #f0f6fc;
          --muted: #9198a1;
          --border: #3d444d;
          --canvas: #010409;
          --link: #4493f8;
          --soft: #151b23;
          --accent: #4493f8;
        }
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        background: var(--canvas);
        color: var(--text);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif;
        line-height: 1.5;
      }
      main {
        width: min(980px, calc(100vw - 32px));
        margin: 32px auto;
        padding: 32px;
        border: 1px solid var(--border);
        border-radius: 6px;
        background: var(--bg);
      }
      h1 {
        margin: 0 0 12px;
        padding-bottom: .3em;
        border-bottom: 1px solid var(--border);
        font-size: clamp(2rem, 6vw, 3.4rem);
        line-height: 1.05;
        letter-spacing: 0;
      }
      h2 {
        margin: 34px 0 14px;
        padding-bottom: .3em;
        border-bottom: 1px solid var(--border);
        font-size: 1.32rem;
      }
      p { margin: 0 0 16px; }
      a { color: var(--link); text-decoration: none; }
      a:hover { text-decoration: underline; }
      img { max-width: 100%; vertical-align: middle; }
      table {
        display: block;
        width: 100%;
        overflow: auto;
        border-spacing: 0;
        border-collapse: collapse;
      }
      th,
      td {
        padding: 9px 12px;
        border: 1px solid var(--border);
        vertical-align: top;
      }
      th { font-weight: 600; background: var(--soft); }
      blockquote {
        margin: 0 0 18px;
        padding: 0 1em;
        color: var(--muted);
        border-left: .25em solid var(--border);
        font-size: 1.05rem;
      }
      .center { text-align: center; }
      .lede {
        max-width: 780px;
        margin: 0 auto 16px;
        font-size: 1.03rem;
      }
      .badge-row {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 7px;
        margin: 12px 0 22px;
      }
      .hero-art,
      .full-img {
        display: block;
        width: 100%;
        margin: 16px 0 0;
      }
      .proof-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 10px;
      }
      .proof-grid img {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        border: 1px solid var(--border);
        border-radius: 6px;
        background: var(--soft);
      }
      @media (max-width: 760px) {
        main {
          width: 100%;
          margin: 0;
          border: 0;
          border-radius: 0;
          padding: 20px;
        }
        .proof-grid { grid-template-columns: 1fr; }
      }
    </style>
  </head>
  <body>
    <main>
      <section class="center">
        <h1>(enoomian)</h1>
        <p><img src="${typing}" alt="Typing SVG"></p>
        <p class="lede"><strong>systems for live environments where attention, play, identity, and value share one programmable state.</strong></p>
        <div class="badge-row">
          <a href="${links.site}"><img src="https://img.shields.io/badge/rndrntwrk-0969DA?style=flat&logo=githubpages&logoColor=white" alt="rndrntwrk"></a>
          <a href="${links.docs}"><img src="https://img.shields.io/badge/protocol_docs-24292f?style=flat&logo=readthedocs&logoColor=white" alt="docs"></a>
          <a href="${links.x}"><img src="https://img.shields.io/badge/@enoomian-000000?style=flat&logo=x&logoColor=white" alt="x"></a>
        </div>
      </section>

      <img class="hero-art" src="./assets/rndrntwrk-loop.svg" alt="Animated infrastructure loop for human and agent media">

      <h2>Core Interest</h2>
      <blockquote>Live media is becoming infrastructure: a place where people and software operators coordinate, where participation has state, and where value can route through what happens in the moment.</blockquote>
      <table>
        <thead><tr><th>Focus</th><th>Why it matters</th></tr></thead>
        <tbody>
          <tr><td>Human and agent media</td><td>The next surface is not passive content. It is operated, responsive, and shared between people and agents.</td></tr>
          <tr><td>Verifiable participation</td><td>Attention, play, and contribution need stronger primitives than screenshots, vanity metrics, or platform dashboards.</td></tr>
          <tr><td>Abundance economy</td><td>The goal is more creation, more coordination, and more distribution without trapping value inside closed platforms.</td></tr>
          <tr><td>Protocol-shaped systems</td><td>The interface can change, but state, identity, rewards, and settlement need durable rails underneath.</td></tr>
        </tbody>
      </table>

      <h2>Activity</h2>
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="./profile-3d-contrib/profile-night-green.svg">
        <img src="./profile-3d-contrib/profile-green-animate.svg" alt="3D GitHub contribution calendar" class="full-img">
      </picture>
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="${streakDark}">
        <img src="${streakLight}" alt="GitHub contribution streak" class="full-img">
      </picture>

      <h2>Current Throughline</h2>
      <table>
        <thead><tr><th>I am looking for</th><th>Because</th></tr></thead>
        <tbody>
          <tr><td>Protocol-minded system designers</td><td>The interface should feel immediate while the system underneath remains inspectable.</td></tr>
          <tr><td>Open-source contributors</td><td>The best primitives should be reusable, forkable, and legible.</td></tr>
          <tr><td>Weird but serious experiments</td><td>The abundance economy needs high-agency systems that are useful before they are obvious.</td></tr>
        </tbody>
      </table>
    </main>
  </body>
</html>
`;

await writeFile(new URL("../README.md", import.meta.url), readme);
await writeFile(new URL("../preview.html", import.meta.url), preview);
