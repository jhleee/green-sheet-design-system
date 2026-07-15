# Green Sheet Design System

> 데이터 그리드 중심 웹 애플리케이션을 위한 Tailwind v4 디자인 시스템.
> A Tailwind v4 design system for data-grid-centric web applications — paper-and-ink theme, dense tables, components + app layouts.

녹빛 종이 위의 잉크. 그림자 없이 표면색과 1px 선으로만 층을 만들고, 의미색 4계열이 데이터의 상태를 말하며,
다크 표면은 오직 기계가 쓴 것에만 쓴다.

**24 color tokens + 컴포넌트 클래스 + 앱 레이아웃.** 발명한 색은 없다.

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

## AI 참조 — llms.txt

외부 AI(코드 생성 도구·에이전트)로 이 시스템의 UI를 만들 때는 [`llms.txt`](llms.txt) **하나만** 컨텍스트에 넣는다.
토큰·클래스 API·규칙만 담은 도메인 중립 스펙이라 특정 업무 화면의 문구·데이터에 과적합되지 않는다.
아래 문서 페이지들은 사람을 위한 해설이며, 예시 데이터는 시스템의 일부가 아니다.

## 프리뷰

**[전체 갤러리 보기 →](https://jhleee.github.io/green-sheet-design-system/)** (GitHub Pages)

```bash
npm run build     # theme.css → dist/green-sheet.css
npm run dev       # watch 모드
npm run preview   # http://localhost:8899
npm test          # 문서가 참조하는 클래스가 빌드 CSS에 존재하는지 검사
```

### Foundations

| | |
|---|---|
| [`foundations/colors.html`](foundations/colors.html) | 24색 팔레트 · 의미 규칙 · 병합 이력 |
| [`foundations/typography.html`](foundations/typography.html) | Pretendard + JetBrains Mono · 12단 스케일 |
| [`foundations/space-and-shape.html`](foundations/space-and-shape.html) | radius · 간격 · 밀도 · elevation 규칙 |

### Components

| | |
|---|---|
| [`components/data-tables.html`](components/data-tables.html) | `.sheet` 시트형 + `.tbl` 표준형 — 정렬·선택·행 상태·밀도·그리드 조합 |
| [`components/buttons-and-forms.html`](components/buttons-and-forms.html) | 버튼 4변형 · 입력 · 셀렉트 · 필드 · 체크박스 · 스위치 · kbd |
| [`components/navigation.html`](components/navigation.html) | 탭 · 브레드크럼 · 사이드 내비 · 드롭다운 메뉴 · 페이저 · 프로세스 스텝 |
| [`components/feedback.html`](components/feedback.html) | 배지 5종 · 얼럿 · 토스트 · 모달 · 빈 상태 · 스켈레톤 · 스탯 카드 |
| [`components/code-and-chart.html`](components/code-and-chart.html) | 다크 코드 표면 · 규칙 칩 · 메타데이터 카드 · 차트 규칙 |

### Layouts — 풀페이지 애플리케이션 골격

| | |
|---|---|
| [`layouts/app-shell.html`](layouts/app-shell.html) | 상단 바 + 사이드 내비 + 그리드 뷰(툴바·표·페이저·상태바) |
| [`layouts/master-detail.html`](layouts/master-detail.html) | 좌측 목록 + 우측 상세 2분할 |
| [`layouts/dashboard.html`](layouts/dashboard.html) | 스탯 행 + 차트 + 테이블 패널 |

각 프리뷰 첫 줄의 `<!-- @dsCard -->` 마커로 Claude Design System 패널에 카드로 색인된다.
이 시스템의 모든 값이 추출된 원본 예제는 [`examples/tabular-pipeline-demo.html`](examples/tabular-pipeline-demo.html).

## 토큰

### Surfaces — 그림자 없음. 높이는 표면색 + 1px 선으로만

| 토큰 | | 용도 |
|---|---|---|
| `paper` | `#F4F6F1` | 페이지·앱 배경 · 사이드바 |
| `panel` | `#FFFFFF` | 카드 · 패널 · 데이터 셀 · 툴바 |
| `sunken` | `#EDF1EA` | 표 헤더 · 행번호 거터 · 상태바 |

### Lines — 두 무게뿐

| 토큰 | | 용도 |
|---|---|---|
| `line` | `#DCE3DA` | 구조 — 패널·카드 외곽, 레이아웃 구분 |
| `line-soft` | `#E4E9E1` | 데이터 내부 — 셀 격자, 행 구분선, 차트 그리드 |

### Ink

| 토큰 | | 용도 |
|---|---|---|
| `ink` | `#1B2730` | 본문 · 다크 표면 배경 |
| `ink-soft` | `#5C6E7A` | 보조 텍스트 · 라벨 · 차트 축 |
| `ink-muted` | `#B9C2BB` | 빈 셀 · 비활성 · 플레이스홀더 — sparse를 zero와 구분 |

### 의미색 — 각 계열은 정확히 하나의 뜻만 가진다

| 계열 | 뜻 | 토큰 |
|---|---|---|
| **Green** | 주 액션 · 선택 · 통과 | `green` `green-deep` `green-soft` `green-bright` |
| **Amber** | 주의 · 뷰 간 연결 (에러 아님) | `amber` `amber-soft` `amber-ink` `amber-code` |
| **Red** | 제외 · 부정 · 파괴적 액션 | `red` `red-soft` `red-ink` `red-strike` |
| **Purple** | 파생 · 시스템 생성 (값의 출처) | `purple` `purple-soft` |
| **Code** | 기계가 쓴 것 — 배경은 `ink` 그 자체 | `code-fg` `code-dim` |

차트는 전용 토큰이 없다. 시리즈는 `green → amber → purple` 순서로 의미 팔레트를 그대로 쓰고,
그리드는 `line-soft`, 축은 `ink-soft`다.

## 설계 원칙

| 원칙 | |
|---|---|
| **의미색은 겹치지 않는다** | green = 선택·통과·주 액션이지 "그냥 강조"가 아니다. amber = 연결, green = 선택 — 한 표 안에서도 절대 섞지 않는다. |
| **그림자를 쓰지 않는다** | 높이는 표면색 + 1px 보더로만. `box-shadow`는 전부 inset 마커(셀 링·행 마커·내비 마커·`.u-mark` 밑줄)다. |
| **mono는 신호다** | 기계가 생성했거나 열로 정렬돼야 하는 것에만 붙인다. 우측 정렬 숫자는 예외 없이 mono. |
| **표는 빽빽하다** | 기본 셀 패딩 5–5.5px는 의도된 값. 밀도는 `.tbl-compact`/`.tbl-roomy` 변형으로만 조절한다. |
| **곡률이 성격을 말한다** | 시트 격자 `0` → 컨트롤 `2px` → 표면 `3px` → 검색·자연어 입력 `20px`. 데이터에서 멀어질수록 둥글어진다. |
| **sparse ≠ zero** | 빈 값은 `0`이 아니라 `ink-muted`의 `–`. 이 구분이 시스템의 핵심 계약이다. |
| **다크는 기계의 것** | 다크 표면은 코드·스펙·로그·시스템 토스트에만. 강조용 다크 UI는 이 신호를 희석한다. |

## 컴포넌트 클래스

역할(role)은 `@layer components`에, 값(value)은 토큰에 둔다.

| 영역 | 클래스 |
|---|---|
| 표 | `.sheet` `.tbl` (+ `.rn` `.hd` `.lbl` `.num` `.dim` `td.v` `.hl` `.sel` `.row-excl` `.row-accent` `th.sortable` `.sort-asc/desc` `.chk` `.tbl-compact/-roomy`) |
| 배지 | `.badge` + `-green` `-amber` `-red` `-purple` `-neutral` |
| 표면 | `.pane` `.pane-head/-foot/-scroll/-fill` `.ds-card` `.ds-note` `.stat` 계열 |
| 버튼 | `.btn` + `-primary` `-ghost` `-danger` `-sm` · `.btn-pill(-on)` · `.tab(-on)` |
| 폼 | `.input(-pill/-invalid)` `.select` `.field(-label/-hint/-error)` `.checkbox` `.radio` `.switch` `.kbd` |
| 그리드 크롬 | `.toolbar` 계열 · `.pager` 계열 · `.statusbar` |
| 내비 | `.crumbs` 계열 · `.nav-item(-on)` 계열 · `.menu` 계열 · `.steps` 계열 |
| 피드백 | `.alert` 4변형 · `.toast` · `.scrim`+`.modal` 계열 · `.empty-state` · `.skeleton` |
| 코드 | `.code-surface(-spec)` `.code-k/c/s` `.code-lab` `.rule-chip` |
| 레이아웃 | `.app-shell` `.app-top` `.app-brand` `.app-body` `.app-side` `.app-main` `.page-head` `.split` 계열 |

v0.1 별칭(`.xl`→`.sheet`, `.ft`→`.tbl`, `.qbtn`→`.btn-pill`, `.excl`/`.sub2`→`.row-excl`/`.row-accent`)은 유지된다.

## 미결 사항

- **다크 모드 없음.** 라이트 전용이고 코드 표면이 유일한 다크 영역이다.
- **`code-dim` 대비 3.65:1.** `ink` 위에서 AA-large만 통과. 주석·라벨 전용 de-emphasis 색이라 허용하지만 본문 텍스트 금지.
- **웹폰트 로딩 전략 미정.** `Pretendard`/`JetBrains Mono` 모두 시스템 폴백에 의존한다.
- **레이아웃 반응형은 데스크톱 우선.** 앱 셸의 모바일 접힘(사이드바 드로어)은 후속.
- `dist/green-sheet.css`는 의도적으로 커밋한다. `theme.css` 수정 시 `npm run build` 후 함께 커밋할 것.

## 라이선스

MIT © jhleee — [`LICENSE`](LICENSE) 참조.
