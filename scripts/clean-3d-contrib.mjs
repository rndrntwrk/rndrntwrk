import { readdir, readFile, writeFile } from "node:fs/promises";

const graphDir = new URL("../profile-3d-contrib/", import.meta.url);

function findGroupEnd(svg, start) {
  const tags = /<\/?g\b[^>]*>/g;
  tags.lastIndex = start;

  let depth = 0;
  let match;

  while ((match = tags.exec(svg))) {
    if (match[0].startsWith("</")) {
      depth -= 1;
    } else {
      depth += 1;
    }

    if (depth === 0) {
      return tags.lastIndex;
    }
  }

  throw new Error(`Unclosed SVG group at offset ${start}`);
}

function removeGroup(svg, marker) {
  const start = svg.indexOf(marker);

  if (start === -1) {
    return { svg, removed: false };
  }

  const end = findGroupEnd(svg, start);

  return {
    svg: `${svg.slice(0, start)}${svg.slice(end)}`,
    removed: true,
  };
}

const files = (await readdir(graphDir)).filter((file) => /^profile-.*\.svg$/.test(file));

for (const file of files) {
  const path = new URL(file, graphDir);
  let svg = await readFile(path, "utf8");
  let changed = false;

  const withoutLanguages = removeGroup(svg, '<g transform="translate(40, 520)">');
  svg = withoutLanguages.svg;
  changed = changed || withoutLanguages.removed;

  const withoutFooterStats = removeGroup(
    svg,
    '<g><text style="font-size: 32px; font-weight: bold;"',
  );
  svg = withoutFooterStats.svg;
  changed = changed || withoutFooterStats.removed;

  if (changed) {
    await writeFile(path, svg);
  }

  console.log(
    `${file}: languages=${withoutLanguages.removed ? "removed" : "missing"}, footer=${withoutFooterStats.removed ? "removed" : "missing"}`,
  );
}
