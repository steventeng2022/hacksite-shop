# NOVA Shop · 資安教育購物平台

擬真的繁體中文選物商店，也是刻意存在漏洞的**瀏覽器端教學實驗室**。網站提供商品分類、搜尋與排序、商品詳情、收藏、評價、購物車、優惠券、示範結帳、會員中心、訂單與管理後台。

**線上網站：https://steventeng2022.github.io/hacksite-shop/**

所有商品、會員、地址、訂單與診斷設定都是虛構資料。無付款、寄信、真實帳號、資料庫、API 或商品配送。不要輸入真實個資或密碼；不應把這個專案當成正式購物網站的基礎。

## 開始使用

需要 Node.js 22 或更新版本，網站沒有第三方執行依賴。測試使用 happy-dom 作為開發依賴。

```sh
npm run dev
# http://127.0.0.1:4173/hacksite-shop/
npm ci
npm test
npm run build
```

正式靜態檔產生於 `dist/`。所有站內資源都使用相對路徑，適用於 GitHub Pages 的專案子目錄。

## 教學模式

點擊底部 **教學環境 → 漏洞任務**。每個任務包含目標、提示、解答與真實系統的修補方向。成功操作會更新自己的本機進度；可匯出 JSON 學習紀錄，也可重設所有本機示範資料。

| # | 練習 | 實作範圍 |
|---|---|---|
| 1 | 管理員弱密碼 | 用戶端示範帳號驗證 |
| 2 | SQL injection 登入繞過 | **固定規則模擬**，不執行 SQL |
| 3 | 訂單 IDOR | 讀取未檢查擁有者的虛構訂單 |
| 4 | 管理員角色竄改 | 信任 localStorage 中的角色 |
| 5 | 購物車價格竄改 | 信任本機商品單價 |
| 6 | 負數數量 | 不檢查數量下限的示範結帳 |
| 7 | 優惠券重複使用 | 同一優惠反覆疊加 |
| 8 | 反射型 XSS | 在隔離 iframe 中實際執行 JavaScript |
| 9 | 儲存型 XSS | 本機儲存評價，在隔離 iframe 中重新執行 |
| 10 | 診斷資訊洩漏 | 公開、完全無效的虛構設定 |

示範會員：`alice@example.test / alice123`。

此網站訓練的是漏洞概念與用戶端信任邊界，不是可以被 Burp/sqlmap 掃描出 SQLi 的伺服器靶場。GitHub Pages 是靜態託管；SQLi、伺服器 session、真實授權與資料庫攻擊必須另建**隔離後端實驗環境**。

XSS 透過獨立 `preview.html` 頁面執行，iframe 僅授予 `allow-scripts`，沒有 `allow-same-origin`、彈窗、表單或頂層導向權限；CSP 禁止 fetch、子框架、外部圖片等資源。父頁面依來源 window、opaque origin 與每個預覽的 nonce 驗證成功訊號。不向預覽傳送 session、購物車或其他資料。這仍然是刻意執行不可信任 JavaScript 的教學功能，請在專用瀏覽器環境操作；無窮迴圈等程式仍可能讓預覽無回應。設定中的 DEMO-ONLY 字串沒有任何服務權限。

儲存型 XSS 只影響本機，沒有跨使用者共享；進度也不是伺服器驗證的考核證據。可在 DevTools 檢視並修改 `hs_*` 儲存鍵。重設只移除這個網站使用的鍵，不會呼叫 `localStorage.clear()`。

## 部署與驗證

`.github/workflows/pages.yml` 會在 push 時執行測試與建置，僅從儲存庫的預設分支部署 GitHub Pages。Repository Settings → Pages → Source 選擇 **GitHub Actions**。`github-pages` environment 的分支政策也須允許該預設分支。

測試刻意確認漏洞仍可重現、正常購物 DOM 流程可執行，並檢查 XSS 的隔離設定。DOM 測試不會驗證瀏覽器的 CSP、真正 XSS 執行或視覺排版，這些仍需要瀏覽器檢查。這些測試不是網站「安全」的證明。

維護者教材：[TEACHING.md](TEACHING.md)。所有商品插圖由專案原創 SVG 組成，沒有外部圖片、字型、追蹤碼或第三方執行依賴。

## 結構

```text
public/                 可公開的網站原始檔
  app.mjs               UI、路由與事件
  lab.mjs               刻意存在漏洞的邏輯
  data.mjs              虛構資料、題目與修補方向
  preview.html          無同源權限的 XSS 預覽頁
  debug/config.json     無效的教學設定
scripts/                本機伺服器與靜態建置
tests/                  Node.js 內建測試
.github/workflows/      驗證與 Pages 部署
```
