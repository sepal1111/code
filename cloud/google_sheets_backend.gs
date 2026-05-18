/**
 * 找到寶藏吧！邏輯冒險 - 全自動 Google Sheets 後端 Apps Script
 * 
 * 💡 特色：
 * 1. 📂 零手動建表：首次執行或任何學生/老師連線時，會自動建立 Students 與 CustomMaps 分頁並排版！
 * 2. 🔑 PIN 碼安全機制：驗證 6 位數字 PIN 碼，首次存檔自動綁定，防止互踩進度。
 * 3. 🌐 CORS 跨域支援：完美支援前端 fetch 串接。
 */

// ==================== 🛠️ 全自動建表核心 (自動被 doGet/doPost 呼叫) ====================
function checkAndInitializeSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. 初始化 Students (學生進度表) 工作表
  var studentSheet = ss.getSheetByName("Students");
  if (!studentSheet) {
    studentSheet = ss.insertSheet("Students");
    studentSheet.appendRow(["class_seat", "pin", "progressCode", "updatedAt"]);
    // 自動美化標題列樣式 (粉藍底色 + 粗體 + 置中)
    studentSheet.getRange("A1:D1").setFontWeight("bold").setBackground("#bae6fd").setHorizontalAlignment("center");
    studentSheet.setFrozenRows(1);
    studentSheet.setColumnWidths(1, 4, 150);
  }
  
  // 2. 初始化 CustomMaps (自訂地圖庫) 工作表
  var mapSheet = ss.getSheetByName("CustomMaps");
  if (!mapSheet) {
    mapSheet = ss.insertSheet("CustomMaps");
    mapSheet.appendRow(["class_seat", "pin", "mapId", "mapName", "mapDesc", "mapCode", "date"]);
    // 自動美化標題列樣式 (粉黃底色 + 粗體 + 置中)
    mapSheet.getRange("A1:G1").setFontWeight("bold").setBackground("#fef3c7").setHorizontalAlignment("center");
    mapSheet.setFrozenRows(1);
    mapSheet.setColumnWidths(1, 7, 150);
  }
}

// 首次您可以選擇此函式並點擊「執行」，手動觸發建表（非必做，連線時也會自動跑）
function initDatabase() {
  checkAndInitializeSheets();
  Logger.log("🎉 試算表資料庫初始化成功！已為您自動建立 Students 與 CustomMaps 工作表。您現在可以直接點選『部署』！");
}


// ==================== 🌐 接收 GET 請求 (查詢進度、下載地圖、老師拉取) ====================
function doGet(e) {
  checkAndInitializeSheets();
  var action = e.parameter.action;
  
  if (action === "get_student_record") {
    return handleGetStudentRecord(e);
  } else if (action === "get_all_students") {
    return handleGetAllStudents(e);
  } else if (action === "get_custom_maps") {
    return handleGetCustomMaps(e);
  }
  
  return jsonResponse({ status: "error", message: "無效的 GET 動作" });
}


// ==================== 🌐 接收 POST 請求 (學生同步、上傳自訂地圖) ====================
function doPost(e) {
  checkAndInitializeSheets();
  var postData;
  try {
    postData = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonResponse({ status: "error", message: "JSON 格式解析錯誤" });
  }
  
  var action = postData.action;
  if (action === "submit_record") {
    return handleSubmitRecord(postData);
  } else if (action === "upload_map") {
    return handleUploadMap(postData);
  }
  
  return jsonResponse({ status: "error", message: "無效的 POST 動作" });
}


// 統一輔助函式：回傳 JSON 標頭，Google Apps Script 會自動加入 CORS 跨域重導向支援
function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}


// -------------------- 1. 查詢學生進度 (GET) --------------------
function handleGetStudentRecord(e) {
  var cls = (e.parameter.class || "").trim();
  var seat = (e.parameter.seat || "").trim();
  var pin = (e.parameter.pin || "").trim();
  var key = cls + "_" + seat;
  
  if (!cls || !seat || pin.length !== 6 || isNaN(pin)) {
    return jsonResponse({ status: "error", message: "輸入欄位不完整或 PIN 碼格式非 6 位數字" });
  }
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Students");
  var rows = sheet.getDataRange().getValues();
  
  for (var i = 1; i < rows.length; i++) {
    if (rows[i][0] === key) {
      var savedPin = String(rows[i][1]).trim();
      if (savedPin !== pin) {
        return jsonResponse({ status: "error", message: "🔑 密碼 PIN 碼錯誤，無法讀取進度！" });
      }
      return jsonResponse({
        status: "success",
        found: true,
        data: {
          class_seat: key,
          progressCode: rows[i][2],
          updatedAt: rows[i][3]
        }
      });
    }
  }
  
  return jsonResponse({ status: "success", found: false, message: "無存檔紀錄，可直接開始遊玩並以此 PIN 碼開戶。" });
}


// -------------------- 2. 學生存檔/同步 (POST) --------------------
function handleSubmitRecord(data) {
  var cls = (data.class || "").trim();
  var seat = (data.seat || "").trim();
  var pin = (data.pin || "").trim();
  var code = (data.code || "").trim();
  var key = cls + "_" + seat;
  
  if (!cls || !seat || pin.length !== 6 || isNaN(pin) || !code) {
    return jsonResponse({ status: "error", message: "輸入欄位不完整或 PIN 碼非 6 位數字" });
  }
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Students");
  var rows = sheet.getDataRange().getValues();
  var foundIndex = -1;
  
  for (var i = 1; i < rows.length; i++) {
    if (rows[i][0] === key) {
      foundIndex = i + 1; // 轉為 1-indexed 行數
      var savedPin = String(rows[i][1]).trim();
      if (savedPin !== pin) {
        return jsonResponse({ status: "error", message: "🔑 PIN 碼錯誤！該帳號已在雲端被其他密碼鎖定。" });
      }
      break;
    }
  }
  
  var now = new Date();
  if (foundIndex !== -1) {
    sheet.getRange(foundIndex, 3).setValue(code); // 更新進度碼
    sheet.getRange(foundIndex, 4).setValue(now);
  } else {
    sheet.appendRow([key, pin, code, now]); // 註冊新帳號並綁定 PIN 碼
  }
  
  return jsonResponse({ status: "success", message: "雲端存檔成功！" });
}


// -------------------- 3. 教師獲取所有學生成績 (GET) --------------------
function handleGetAllStudents(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Students");
  var rows = sheet.getDataRange().getValues();
  var list = [];
  
  for (var i = 1; i < rows.length; i++) {
    list.push({
      class_seat: rows[i][0],
      progressCode: rows[i][2],
      updatedAt: rows[i][3]
    });
  }
  
  return jsonResponse({ status: "success", data: list });
}


// -------------------- 4. 學生上傳自訂地圖 (POST) --------------------
function handleUploadMap(data) {
  var cls = (data.class || "").trim();
  var seat = (data.seat || "").trim();
  var pin = (data.pin || "").trim();
  var mapName = (data.mapName || "").trim();
  var mapDesc = (data.mapDesc || "").trim();
  var mapCode = (data.mapCode || "").trim();
  var key = cls + "_" + seat;
  
  if (!cls || !seat || pin.length !== 6 || isNaN(pin) || !mapCode) {
    return jsonResponse({ status: "error", message: "欄位不完整或 PIN 碼非 6 位數字" });
  }
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("CustomMaps");
  var rows = sheet.getDataRange().getValues();
  
  // 檢查該使用者的 PIN 碼是否一致
  for (var i = 1; i < rows.length; i++) {
    if (rows[i][0] === key) {
      var savedPin = String(rows[i][1]).trim();
      if (savedPin !== pin) {
        return jsonResponse({ status: "error", message: "🔑 密碼鎖錯誤！此帳號地圖庫已綁定其他 PIN 碼。" });
      }
      break;
    }
  }
  
  // 檢查是否是同一張地圖名稱，同名則覆蓋，否則新增
  var mapIndex = -1;
  for (var i = 1; i < rows.length; i++) {
    if (rows[i][0] === key && rows[i][3] === mapName) {
      mapIndex = i + 1;
      break;
    }
  }
  
  var now = new Date();
  if (mapIndex !== -1) {
    sheet.getRange(mapIndex, 5).setValue(mapDesc);
    sheet.getRange(mapIndex, 6).setValue(mapCode);
    sheet.getRange(mapIndex, 7).setValue(now);
  } else {
    var mapId = "map_" + Date.now();
    sheet.appendRow([key, pin, mapId, mapName, mapDesc, mapCode, now]);
  }
  
  return jsonResponse({ status: "success", message: "自訂地圖已儲存至雲端地圖庫！" });
}


// -------------------- 5. 獲取學生自訂地圖列表 (GET) --------------------
function handleGetCustomMaps(e) {
  var cls = (e.parameter.class || "").trim();
  var seat = (e.parameter.seat || "").trim();
  var pin = (e.parameter.pin || "").trim();
  var key = cls + "_" + seat;
  
  if (!cls || !seat || pin.length !== 6 || isNaN(pin)) {
    return jsonResponse({ status: "error", message: "欄位不完整或 PIN 碼非 6 位數字" });
  }
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("CustomMaps");
  var rows = sheet.getDataRange().getValues();
  var userMaps = [];
  
  // 驗證 PIN 碼
  var userHasRecords = false;
  for (var i = 1; i < rows.length; i++) {
    if (rows[i][0] === key) {
      userHasRecords = true;
      var savedPin = String(rows[i][1]).trim();
      if (savedPin !== pin) {
        return jsonResponse({ status: "error", message: "🔑 密碼鎖錯誤，無法讀取您的雲端地圖庫！" });
      }
    }
  }
  
  if (!userHasRecords) {
    return jsonResponse({ status: "success", maps: [] });
  }
  
  // 撈出該使用者的所有地圖
  for (var i = 1; i < rows.length; i++) {
    if (rows[i][0] === key) {
      userMaps.push({
        id: rows[i][2],
        mapName: rows[i][3],
        mapDesc: rows[i][4],
        mapCode: rows[i][5],
        date: new Date(rows[i][6]).toLocaleString()
      });
    }
  }
  
  return jsonResponse({ status: "success", maps: userMaps });
}
