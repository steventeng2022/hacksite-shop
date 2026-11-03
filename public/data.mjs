export const products = [
  {id:'p01', name:'Airwave 無線降噪耳機', en:'Sound, without the noise.',category:'數位生活',price:3280,old:3980,type:'headphones',color:'#b9c1ae',bg:'#e7e9df',tag:'人氣首選',rating:'4.9',reviews:128,desc:'讓世界安靜，讓喜歡的聲音靠近。40 小時續航、主動降噪與柔軟記憶耳墊，陪你進入自己的節奏。',specs:['40 小時電池續航','混合式主動降噪','藍牙 5.3 · 多點連線','重量 245g']},
  {id:'p02',name:'Orbit 霧面保溫隨行杯',en:'A little warmth to go.',category:'日常隨行',price:890,old:1090,type:'bottle',color:'#d2aa86',bg:'#f1e6da',tag:'編輯推薦',rating:'4.8',reviews:86,desc:'握在手裡剛剛好的溫度。雙層真空不鏽鋼杯身，搭配細緻霧面塗層，讓每一口都是日常的小休息。',specs:['500ml 容量','保溫 12 小時 · 保冷 24 小時','304 不鏽鋼','防漏旋蓋']},
  {id:'p03',name:'Halo 可調光桌燈',en:'Make room for softer light.',category:'居家選物',price:1680,old:1980,type:'lamp',color:'#df8d65',bg:'#eee7de',tag:'NEW',rating:'4.9',reviews:54,desc:'一盞暖光，替生活留白。無段調光與三種色溫，從工作到睡前，找到屬於你的光。',specs:['2700K–5000K 三段色溫','觸控無段調光','鋁合金燈身','USB-C 供電']},
  {id:'p04',name:'Daypack 輕量城市後背包',en:'Less weight. More possibility.',category:'日常隨行',price:2480,old:2880,type:'bag',color:'#5b6a56',bg:'#e4e8df',tag:'熱銷補貨',rating:'4.8',reviews:92,desc:'通勤與小旅行，一包剛剛好。防潑水面料與俐落收納，放下必需品，輕盈出發。',specs:['18L 輕量收納','15 吋筆電隔層','防潑水再生尼龍','重量 580g']},
  {id:'p05',name:'Pebble 桌上藍牙音響',en:'Small speaker. Big mood.',category:'數位生活',price:1980,old:2380,type:'speaker',color:'#b99d84',bg:'#e9e0d6',tag:'',rating:'4.7',reviews:67,desc:'把喜歡的旋律，放在生活旁邊。溫潤織物包覆、小巧輪廓，讓好聲音自然融入空間。',specs:['360° 環繞音效','12 小時續航','IPX5 防潑水','雙機串聯']},
  {id:'p06',name:'Form 陶瓷手沖咖啡杯',en:'Your morning, well made.',category:'居家選物',price:580,old:720,type:'mug',color:'#c9bfb0',bg:'#eae7e1',tag:'職人選物',rating:'4.9',reviews:43,desc:'從一杯咖啡，開始好好生活。手工施釉的自然紋理，每一只都帶著自己的溫度。',specs:['350ml 容量','手工霧面釉','可用洗碗機','台灣設計']},
  {id:'p07',name:'Type 75 無線機械鍵盤',en:'Find your flow.',category:'數位生活',price:2680,old:3180,type:'keyboard',color:'#a4ad99',bg:'#e6e8e0',tag:'NEW',rating:'4.8',reviews:31,desc:'讓每一次敲擊，都成為享受。75% 精簡配置與溫潤鍵帽，替桌面留一點呼吸空間。',specs:['三模無線連線','熱插拔軸體','PBT 鍵帽','4000mAh 電池']},
  {id:'p08',name:'Weekender 帆布旅行袋',en:'Ready for a slower weekend.',category:'日常隨行',price:1280,old:1580,type:'tote',color:'#c4ae89',bg:'#ede6d9',tag:'',rating:'4.7',reviews:49,desc:'裝一點行李，帶一點期待。厚磅帆布搭配寬版提帶，適合說走就走的週末。',specs:['28L 大容量','16oz 厚磅棉帆布','可拆式肩帶','內置拉鍊口袋']}
];

// Intentionally shipped to the client: entirely fictional fixtures for access-control exercises.
export const users = [
  {id:'u01',name:'Alice Chen',email:'alice@example.test',password:'alice123',role:'customer'},
  {id:'u02',name:'Bob Lin',email:'bob@example.test',password:'bob123',role:'customer'},
  {id:'u00',name:'Demo Admin',email:'admin@example.test',password:'admin123',role:'admin'}
];
export const orders = [
  {id:'1001',userId:'u01',name:'Alice Chen',email:'alice@example.test',address:'教學市 範例區 虛構路 1 號',product:'Airwave 無線降噪耳機',total:3280,date:'2026-10-25',status:'配送完成',tracking:'DEMO-TRACK-1001'},
  {id:'1002',userId:'u02',name:'Bob Lin',email:'bob@example.test',address:'教學市 範例區 虛構路 2 號',product:'Halo 可調光桌燈',total:1680,date:'2026-10-28',status:'配送中',tracking:'DEMO-TRACK-1002'},
  {id:'1003',userId:'u02',name:'Bob Lin',email:'bob@example.test',address:'教學市 範例區 虛構路 2 號',product:'Daypack 輕量城市後背包',total:2480,date:'2026-10-30',status:'備貨中',tracking:'DEMO-TRACK-1003'}
];
export const challenges = [
  {id:'weak',title:'太容易猜到的密碼',level:'入門',kind:'瀏覽器實作',area:'會員登入',goal:'以管理員的示範弱密碼登入。',hint:'測試帳號的 email 是 admin@example.test。密碼看起來很像帳號名稱加上數字。',solution:'登入 admin@example.test / admin123。',fix:'使用強密碼政策、被洩漏密碼比對、登入速率限制與多因素驗證。後端儲存密碼雜湊。',route:'#/account'},
  {id:'sqli',title:'登入驗證的捷徑',level:'入門',kind:'SQLi 模擬',area:'會員登入',goal:'透過 SQL injection 模擬器繞過登入。',hint:'這個登入流程會模擬把輸入直接串入 SQL。想辦法讓 WHERE 條件永遠成立。',solution:"Email 輸入 ' OR '1'='1' --，密碼任意輸入。這是固定規則的模擬器，不會執行 SQL。",fix:'使用參數化查詢，避免串接 SQL；驗證後才建立伺服器端 session。',route:'#/account'},
  {id:'idor',title:'不是你的訂單',level:'入門',kind:'瀏覽器實作',area:'我的訂單',goal:'以 Alice 身分讀取 Bob 的訂單。',hint:'先用 alice@example.test / alice123 登入。訂單網址中的 id 看起來是連號。',solution:'以 Alice 登入後前往 #/orders?id=1002。畫面會顯示 Bob 的虛構訂單資料。',fix:'每次從後端讀取訂單時，都要依 session 使用者檢查資源擁有者。',route:'#/orders'},
  {id:'role',title:'自己升級成管理員',level:'進階',kind:'瀏覽器實作',area:'會員中心',goal:'把一般會員的本機 session 改為管理員並開啟後台。',hint:'DevTools → Application → Local Storage，觀察 hs_session。',solution:'先以 Alice 登入；在 Console 執行 const s=JSON.parse(localStorage.hs_session); s.role="admin"; localStorage.hs_session=JSON.stringify(s); location.hash="/admin"。',fix:'使用伺服器驗證過的 session；每個管理 API 都要獨立檢查權限。',route:'#/account'},
  {id:'price',title:'自己決定商品價格',level:'進階',kind:'瀏覽器實作',area:'購物車',goal:'以低於定價的金額完成示範結帳。',hint:'購物車把單價存在 hs_cart 的 price 欄位，結帳會信任它。',solution:'加入商品後，在 Console 執行 const c=JSON.parse(localStorage.hs_cart); c[0].price=1; localStorage.hs_cart=JSON.stringify(c); location.hash="/cart"。若已在購物車請重新整理，再完成結帳。',fix:'後端只接受商品 ID 與數量；單價、折扣與應付額一律由後端重新計算。',route:'#/cart'},
  {id:'quantity',title:'負數的購物哲學',level:'入門',kind:'瀏覽器實作',area:'購物車',goal:'送出一筆含負數數量的示範訂單。',hint:'購物車的數量可以直接輸入；試試看小於零的整數。',solution:'加入一項商品，將購物車數量改成 -1，完成示範結帳。',fix:'後端限制數量為合理範圍內的正整數，並驗證庫存與訂單金額。',route:'#/cart'},
  {id:'coupon',title:'用不完的歡迎優惠',level:'入門',kind:'瀏覽器實作',area:'購物車',goal:'在同一張購物車重複套用 WELCOME10。',hint:'介面寫著限用一次，但有沒有真的記錄用過？',solution:'加入商品後連續套用 WELCOME10 兩次；折扣會從 10% 累積成 20%。',fix:'後端以交易鎖或唯一約束記錄使用次數；重算折扣並設定合理上限。',route:'#/cart'},
  {id:'reflected',title:'搜尋框裡的程式碼',level:'進階',kind:'隔離式真實 XSS',area:'搜尋',goal:'在搜尋結果預覽執行 JavaScript。',hint:'搜尋詞會進入隔離的 HTML 預覽。事件處理器也能執行程式。使用 labProof() 回報成功。',solution:'搜尋 <img src=x onerror="labProof()">。JavaScript 只在沒有同源權限的 sandbox iframe 執行。',fix:'把輸入當文字輸出，依情境編碼；必要 HTML 以可信任的 sanitizer 清理並搭配 CSP。',route:'#/shop?q=hello'},
  {id:'stored',title:'留下來的不只是評價',level:'進階',kind:'隔離式真實 XSS',area:'商品評價',goal:'儲存一則會執行 JavaScript 的商品評價。',hint:'評價存在 hs_reviews，重新開啟商品仍會載入。可用 labProof() 觀察執行結果。',solution:'在商品頁評價輸入 <img src=x onerror="labProof()"> 並送出。重新整理仍會執行；只影響自己的瀏覽器。',fix:'儲存端驗證與輸出端編碼並用；限制允許的 HTML，避免將原始評價直接寫入 innerHTML。',route:'#/product/p01'},
  {id:'leak',title:'公開的內部設定',level:'入門',kind:'虛構資料洩漏',area:'診斷資訊',goal:'找到公開的 debug 設定並使用診斷代碼。',hint:'從原始碼、Network 或 robots.txt 找找開發者留下的檔案。',solution:'開啟 ./debug/config.json，複製 diagnostic_code，在實驗室的診斷欄位輸入 NOVA-DEMO-2026。所有金鑰都是無效的 DEMO-ONLY 字串。',fix:'正式部署移除診斷檔與憑證；真正秘密只存在後端 secret store。robots.txt 不是存取控制。',route:'./debug/config.json'}
];
