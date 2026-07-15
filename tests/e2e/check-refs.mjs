// [E2E] 문서 무결성 검사
// 1) 모든 HTML이 참조하는 클래스가 dist/green-sheet.css에 존재하는가
// 2) 상대 링크(href/src)가 실제 파일을 가리키는가
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const CSS = readFileSync(join(ROOT, "dist", "green-sheet.css"), "utf8");

const htmlFiles = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (["node_modules", ".git", "dist", "tests"].includes(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (name.endsWith(".html")) htmlFiles.push(p);
  }
})(ROOT);

const escapeCls = (c) => c.replace(/[^A-Za-z0-9_-]/g, (ch) => "\\" + ch);
const cssHas = (cls) => new RegExp("\\." + escapeCls(cls).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?![\\w-])").test(CSS);

let failures = 0;
const fail = (msg) => { failures++; console.error("  ✗ " + msg); };

for (const file of htmlFiles) {
  const rel = file.slice(ROOT.length + 1).replace(/\\/g, "/");
  const html = readFileSync(file, "utf8");
  console.log("• " + rel);

  // 파일 내 <style> 블록에 정의된 로컬 클래스는 예외로 인정
  const local = new Set();
  for (const style of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi))
    for (const m of style[1].matchAll(/\.([A-Za-z][\w-]*)/g)) local.add(m[1]);

  // [T1] 클래스 존재 검사
  const missing = new Set();
  for (const m of html.matchAll(/class="([^"]*)"/g)) {
    for (const cls of m[1].split(/\s+/).filter(Boolean)) {
      if (/[${}]/.test(cls)) continue;  // JS 템플릿 리터럴
      if (local.has(cls.replace(/^.*:/, ""))) continue;
      if (!cssHas(cls)) missing.add(cls);
    }
  }
  for (const cls of missing) fail(`클래스가 CSS에 없음: "${cls}"`);

  // [E1] 링크 무결성 검사
  for (const m of html.matchAll(/(?:href|src)="([^"#]+?)(?:#[^"]*)?"/g)) {
    const url = m[1];
    if (/^(https?:|mailto:|data:|javascript:)/.test(url) || url === "") continue;
    if (!existsSync(resolve(dirname(file), url))) fail(`깨진 링크: "${url}"`);
  }
}

if (failures) {
  console.error(`\nFAIL — ${failures}건`);
  process.exit(1);
}
console.log(`\nPASS — ${htmlFiles.length}개 HTML 검사 완료`);
