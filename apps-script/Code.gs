const SHEET_NAME = 'Responses';

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    const answers = Array.isArray(payload.answers) ? payload.answers : [];
    const sheet = getOrCreateSheet_();

    const row = [
      new Date(),
      payload.submittedAt || '',
      payload.userAgent || '',
      ...answers.map((item) => item.answer || '')
    ];

    if (sheet.getLastRow() === 0) {
      const header = [
        'created_at',
        'submitted_at_iso',
        'user_agent',
        ...answers.map((item, index) => `q${index + 1}_${item.id}`)
      ];
      sheet.appendRow(header);
    }

    sheet.appendRow(row);

    return jsonOutput_({ ok: true });
  } catch (error) {
    return jsonOutput_({
      ok: false,
      error: error && error.message ? error.message : 'Unknown error'
    });
  }
}

function doGet() {
  return jsonOutput_({ ok: true, status: 'alive' });
}

function getOrCreateSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const existing = spreadsheet.getSheetByName(SHEET_NAME);
  if (existing) {
    return existing;
  }
  return spreadsheet.insertSheet(SHEET_NAME);
}

function jsonOutput_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
