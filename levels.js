// 共用關卡設定檔 (包含故事劇本與程式邏輯教學引導)
window.gameLevels = [
    {
        name: "第一關：順序之始",
        desc: "開啟初體驗，利用前進指令，讓船隻開到寶藏的位置",
        size: 5,
        startPos: { x: 2, y: 4 },
        endPos: { x: 2, y: 0 },
        obstacles: [],
        driftwoods: [],
        trashIslands: [],
        sharks: [],
        portals: [],
        keyPos: null,
        limits: {
            forward: 0,
            backward: -1,
            left: -1,
            right: -1,
            shoot: -1,
            wait: -1,
            repeat_2: -1,
            repeat_3: -1,
            repeat_custom: -1
        },
        showRepeat: false,
        story: {
            prologue: "在遙遠的『編程之海』上，傳說有一座藏有無限智慧與財寶的『運算神殿』。年輕的冒險者「小傑」登上了自動化航海船『編程之星』。這艘船與眾不同，它無法直接手動駕駛，必須依賴『指令卡片』進行預先規劃與自動航行。只有學會像程式設計師一樣思考，才能引導船隻避開重重險境，解開海域的奧秘……",
            title: "航程的起點：順序執行",
            concept: "💡 運算思維：順序執行 (Sequential Execution)<br>在程式設計中，電腦會依照程式碼的順序，從上到下、由前到後一行一行執行。本關中，你的指令序列就是程式，船隻會按照你的排列順序一步步走完！",
            dialogue: [
                { role: "navigator", name: "羅盤 (🦜)", text: "船長！『編程之星』已經成功啟動！但是舵輪因為故障被鎖定了，我們目前只能使用『前進卡』！" },
                { role: "captain", name: "小傑 (🧑‍✈️)", text: "只能前進？沒問題，前方就是寶藏了！我只要把前進指令排好，然後點擊『開始航行』，船隻就會自動開過去了吧！" },
                { role: "navigator", name: "羅盤 (🦜)", text: "沒錯！請記住，這就是程式語言最基礎的特性——「順序執行」，電腦會完全照著你給的指令順序，一步一步前進。" }
            ]
        }
    },
    {
        name: "第二關：航向的變換",
        desc: "轉彎指令大挑戰！引導船隻避開暗礁，轉彎並抵達寶藏格。",
        size: 5,
        startPos: { x: 0, y: 4 },
        endPos: { x: 4, y: 0 },
        obstacles: [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }],
        driftwoods: [],
        trashIslands: [],
        sharks: [],
        portals: [],
        keyPos: null,
        limits: {
            forward: 0,
            backward: -1,
            left: 0,
            right: 0,
            shoot: -1,
            wait: -1,
            repeat_2: -1,
            repeat_3: -1,
            repeat_custom: -1
        },
        showRepeat: false,
        story: {
            title: "控制轉向：方向與狀態變更",
            concept: "💡 運算思維：狀態變更 (State Mutation)<br>在程式中，『旋轉轉向』與『位移前進』是兩個獨立的動作。左轉與右轉指令只會改變船隻的『面向狀態』（朝北、朝東、朝南、朝西），而不會改變坐標位置。轉身之後，必須搭配『前進』指令，船隻才會真正移動！",
            dialogue: [
                { role: "navigator", name: "羅盤 (🦜)", text: "前方有一排巨大的礁石擋住了去路！如果只會前進，我們會一頭撞上去！" },
                { role: "captain", name: "小傑 (🧑‍✈️)", text: "幸好舵輪的轉向鎖解開了，解鎖了『左轉』和『右轉』指令卡！只要先左轉或右轉就能繞過去了！" },
                { role: "navigator", name: "羅盤 (🦜)", text: "是的！注意，轉彎指令只會改變船的『方向』，不會讓船前進。在程式語言中，這叫做「狀態變更」，改變了方向狀態後，別忘了還要再放入前進卡喔！" }
            ]
        }
    },
    {
        name: "第三關：重覆的魔力",
        desc: "直線長廊！限制只能用一張前進卡，運用重複卡來跨越長海域吧。",
        size: 4,
        startPos: { x: 1, y: 3 },
        endPos: { x: 1, y: 0 },
        driftwoods: [],
        trashIslands: [],
        sharks: [],
        portals: [],
        keyPos: null,
        limits: {
            forward: 1,
            backward: -1,
            left: -1,
            right: -1,
            shoot: -1,
            wait: -1,
            repeat_2: -1,
            repeat_3: 1,
            repeat_custom: -1
        },
        obstacles: [],
        showRepeat: true,
        story: {
            title: "迴圈力量：減少冗餘程式碼",
            concept: "💡 運算思維：迴圈結構 (Loops)<br>程式中如果有很多相同的連續指令，例如前進 6 次，寫 6 次會顯得冗餘且佔空間。利用『迴圈 (Loop)』結構將重複的卡片包起來（例如 x2 重複、x3 重複，甚至巢狀組合），可以讓程式碼變得非常簡潔有邏輯！",
            dialogue: [
                { role: "captain", name: "小傑 (🧑‍✈️)", text: "前方是好長的一條狹長水道……等等！為什麼我們的『前進卡』只剩下一張可以用？！" },
                { role: "navigator", name: "羅盤 (🦜)", text: "哈哈！這是考驗！我們現在解鎖了『重複卡 x2/x3』。點擊重複卡，用右邊的箭頭把前進卡『包裹』起來，它就會像程式裡的『迴圈』一樣重複執行！" },
                { role: "captain", name: "小傑 (🧑‍✈️)", text: "原來如此！如果我用 x3 包裹一個重複卡，裡面再包 x2 的前進卡，3 乘以 2 就會前進 6 次了！" },
                { role: "navigator", name: "羅盤 (🦜)", text: "絕妙的思維！這在程式中稱為巢狀迴圈，用少量的指令就能完成巨大的工作量！" }
            ]
        }
    },
    {
        name: "第四關：殊途同歸",
        desc: "前進卡只剩 1 張！光放大它還走不完，得用重複卡拉長前進，再調轉船頭用倒退補完剩下的路程！",
        size: 7,
        startPos: { x: 3, y: 6 },
        endPos: { x: 3, y: 0 },
        obstacles: [],
        driftwoods: [],
        trashIslands: [],
        sharks: [],
        portals: [],
        keyPos: null,
        limits: {
            forward: 1,
            backward: 3,
            left: 2,
            right: 2,
            shoot: -1,
            wait: -1,
            repeat_2: -1,
            repeat_3: 1,
            repeat_custom: -1
        },
        showRepeat: true,
        story: {
            title: "殊途同歸：拆解目標與組合有限資源",
            concept: "💡 運算思維：問題拆解與資源組合 (Decomposition & Resource Composition)<br>當資源嚴重不足時（本關前進卡只有 1 張！），單一招式往往不夠，必須把目標『拆解』後再『組合』多種技巧達成。本關要前進 6 格，但：① 先用『重複卡(x3)』把唯一的前進放大成 3 步；② 走完前半段後，把船頭轉 180 度，再用『倒退卡(⬇️)』補完剩下的 3 格。學會分段拆解、組合有限指令完成等價移動，正是程式設計師最重要的能力！",
            dialogue: [
                { role: "captain", name: "小傑 (🧑‍✈️)", text: "不妙！這次的航道要前進 6 格，可是『前進卡』竟然只有 1 張……就算用重複卡放大到最多，也只能往前 3 格，還差一半的路啊！" },
                { role: "navigator", name: "羅盤 (🦜)", text: "別忘了這關解鎖的『倒退卡（⬇️）』！我們可以分兩段走：先用 x3 重複把那唯一的前進放大成 3 步，開到水道中央……" },
                { role: "captain", name: "小傑 (🧑‍✈️)", text: "然後把船頭轉 180 度！轉身之後，倒退其實就是朝著終點移動——用 3 張倒退卡剛好補完剩下的 3 格！" },
                { role: "navigator", name: "羅盤 (🦜)", text: "完全正確！把『重複』和『倒退』組合起來，即使前進資源少得可憐，照樣能抵達寶藏。這就是把大問題拆解、再用有限資源拼湊出解答的智慧！" },
                { role: "captain", name: "小傑 (🧑‍✈️)", text: "原來抵達同一個目的地，可以靠不同指令的巧妙組合——真是殊途同歸！" }
            ]
        }
    },
    {
        name: "第五關：無路可走？空間傳送",
        desc: "海域中央被石牆完全封死，只有紫傳送門能帶你跨越障礙！",
        size: 9,
        startPos: { x: 4, y: 8 },
        endPos: { x: 4, y: 0 },
        obstacles: [
            { x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 },
            { x: 5, y: 4 }, { x: 6, y: 4 }, { x: 7, y: 4 }, { x: 8, y: 4 }
        ],
        driftwoods: [],
        trashIslands: [],
        sharks: [],
        portals: [{ x: 4, y: 6, color: "purple" }, { x: 4, y: 2, color: "purple" }],
        keyPos: null,
        limits: {
            forward: 4,
            backward: -1,
            left: 1,
            right: 1,
            shoot: -1,
            wait: -1,
            repeat_2: -1,
            repeat_3: -1,
            repeat_custom: -1
        },
        showRepeat: false,
        story: {
            title: "空間跳躍：函數呼叫與控制流轉移",
            concept: "💡 運算思維：控制流轉移 / 函數呼叫 (Control Flow & Function Call)<br>在程式語言中，我們不一定要按順序一行行往下走。有時我們會遇到『跳躍語句』或『呼叫另一個函數 (Function)』，將執行焦點轉移到別的程式碼區塊。傳送門（渦流）就如同函數呼叫，能讓船隻瞬間轉移到另一端，節省移動步驟！",
            dialogue: [
                { role: "captain", name: "小傑 (🧑‍✈️)", text: "天啊！這堵石牆把整片海域完全攔腰切斷了！這根本不可能開得過去啊！" },
                { role: "navigator", name: "羅盤 (🦜)", text: "別擔心，海面上出現了神秘的『渦流傳送門』！當我們踏入其中一個傳送門時，就會被瞬間跳躍傳送到另一個相同顏色的傳送門！" },
                { role: "captain", name: "小傑 (🧑‍✈️)", text: "這就像是程式碼裡的跳躍指令（GoTo）或者是呼叫一個獨立的函式（Function Call），執行完畢後直接跳到另外一個地方！" },
                { role: "navigator", name: "羅盤 (🦜)", text: "比喻得太好了！利用傳送門，我們只需要極少量的指令就能穿越這道無法跨越的巨牆！" }
            ]
        }
    },
    {
        name: "第六關：金鑰密碼",
        desc: "寶藏箱上鎖了！你必須先拿到金鑰（鑰匙），才能成功打開終點寶藏。",
        size: 9,
        startPos: { x: 4, y: 8 },
        endPos: { x: 8, y: 4 },
        obstacles: [
            { x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 4 }, { x: 6, y: 4 }
        ],
        driftwoods: [],
        trashIslands: [],
        sharks: [],
        portals: [],
        keyPos: { x: 0, y: 4 },
        limits: {
            forward: 8,
            backward: -1,
            left: 2,
            right: 3,
            shoot: -1,
            wait: -1,
            repeat_2: -1,
            repeat_3: -1,
            repeat_custom: 0
        },
        showRepeat: true,
        story: {
            title: "條件解鎖：條件分支與 Flag 概念",
            concept: "💡 運算思維：條件判斷 (Conditionals - If/Else)<br>在程式執行時，很多動作需要滿足特定『條件』才能成功。例如：持有的鑰匙數量是否大於 0？本關中，程式引入了金鑰機制（在程式中常用 Boolean Flag 旗標表示，如 `hasKey = true`）。若未取得金鑰便直奔終點，將無法開啟寶藏，判定挑戰失敗！",
            dialogue: [
                { role: "navigator", name: "羅盤 (🦜)", text: "船長！這次的寶藏箱被金鎖鎖住了，雷達顯示在左側有一把『金鑰』！" },
                { role: "captain", name: "小傑 (🧑‍✈️)", text: "那如果我不拿鑰匙，直接開到終點會怎麼樣？" },
                { role: "navigator", name: "羅盤 (🦜)", text: "那寶藏箱就打不開，任務會宣告失敗！在程式設計中，這叫「條件分支 (If-Else)」。必須滿足「擁有金鑰 == 真 (True)」這個條件，抵達終點才會過關。" },
                { role: "captain", name: "小傑 (🧑‍✈️)", text: "我明白了！我要規劃路線，先繞到左邊去取得金鑰，再回頭開向寶藏！" }
            ]
        }
    },
    {
        name: "第七關：魚叉除錯",
        desc: "航道上漂流著巨大的浮木！解鎖射擊卡，發射魚叉擊碎它以開闢道路。",
        size: 9,
        startPos: { x: 4, y: 8 },
        endPos: { x: 4, y: 0 },
        obstacles: [],
        driftwoods: [{ x: 4, y: 4 }],
        trashIslands: [],
        sharks: [],
        portals: [],
        keyPos: null,
        limits: {
            forward: 4,
            backward: -1,
            left: -1,
            right: -1,
            shoot: 1,
            wait: -1,
            repeat_2: 2,
            repeat_3: 2,
            repeat_custom: 1
        },
        showRepeat: true,
        story: {
            title: "主動除錯：動作執行與 Bug 排除",
            concept: "💡 運算思維：除錯 (Debugging) 與函式執行<br>寫程式的過程中難免會遇到阻礙執行的錯誤（Bug）。如果我們只是盲目前進，程式就會崩潰（船隻撞上浮木失敗）。我們需要使用特定工具或程式碼（射擊卡）來排除阻礙。射擊指令會消除前方一格的浮木，為程式開闢安全路徑！",
            dialogue: [
                { role: "captain", name: "小傑 (🧑‍✈️)", text: "糟糕，中間的航道漂流著好大的一塊巨型浮木！船直接撞過去會翻船的！" },
                { role: "navigator", name: "羅盤 (🦜)", text: "別怕！我們解鎖了『射擊卡（🎯）』！這能呼叫船上的魚叉發射器，擊碎正前方一格的浮木！" },
                { role: "captain", name: "小傑 (🧑‍✈️)", text: "這就像是在排除程式中的錯誤（Bug）對吧！發現阻礙時，先主動用指令去排除它，然後程式才能順利執行下去。" },
                { role: "navigator", name: "羅盤 (🦜)", text: "非常生動的理解！看準浮木的方向，射出你的第一枚魚叉吧！" }
            ]
        }
    },
    {
        name: "第八關：惡臭防禦編程",
        desc: "海域上出現了惡臭的垃圾島，靠近一格內就會被臭死！請小心規劃繞開警戒區。",
        size: 9,
        startPos: { x: 4, y: 8 },
        endPos: { x: 4, y: 0 },
        obstacles: [],
        driftwoods: [],
        trashIslands: [{ x: 4, y: 4 }],
        sharks: [],
        portals: [],
        keyPos: null,
        limits: {
            forward: 6,
            backward: -1,
            left: 3,
            right: 3,
            shoot: -1,
            wait: -1,
            repeat_2: 2,
            repeat_3: 2,
            repeat_custom: 1
        },
        showRepeat: true,
        story: {
            title: "邊界與異常安全：防禦性程式設計",
            concept: "💡 運算思維：防禦性程式設計 (Defensive Programming)<br>高質量的程式不只在理想狀況下能跑，還要能預防潛在的「崩潰區（例外範圍）」。垃圾島的周圍一格是惡臭警戒區，進入該區域等同於程式執行時發生「異常 (Exception)」而中斷。我們在設計邏輯時，必須防範於未然，主動在邊界外繞行，確保程式絕對安全！",
            dialogue: [
                { role: "captain", name: "小傑 (🧑‍✈️)", text: "天哪，前方那座被綠色煙霧籠罩的島嶼是什麼？好臭啊！" },
                { role: "navigator", name: "羅盤 (🦜)", text: "那是『垃圾島』！它周圍一格（包含斜角）都是惡臭警戒區。如果我們的船開進去，船員會立刻被熏昏，導致航行失敗！" },
                { role: "captain", name: "小傑 (🧑‍✈️)", text: "也就是說，它有一個不可靠近的邊界！在程式設計中，這就像是要做好「防禦性編程」，必須主動設計邏輯去避開所有會觸發錯誤（Exception）的非法區間！" },
                { role: "navigator", name: "羅盤 (🦜)", text: "沒錯！讓我們遠遠繞開它，朝向安全的航道前進。" }
            ]
        }
    },
    {
        name: "第九關：鯊魚海域與時間同步",
        desc: "鯊魚海域的雙重考驗！巡邏鯊魚橫掃整片海域，兩側還有礁石與漂流浮木。善用等待時序、重複與射擊，算準時機安全穿越！",
        size: 9,
        startPos: { x: 4, y: 8 },
        endPos: { x: 4, y: 0 },
        obstacles: [
            { x: 2, y: 7 }, { x: 2, y: 5 }, { x: 6, y: 5 }, { x: 6, y: 7 },
            { x: 2, y: 3 }, { x: 6, y: 3 }, { x: 6, y: 1 }, { x: 2, y: 1 }
        ],
        driftwoods: [{ x: 3, y: 6 }, { x: 5, y: 6 }, { x: 5, y: 2 }, { x: 3, y: 2 }],
        trashIslands: [],
        sharks: [{ id: 1780321479415, x1: 0, y1: 4, x2: 8, y2: 4, curX: 0, curY: 4, direction: 1 }],
        portals: [],
        keyPos: null,
        limits: {
            forward: 5,
            backward: -1,
            left: 2,
            right: 2,
            shoot: 1,
            wait: 1,
            repeat_2: 1,
            repeat_3: 1,
            repeat_custom: -1
        },
        showRepeat: true,
        story: {
            title: "時序同步：併發、事件循環與等待機制",
            concept: "💡 運算思維：時序與併發控制 (Concurrency & Wait State)<br>在現代程式中，常常有複數個物件同時執行（我們移動一步，動態鯊魚也移動一步）。如果直接前進會與鯊魚在路徑上相撞。我們引入了『等待卡 (Wait)』，它代表程式中的 `sleep` 或等待事件狀態。以靜制動，讓鯊魚先走，利用時間差來完美協調多個併發物件的同步！<br><br>突破這片海域，傳說中的『運算神殿』就在前方等著你最後的試煉！",
            dialogue: [
                { role: "captain", name: "小傑 (🧑‍✈️)", text: "快看！水底下有一條好大的鯊魚，而且牠正在左右來回巡邏！" },
                { role: "navigator", name: "羅盤 (🦜)", text: "這是最困難的挑戰！我們每執行一個動作指令，鯊魚就會同步移動一格！正面撞上或者在窄道上交錯，我們都會被咬碎！" },
                { role: "captain", name: "小傑 (🧑‍✈️)", text: "牠的移動跟我們的動作是同步的！如果我們能原地不動，讓牠自己先游過去就好了。" },
                { role: "navigator", name: "羅盤 (🦜)", text: "這就是『等待指令（⏳）』的作用！它代表程式的暫停（Sleep）或等待狀態。不改變坐標，但讓時鐘滴答走一格，利用時間差避開巡邏的鯊魚！" },
                { role: "captain", name: "小傑 (🧑‍✈️)", text: "太妙了！我來計算牠的移動軌跡，用等待指令在拐角避開牠！" }
            ]
        }
    },
    {
        name: "第十關：運算神殿的終極試煉",
        desc: "終極試煉！神殿海域集結了所有險阻——礁石迷宮、漂流浮木、惡臭垃圾島、雙鯊魚巡邏、三色傳送門與金鑰寶藏。運用學過的每一種指令，證明你是真正的程式設計大師！",
        size: 12,
        startPos: { x: 0, y: 11 },
        endPos: { x: 7, y: 8 },
        obstacles: [
            { x: 0, y: 8 }, { x: 3, y: 11 }, { x: 4, y: 10 }, { x: 5, y: 9 }, { x: 6, y: 8 },
            { x: 7, y: 7 }, { x: 8, y: 6 }, { x: 9, y: 5 }, { x: 10, y: 4 }, { x: 11, y: 3 },
            { x: 1, y: 7 }, { x: 2, y: 6 }, { x: 3, y: 5 }, { x: 4, y: 4 }, { x: 5, y: 3 },
            { x: 6, y: 2 }, { x: 7, y: 1 }, { x: 8, y: 0 }
        ],
        driftwoods: [{ x: 10, y: 11 }, { x: 9, y: 10 }, { x: 8, y: 9 }],
        trashIslands: [{ x: 2, y: 1 }, { x: 10, y: 8 }],
        sharks: [
            { id: 1780324391778, x1: 9, y1: 11, x2: 4, y2: 11, curX: 9, curY: 11, direction: 1 },
            { id: 1780324746241, x1: 5, y1: 8, x2: 1, y2: 8, curX: 5, curY: 8, direction: 1 }
        ],
        portals: [
            { x: 10, y: 1, color: "green" }, { x: 0, y: 5, color: "green" },
            { x: 4, y: 0, color: "purple" }, { x: 0, y: 0, color: "purple" },
            { x: 0, y: 4, color: "blue" }, { x: 11, y: 11, color: "blue" }
        ],
        keyPos: { x: 4, y: 1 },
        limits: {
            forward: 8,
            backward: 4,
            left: 5,
            right: 5,
            shoot: 3,
            wait: 3,
            repeat_2: 4,
            repeat_3: 4,
            repeat_custom: 4
        },
        showRepeat: true,
        story: {
            title: "終極試煉：綜合應用與問題分解",
            concept: "💡 運算思維：綜合應用與問題分解 (Synthesis & Decomposition)<br>真正的程式設計，是把學過的所有概念綜合起來，解決一個複雜的大問題。這片終極海域同時考驗你的每一項能力：順序與迴圈（重複卡）、條件判斷（先取得金鑰才能開啟寶藏）、函式跳轉（三色傳送門）、除錯（射擊清除浮木）、防禦性設計（繞開垃圾島的臭氣警戒區）、以及併發時序（避開兩條巡邏鯊魚）。秘訣是『問題分解』——把龐大的航程拆成一段段小目標，逐一征服，就能抵達神殿核心！",
            dialogue: [
                { role: "navigator", name: "羅盤 (🦜)", text: "船長，我們終於抵達了傳說的核心——『運算神殿』的最後一道海域！" },
                { role: "captain", name: "小傑 (🧑‍✈️)", text: "哇……這裡什麼都有！礁石迷宮、漂流浮木、惡臭的垃圾島，還有兩條鯊魚在巡邏，水面上甚至有三種顏色的傳送門！" },
                { role: "navigator", name: "羅盤 (🦜)", text: "沒錯，這是集結了所有試煉的終極關卡。但別忘了，你一路上學到的每一招，都將在這裡派上用場！" },
                { role: "captain", name: "小傑 (🧑‍✈️)", text: "我懂了！把大問題拆成小段——用傳送門縮短路程、射擊清開浮木、算準鯊魚的時序、繞開臭氣、先取得金鑰，再開向寶藏！" },
                { role: "navigator", name: "羅盤 (🦜)", text: "這正是程式設計師的思維！深呼吸，運用你的全部智慧，征服這最後的試煉吧！" }
            ],
            epilogue: "當船隻安穩停靠在寶藏前，運算神殿的大門隨著一道智慧之光緩緩開啟——你征服了集結一切險阻的終極試煉！\n\n回顧這趟航程，小傑從只會「順序執行」的新手，一路學會了轉向（狀態變更）、迴圈、模式識別、等價替換（重複與倒退）、傳送門（函式呼叫）、金鑰（條件判斷）、魚叉（除錯）、繞避臭氣（防禦性編程）、與鯊魚的時序同步（併發控制），最後在神殿試煉中將它們全部融會貫通。\n\n羅盤拍著翅膀說：「船長，你已經像一位真正的程式設計師一樣思考了！把大問題拆解成小步驟，找出規律、善用工具、預防錯誤、協調時序——這就是『運算思維』的力量。」\n\n神殿核心的智慧之光照亮了整片編程之海。恭喜你成為傳奇航海家，而真正的程式冒險，才正要開始……🌟"
        }
    }
];
