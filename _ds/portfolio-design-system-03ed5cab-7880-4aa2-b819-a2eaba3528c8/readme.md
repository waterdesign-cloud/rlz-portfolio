# Portfolio Design System

作品集網頁的 design system。此系統**僅包含**使用者提供的 `uploads/design-tokens.css` 中的設定，未新增任何推測性的 token、元件或畫面。

## 來源
- `uploads/design-tokens.css`（唯一來源）

## Tokens
- `tokens/fonts.css` — Noto Sans TC (Light 300)，由 Google Fonts 載入。**未提供字型檔**，如需自帶 webfont 請上傳。
- `tokens/tokens.css` — 來源檔原樣：字級/行高、字重、字距、三個顏色，以及 `h1 / .h1 / .h2 / .body1 / .body2` 類別。
- `styles.css` — 只有 @import。

## Typography
H1 48/72、H2 32/54、Body1 16/32、Body2 14/24。字體一律 Noto Sans TC、Light 300、letter-spacing 0%。

## Colors
- `--color-primary` #F2F2F2 — 底色
- `--color-second` #A7A7A7 — 次要文字、分隔線
- `--color-third` #4A4850 — 主要文字

來源檔未定義語意別名、間距、圓角、陰影、動態或狀態樣式，因此本系統一併留空。

## Brand assets
來源未提供 logo 或任何圖像資產；需要品牌標記處以 `Portfolio` 純文字呈現。

## Index
- `styles.css`、`tokens/`
- `guidelines/` — 6 張規格卡（Type ×5、Colors ×1）
- `assets/` — 空（無提供資產）
- `SKILL.md`
