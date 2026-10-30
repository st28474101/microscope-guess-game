704 顯微鏡猜猜樂 - 30張題目照片 / 16個座號區（示範版）

本包使用已上傳的 704 Padlet ZIP 轉成適合網頁顯示的照片（最長邊 1400px）。不會變動原 Padlet。
目前 ZIP 僅有顯微鏡照片；沒有可自動判定的正確答案，老師需在 teacher.html 輸入文字答案。
照片原檔仍保留在你原本的 ZIP；此包是較小的網頁用版本。

【先預覽】解壓後打開 index.html 可查看題目；也可打開 teacher.html 預覽答案輸入管理畫面。
此版已填入 Firebase 公開網頁設定；正式同步功能需透過 HTTPS 網址開啟並完成 Firebase Authentication 及資料庫規則。

【正式同步部署】
1. 至 Firebase Console 建立專案，建立「Realtime Database」，選擇鎖定模式，切勿先設定公開寫入。
2. 在 Firebase Authentication 啟用 Email/Password 登入，建立唯一的教師帳號。教師密碼不可寫在公開 GitHub 檔案。
3. Firebase 專案設定 > 新增網頁 App，複製 config 到 firebase-config.js 的 window.FIREBASE_CONFIG（包含 databaseURL）。
4. 至 Realtime Database > 規則，貼上 database.rules.json 的內容，並將 REPLACE_WITH_TEACHER_EMAIL 換成實際的教師登入信箱，發布規則。這樣學生只能讀取已公布的答案，只有該教師信箱能寫入。
5. 將本資料夾全部內容上傳至 GitHub Pages 對應的網站資料夾（公開儲存庫或可以啟用 Pages 的儲存庫），啟用 HTTPS Pages。
6. 老師以 teacher.html 登入，逐題輸入答案再按「公布」，學生用 index.html 看答案。下一班前老師按「全部重新隱藏」。
7. 建議先用另一台手機作學生端，實測公布/隱藏是否同步，並確認學生不能進入老師帳號。

【注意事項】
- 學生不需登入，因為資料庫只公開已揭露答案的讀取權限；照片檔本身就是公開題目。
- 公布過的答案，學生可能截圖；已經收到過的答案也可能仍留在裝置記憶體中，重新隱藏無法使人忘記。
- 要「五個班彼此完全不知道之前答案」仍需安排班級保密或在課前只對當班展示。
- 實作是老師同步公布答案，但學生猜測欄位目前不回傳統計，不收集學生個人資料。
- 使用 GitHub 公開網站時不要把教師帳號密碼或其他隱私資料提交到儲存庫。

【此版本已完成】
- 已填入你提供的 Firebase Web App config。
- 資料庫規則內教師信箱已設定為 st28474101@gmail.com；請核對 Firebase Console 已發布的規則。
- 請用 GitHub Pages 的 HTTPS 網址測試同步，勿依賴 file:// 本機開啟做 Firebase 測試。
- 驗證／登入測試請於 Firebase Authentication > Settings > Authorized domains 檢查 GitHub Pages 主機網域（通常為 <GitHub使用者名稱>.github.io）已加入。
- 教師在 teacher.html 輸入答案，會暫存該台瀏覽器 localStorage；未按公布的答案不會存到公開資料庫。請勿在學生平板登入老師帳號。
- 規則目前採教師電子信箱驗證；換教師帳號時需要同步更新規則。
- 此包尚未上傳到 GitHub 或執行跨裝置線上測試。
