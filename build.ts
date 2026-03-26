import { Glob } from "bun";
import pkg from "./package.json" with { type: "json" };

/* oxlint-disable sort-keys */
const tags = {
  "@name": pkg.name,
  "@namespace": pkg.config.namespace ?? "http://tampermonkey.net/",
  "@copyright": pkg.license,
  "@version": pkg.version,
  "@description": pkg.description,
  "@icon": pkg.config?.icon,
  "@icon64": pkg.config?.icon64,
  "@grant": [],
  "@author": pkg.author ?? "you",
  "@homepage": pkg.homepage,
  "@antifeature": pkg.config?.antifeature ?? [],
  "@require": pkg.config?.require ?? [],
  "@resource": pkg.config?.resource ?? [],
  "@include": pkg.config?.include ?? [],
  "@match": pkg.config?.match ?? [],
  "@exclude": pkg.config?.exclude ?? [],
  "@run-at": pkg.config?.["run-at"],
  "@run-in": pkg.config?.["run-in"],
  "@sandbox": pkg.config?.sandbox,
  "@tag": pkg.keywords ?? [],
  "@connect": pkg.config?.connect ?? [],
  "@noframes": pkg.config?.noframes,
  "@updateURL": pkg.config?.updateURL,
  "@downloadURL": pkg.config?.downloadURL,
  "@supportURL": pkg.bugs?.url,
  "@webRequest": pkg.config?.webRequest ?? [],
  "@unwrap": pkg.config?.unwrap,
};
/* oxlint-enable sort-keys */

const apis = new Set<string>();
const pattern = /\b(GM[._][^()},;\n]+|unsafeWindow|window\.(?:close|focus|onurlchange))[.,()};]/g;

for (const file of await Array.fromAsync(
  new Glob("**/*.ts").scan({ absolute: true, cwd: "./src" }),
)) {
  let match;
  while ((match = pattern.exec(await Bun.file(file).text())) !== null) {
    apis.add(match[1]);
  }
}

for (const api of apis) {
  (tags["@grant"] as string[]).push(api);
}

const maxLabelLen = Math.max(...Object.keys(tags).map((k) => k.length));

const headerLines = Object.entries(tags).flatMap(([label, value]) => {
  if (!value) {
    return [];
  }
  const padding = " ".repeat(maxLabelLen - label.length);
  if (Array.isArray(value)) {
    return value.map((v) => `// ${label}${padding} ${v}`);
  }
  return [`// ${label}${padding} ${value}`];
});

const banner = [
  "// ==UserScript==",
  ...headerLines,
  "// ==/UserScript==",
  "(function(){",
  '"use strict";',
].join("\n");

const footer = "})();";

await Bun.build({
  banner,
  entrypoints: ["./src/index.ts"],
  env: "inline",
  footer,
  minify: true,
  outdir: "./dist",
});
