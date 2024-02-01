import { google } from "googleapis";

import key from "../secrets.json" assert { type: "json" };

export const SHEET_ID = "1_zmoq-sHhQEZuwHFq6YIZpuo72-V33zSp0LyXWLtYK8";

const client = new google.auth.JWT(key.client_email, null, key.private_key, [
  "https://www.googleapis.com/auth/spreadsheets",
]);

const sheets = google.sheets({ version: "v4", auth: client });

export default sheets;
