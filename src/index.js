import express from "express";
import { ZodError, z } from "zod";
import sheets, { SHEET_ID } from "./sheetclient.js";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  rollNumber: z.string().min(1, { message: "Roll Number is required" }),
  year: z.string().min(1, { message: "Year is required" }),
  branch: z.string().min(1, { message: "Branch is required" }),
  email: z.string().email(),
  phoneNumber: z.string().min(1, { message: "Phone Number is required" }),
  skills: z.string().min(1, { message: "Skills is required" }),
});

app.use(express.json());
app.use(express.static("public"));

app.post("/send-message", async (req, res) => {
  try {
    const body = contactFormSchema.parse(req.body);

    // objects to sheets

    const rows = Object.values(body);

    console.log(rows);
    console.log(import.meta);

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "Data!A:C",
      insertDataOption: "INSERT_ROWS",
      valueInputOption: "RAW",
      requestBody: {
        values: [rows],
      },
    });
    //res.json({ message: "Data added successfully" });
    res.redirect("/success");
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: error });
    }
  }
});

app.get("/success", (req, res) => {
  res.sendFile(`${__dirname}/success.html`);
});

app.listen(5000, () => console.log("App running on http://localhost:5000"));
