import { Glob } from "bun";
import pkg from "./package.json" with { type: "json" };

const tags = {
  "@name": pkg.name,
  "@namespace": pkg.config.namespace ?? "http://tampermonkey.net/",
  "@version": pkg.version,
  "@description": pkg.description,
  "@author": pkg.author ?? "you",
  "@homepage": pkg.homepage,
  "@match": pkg.config?.match ?? [],
  "@include": pkg.config?.include ?? [],
  "@exclude": pkg.config?.exclude ?? [],
  "@icon": pkg.config?.icon,
  "@grant": [],
  "@connect": pkg.config?.connect ?? [],
  "@require": pkg.config?.require ?? [],
  "@resource": pkg.config?.resource ?? [],
  "@run-at": pkg.config?.["run-at"],
  "@run-in": pkg.config?.["run-in"],
  "@sandbox": pkg.config?.sandbox,
  "@noframes": pkg.config?.noframes,
  "@updateURL": pkg.config?.updateURL,
  "@downloadURL": pkg.config?.downloadURL,
  "@supportURL":
    pkg.config?.supportURL ?? pkg.repository?.url ?? pkg.repository,
  "@tag": pkg.keywords ?? [],
};

const apis = new Set<string>();
const pattern =
  /\b(GM[._][^()},;\n]+|unsafeWindow|window\.(?:close|focus|onurlchange))[.,()};]/g;

for (const file of await Array.fromAsync(
  new Glob("**/*.ts").scan({ cwd: "./src", absolute: true }),
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
  if (!value) return [];
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
  entrypoints: ["./src/index.ts"],
  outdir: "./dist",
  env: "inline",
  minify: true,
  banner,
  footer,
});
