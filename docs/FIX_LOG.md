# FIX_LOG

## FIX-3 | 2026-07-16

- **발견 단계**: DESIGN (다크 모드 대비 실측 중 발견)
- **관련 PRD 항목**: 미결사항 해결 — 접근성
- **증상**: `badge-red`(흰 텍스트 on `red` #BE5B4E)가 WCAG AA 미달 — 대비 4.38:1 (10px 텍스트, 4.5:1 필요)
- **원인**: 원본 데모에서 추출한 값이 실측 검증 없이 유지됨
- **수정 내용**: `--color-red` #BE5B4E → #B04C3E (5.32:1). 문서(README·colors.html·index·llms.txt) 동기화
- **검증**: scratchpad contrast.mjs 실측 + `npm test`

## FIX-4 | 2026-07-16

- **발견 단계**: DESIGN (미결사항 #2 해소)
- **관련 PRD 항목**: 미결사항 — `code-dim` 대비 3.65:1
- **증상**: 다크 표면 위 주석·라벨이 AA-large만 통과
- **원인**: 원본 값 유지 (의도적 de-emphasis였으나 AA 미달)
- **수정 내용**: `--color-code-dim` #6B7F8C → #8397A5 (5.03:1). de-emphasis는 유지되면서 AA 통과
- **검증**: scratchpad contrast.mjs 실측 + `npm test`

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
