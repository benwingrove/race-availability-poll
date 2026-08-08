const SHEET_NAME = "Responses";

function doGet(event) {
  const callback = event.parameter.callback || "callback";
  const data = {
    responses: getResponses()
  };

  return ContentService
    .createTextOutput(`${callback}(${JSON.stringify(data)})`)
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function doPost(event) {
  const payload = JSON.parse(event.postData.contents || "{}");
  const name = String(payload.name || "").trim().replace(/\s+/g, " ");
  const races = Array.isArray(payload.races) ? payload.races : [];

  if (!name || races.length === 0) {
    return json({ ok: false, error: "Name and at least one race are required." });
  }

  const sheet = getSheet();
  const values = sheet.getDataRange().getValues();
  const lowerName = name.toLowerCase();
  let rowToUpdate = -1;

  for (let index = 1; index < values.length; index += 1) {
    if (String(values[index][0]).toLowerCase() === lowerName) {
      rowToUpdate = index + 1;
      break;
    }
  }

  const row = [name, JSON.stringify(races), new Date().toISOString()];
  if (rowToUpdate > -1) {
    sheet.getRange(rowToUpdate, 1, 1, row.length).setValues([row]);
  } else {
    sheet.appendRow(row);
  }

  return json({ ok: true });
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Name", "Races", "Updated At"]);
  }

  return sheet;
}

function getResponses() {
  const sheet = getSheet();
  const values = sheet.getDataRange().getValues().slice(1);

  return values
    .filter((row) => row[0] && row[1])
    .map((row) => {
      let races = [];

      try {
        races = JSON.parse(row[1]);
      } catch (error) {
        races = [];
      }

      return {
        name: String(row[0]),
        races,
        updatedAt: String(row[2] || "")
      };
    });
}

function json(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
