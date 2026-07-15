# TASK_CHECKLIST — Green Sheet v0.2: 범용 데이터 그리드 디자인 시스템

> PRD(사용자 지시, 2026-07-15):
> 1. 특정 기능(장표 정규화)에 과적합된 디자인을 **데이터 그리드 중심 웹앱 범용** 디자인 시스템으로 전환
> 2. 샘플/기본 요소의 **싱글페이지(랜딩) 느낌 제거** — 애플리케이션 레이아웃 관점으로 재구성
> 3. **컴포넌트 + 레이아웃**을 함께 제공, 컴포넌트 라이브러리 느낌
> 4. 외부 AI가 참조할 때 **과적합하지 않도록** 도메인 중립 디자인 시스템 스펙만 제공

## [DESIGN]

- [x] D1. 클래스 API 설계 — 범용 명명(`.sheet`/`.tbl` + 구명 별칭), 신규 컴포넌트/레이아웃 클래스 목록 확정
- [x] D2. 의미색 재정의 — 도메인 언어 제거: green=primary/positive·selected, amber=attention·linked, red=negative·excluded, purple=meta·derived

## [IMPL]

- [x] I1. `theme.css` 범용화 — 주석/의미 재서술, 밀도 변형 토큰 추가
- [x] I2. `theme.css` 테이블 확장 — `.sheet`/`.tbl` 명명, 정렬 헤더, 행 선택, 밀도 변형(`.tbl-compact`/`.tbl-roomy`), tfoot 합계
- [x] I3. `theme.css` 신규 컴포넌트 — btn(4변형)·input·select·field·switch·toolbar·pager·menu·crumbs·nav·alert·toast·modal·empty-state·skeleton·stat·kbd·statusbar
- [x] I4. `theme.css` 레이아웃 클래스 — app-shell(top/side/main)·split·page-head
- [x] I5. `components/data-tables.html` 재작성 — 범용 데이터, 정렬·선택·밀도·페이저 조합
- [x] I6. `components/buttons-and-forms.html` 신규
- [x] I7. `components/navigation.html` 신규 — 탭·크럼·사이드내비·페이저·메뉴·스텝
- [x] I8. `components/feedback.html` 신규 — 배지·얼럿·토스트·모달·빈상태·스켈레톤·스탯
- [x] I9. `components/code-and-chart.html` 문구 범용화
- [x] I10. `foundations/*` 문구 범용화 (colors/typography/space)
- [x] I11. `layouts/app-shell.html` 신규 — 풀페이지 앱 셸 + 그리드
- [x] I12. `layouts/master-detail.html` 신규
- [x] I13. `layouts/dashboard.html` 신규
- [x] I14. `index.html` 재작성 — 라이브러리 카탈로그 (히어로 축소, Foundations/Components/Layouts/AI 섹션)
- [x] I15. `llms.txt` — 외부 AI 참조용 도메인 중립 스펙
- [x] I16. `README.md` / `package.json` 범용 포지셔닝으로 갱신

## [TEST]

- [x] T1. `tests/e2e/check-refs.mjs` — 모든 HTML에서 참조하는 클래스가 dist CSS에 존재하는지 검사
- [x] T2. 빌드 통과 (`npm run build`) + T1 통과

## [E2E]

- [x] E1. 전 페이지 상호 링크 무결성 (index ↔ foundations/components/layouts/examples)
- [x] E2. 구 데모(`examples/tabular-pipeline-demo.html`)가 별칭 클래스로 깨지지 않고 동작
