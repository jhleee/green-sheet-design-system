# Green Sheet Design System

> 장표 정규화 파이프라인 UI를 위한 Tailwind v4 디자인 시스템.
> A Tailwind v4 design system for financial-statement normalization UIs — paper-and-ink theme, built around dense data tables.

녹빛 종이 위의 잉크. 그림자 없이 표면색과 1px 선으로만 층을 만들고, 의미색 4계열이 파이프라인의 상태를 말하며,
다크 표면은 오직 기계가 쓴 것에만 쓴다.

**24 tokens.** 값은 전부 [`examples/tabular-pipeline-demo.html`](examples/tabular-pipeline-demo.html)에서 추출했고, 발명한 색은 없다.

## 설치

```bash
npm i -D tailwindcss @tailwindcss/cli
```

앱 진입 CSS에서 `theme.css` 하나만 import 하면 된다 (내부에서 `@import "tailwindcss"` 수행):

```css
@import "green-sheet-design-system/theme.css";
```

빌드된 CSS를 그대로 쓰려면:

```html
<link rel="stylesheet" href="node_modules/green-sheet-design-system/dist/green-sheet.css">
```

## 프리뷰

**[전체 갤러리 보기 →](https://jhleee.github.io/green-sheet-design-system/)** (GitHub Pages)

```bash
npm run build     # theme.css → dist/green-sheet.css
npm run dev       # watch 모드
npm run preview   # http://localhost:8899
```

| | |
|---|---|
| [`foundations/colors.html`](foundations/colors.html) | 24색 팔레트 · 의미 규칙 · 병합 이력 |
| [`foundations/typography.html`](foundations/typography.html) | Pretendard + JetBrains Mono · 12단 스케일 |
| [`foundations/space-and-shape.html`](foundations/space-and-shape.html) | radius · 간격 · 데이터 밀도 · 레이아웃 |
| [`components/data-tables.html`](components/data-tables.html) | `.xl` 시트 복제 + `.ft` fact 테이블 |
| [`components/controls-and-badges.html`](components/controls-and-badges.html) | 탭 · 알약 버튼 · 파이프라인 스텝 · 배지 4종 |
| [`components/code-and-chart.html`](components/code-and-chart.html) | 다크 스펙/SQL · 규칙 칩 · 카탈로그 카드 · 차트 |

각 프리뷰 첫 줄의 `<!-- @dsCard -->` 마커로 Claude Design System 패널에 카드로 색인된다.

## 토큰

### Surfaces — 그림자 없음. 높이는 표면색 + 1px 선으로만

| 토큰 | | 용도 |
|---|---|---|
| `paper` | `#F4F6F1` | 페이지 배경 · 시트 헤더 셀 |
| `panel` | `#FFFFFF` | 카드 · 패널 · 데이터 셀 |
| `sunken` | `#EDF1EA` | 표 헤더 · 행번호 거터 |

### Lines — 두 무게뿐

| 토큰 | | 용도 |
|---|---|---|
| `line` | `#DCE3DA` | 구조 — 패널·카드 외곽, 섹션 구분 |
| `line-soft` | `#E4E9E1` | 데이터 내부 — 셀 격자, 행 구분선, 차트 그리드 |

### Ink

| 토큰 | | 용도 |
|---|---|---|
| `ink` | `#1B2730` | 본문 · 코드 표면 배경 |
| `ink-soft` | `#5C6E7A` | 보조 텍스트 · 라벨 · 차트 축 |
| `ink-muted` | `#B9C2BB` | 빈 셀 · 비활성 — sparse를 zero와 구분 |

### 의미색 — 각 계열은 정확히 하나의 뜻만 가진다

| 계열 | 뜻 | 토큰 |
|---|---|---|
| **Green** | 승인 · 통과 · 구조 | `green` `green-deep` `green-soft` `green-bright` |
| **Amber** | 사람이 봐야 할 지점 (에러 아님) | `amber` `amber-soft` `amber-ink` `amber-code` |
| **Red** | 의도적 제외 (실패 아님) | `red` `red-soft` `red-ink` `red-strike` |
| **Purple** | 값의 출처 (값 자체 아님) | `purple` `purple-soft` |
| **Code** | 기계가 쓴 것 — 배경은 `ink` 그 자체 | `code-fg` `code-dim` |

차트는 전용 토큰이 없다. 시리즈는 `green → amber → purple` 순서로 의미 팔레트를 그대로 쓰고,
그리드는 `line-soft`, 축은 `ink-soft`다.

## 설계 원칙

| 원칙 | |
|---|---|
| **의미색은 겹치지 않는다** | green이면 승인·정상이라는 뜻이지 "그냥 강조"가 아니다. 새 상태가 필요하면 색을 재활용하지 말고 팔레트 추가를 먼저 논의한다. |
| **그림자를 쓰지 않는다** | 높이는 표면색 + 1px 보더로만 만든다. `box-shadow`는 하이라이트 링·행 마커·`.u-mark` 밑줄 세 곳에만 허용. |
| **mono는 신호다** | 기계가 생성했거나 열로 정렬돼야 하는 것(수치·식별자·코드·스펙)에만 붙인다. 우측 정렬 숫자는 예외 없이 mono. |
| **표는 빽빽하다** | 셀 패딩 5–5.5px는 의도된 값. 원본 시트와 fact 테이블을 눈으로 대조하기 위한 밀도이므로 넉넉하게 바꾸면 목적이 깨진다. |
| **곡률이 성격을 말한다** | 시트 격자 `0` → 표면 `3px` → 질의 버튼 `20px`. 데이터에서 멀어질수록 둥글어진다. |
| **sparse ≠ zero** | 빈 값은 `0`이 아니라 `ink-muted`의 `–`. fact를 생성하지 않는다. 이 구분이 시스템의 핵심 계약이다. |

## 컴포넌트 클래스

역할(role)은 `@layer components`에, 값(value)은 토큰에 둔다.

`.xl` `.ft` — 표 · `.badge` `.badge-red|purple|green|amber` — 상태 배지
`.pane` `.pane-head` `.pane-scroll` `.ds-card` `.ds-note` — 표면
`.tab` `.tab-on` `.qbtn` `.qbtn-on` — 컨트롤
`.code-surface` `.code-surface-spec` `.code-k` `.code-c` `.code-s` `.code-lab` `.rule-chip` — 코드
`.u-mark` — 강조 밑줄

## 원본 대비 변경

원본 데모는 `:root`에 17개만 선언했지만 실제로는 **36개 토큰(고유값 30)** 을 썼다 — 60%가 CSS와 JS에 하드코딩돼 있었다.
전부 이름을 부여한 뒤 중복을 병합해 **24개**로 줄였다. 자세한 내역은 [`foundations/colors.html`](foundations/colors.html)의 "병합 이력" 참조.

병합 중 둘은 접근성 수정을 겸한다 (대비는 sRGB/WCAG 기준 실측):

- 차트 y축 눈금 `#8A98A2` → `ink-soft` — 2.96:1 → 5.29:1. 원본은 y축과 x축에 서로 다른 회색을 쓰고 있었다.
- 차트 YTD 플래그 `#B98A1E` → `amber-ink` — 3.13:1 → 5.37:1. 원본 값은 AA-large는 통과했지만 실제 렌더 크기(9px)에서는 미달이었다.

## 미결 사항

- **다크 모드 없음.** 원본이 라이트 전용이고 코드 표면이 유일한 다크 영역이다.
- **`code-dim` 대비 3.65:1.** `ink` 위에서 AA-large만 통과한다. 주석과 `.code-lab` 라벨에만 쓰이는
  의도적 de-emphasis 색이라 현 용도에서는 허용하지만, 본문 텍스트로는 쓰면 안 된다.
  다크 표면에서 4.5:1을 못 넘는 유일한 조합이다.
- **웹폰트 로딩 전략 미정.** `Pretendard`/`JetBrains Mono` 모두 현재는 시스템 폴백에 의존한다.
- `dist/green-sheet.css`는 의도적으로 커밋한다. `theme.css` 수정 시 `npm run build` 후 함께 커밋할 것.

## 라이선스

MIT © jhleee — [`LICENSE`](LICENSE) 참조.
