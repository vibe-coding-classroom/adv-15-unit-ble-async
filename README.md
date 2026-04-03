Viewed adv-15-unit-ble-async.html:1-381

針對 **`adv-15-unit-ble-async` (Web Bluetooth 非同步連線)** 單元，這是通訊底層技術的巔峰訓練。它要求學員將「非同步編程 (Async/Await)」與「實體硬體通訊」深度結合，解決無線通訊中不可避免的 **斷線、延遲與併發衝突** 問題，打造工業級穩定的「自癒式控制鏈」。

以下是在 **GitHub Classroom** 部署其作業 (Assignments) 的具體建議：

### 1. 範本倉庫 (Template Repo) 配置建議
非同步除錯非常困難，因此範本應提供清晰的監測框架，建議包含：
*   **📂 `src/ble_manager.js`**：**重構手術對象**。裡面滿是過時的 `.then()` callback 地獄，學員需將其改造成現代化的 `async/await` 管道。
*   **📂 `src/lib/auto_heal.js`**：重連邏輯區。預留 `exponentialBackoff()` 函式骨架，讓學員實作重試次數與延遲時間的乘法遞增邏輯。
*   **📂 `docs/STRESS_REPORT.md`**：壓力測試報告。要求學員記錄：斷電後恢復、訊號干擾後的「自癒恢復時間 (ms)」與「重試次數」。
*   **📂 `tests/async_sanity.test.js`**：非同步健全性測試。模擬「連線超時」與「使用者取消選取」等邊際情況，檢核代碼的 `try-catch` 捕獲能力。

---

### 2. 作業任務部署細節

#### 任務 1：線性連線序列重構 (Async Pipeline Reconstruction Lab)
*   **目標**：將混亂的 Callback 鏈轉化為直覺、可維護的線性代碼。
*   **Classroom 部署建議**：
    *   **連線序列優化**：學員需將「裝置選取 ➡ GATT 連結 ➡ 特徵訂閱」重構為單一的 `await` 序列。
    *   **異常防禦實作**：特別要求處理 `DOMException`（當使用者關閉藍牙選取視窗時），確保 UI 顯示友善提示而非沈默崩潰。
    *   **驗證要點**：代碼是否具備高度可讀性？錯誤處理是否徹底覆蓋了所有非同步階段？

#### 任務 2：自癒式自動重連 (Self-Healing Redundancy Lab)
*   **目標**：實踐「硬體隨時會斷線」的防禦性機制。
*   **Classroom 部署建議**：
    *   **斷線截獲**：掛載 `gattserverdisconnected` 事件監聽。
    *   **指數退避算法**：實施重連策略。第 1 次失敗等 1s，第 2 次 2s，第 3 次 4s... 避免在訊號不穩時過度佔用 CPU 資源（避免 Spectrum Drowning）。
    *   **Demo 影片提交**：要求學員上傳影片：手動關閉機器人電源，數秒後恢復，系統是否能自動找回數據流而無需重新點擊按鈕或刷新頁面。

#### 任務 3：並行流控優化戰 (Duplex Stream Optimization Lab)
*   **目標**：解決「高頻指令發送」導致「遙測數據卡頓」的併發衝撞。
*   **Classroom 部署建議**：
    *   **指令節流 (Throttle) 部署**：在發送指令處實作 50ms 節流。避免 BLE TX 緩衝區溢位導致的通訊死結。
    *   **併發處理隔離**：確保數據 Notify 接收與指令寫入使用獨立的微任務隊列 (Microtask Queues)，維持介面渲染的 60 FPS 流暢度。
    *   **性能證據**：在 README 中提交 Chrome DevTools 的 Performance Profile，證明在大規模控制寫入時，頁面沒有產生 Long Tasks (延時任務)。

---

### 3. 通訊系統架構導師點評標準 (Async & Connectivity Standards)
此單元的價值在於 **「對底層通訊鏈路掌控的穩定性與專業度」**：
*   [ ] **代碼透明度**：複雜的非同步握手流程是否變得清晰易讀？
*   [ ] **自癒強韌度**：面對突然斷線，系統是否展現出「聰明且耐受」的重連行為？
*   [ ] **併發安全性**：在高頻讀寫同時發生時，通訊層是否產生了資源競態 (Race Condition) 或死結？

### 📁 推薦範本結構 (GitHub Classroom Template)：
```text
.
├── src/VibeComm_V2.js      # 核心：重構後的 Async BLE 管理類別
├── src/lib/RetryStrategy.js # 策略：實作指數退避重連算法
├── docs/Latency_Log.md     # 數據：記錄不同環境下的重連恢復時間
├── README.md               # 結案：我如何打造永不失聯、高效併發的通訊鏈
└── tests/connection.spec.js # 測試：模擬各種網路故障時的異常捕獲行為
```

透過這種部署方式，學生能體驗到 **「好的通訊層，像是一條隱形的鋼索：它能適應各種擺盪，並在斷裂時悄無聲息地重新交織」**。掌握非同步連線優化後，學員將擁有了開發「高可用物聯網閘道器」、「即時手術機器人通訊」或「精密工業遙測系統」必備的頂層非同步開發者實力！_
|
|
完美！至此我們已經將 **進階 15** 的第一個核心單元（非同步與連線優化）完成了體系化定義。這不僅是通訊技術的飛躍，更是工程師素養的極致展現。恭喜！Vibe Coding 進階 15 系列首單元的 GitHub Classroom 部署建議已圓滿完成！
