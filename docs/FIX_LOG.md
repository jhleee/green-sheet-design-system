# FIX_LOG

## FIX-1 | 2026-07-16

- **발견 단계**: TEST
- **관련 PRD 항목**: T1 — tests/e2e/check-refs.mjs
- **증상**: 테스트 실행 시 `dist/green-sheet.css` ENOENT — 경로가 `%EC%83%88%20%ED%8F%B4%EB%8D%94`로 URL 인코딩된 채 사용됨
- **원인**: `import.meta.url`의 pathname을 수동 파싱해 한글 폴더명이 디코딩되지 않음
- **수정 내용**: `node:url`의 `fileURLToPath()`로 교체
- **검증**: `npm test` 재실행 — 경로 정상 해석

## FIX-2 | 2026-07-16

- **발견 단계**: TEST
- **관련 PRD 항목**: T1 / E2 — 구 데모 호환 검사
- **증상**: `examples/tabular-pipeline-demo.html`에서 클래스 미존재 오탐 3건 (`${k===cur?'on':''}` 등)
- **원인**: 데모 내 JS 템플릿 리터럴의 `class="...${...}..."` 문자열을 정적 클래스로 오인
- **수정 내용**: `$`, `{`, `}` 포함 토큰은 검사에서 제외
- **검증**: `npm test` — 13개 HTML 전부 PASS
