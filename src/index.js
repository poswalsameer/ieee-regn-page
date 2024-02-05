const scriptURL = 'https://script.google.com/macros/s/AKfycby9UJyyqZbIKYXZBLAsJ0smggpcoBQZq-eW2EZUpcTSpErhqOkrzRC45mGqT35_Ntu7/exec';

const form = document.getElementById('contactForm');
const btn = document.getElementById('submitBtn');

function validateForm() {
  var inputs = document.getElementsByTagName('input');
  var selects = document.getElementsByTagName('select');
  
  for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].value.trim() === '') {
          alert('Please fill in all fields');
          return false;
      }
  }
  
  for (var i = 0; i < selects.length; i++) {
      if (selects[i].value.trim() === '') {
          alert('Please fill in all fields');
          return false;
      }
  }
  
  return true;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  if(validateForm()){
    btn.value = "Submitting";
    // .then(response => console.log('Success', response))
    fetch(scriptURL, {method: 'POST', body: new FormData(form)})
      .then( response => window.location.href = './src/success.html')
      .catch(error => console.error('Error!', error.message))
  }

})

// form.addEventListener('submit', (e) => {
//   e.preventDefault();
  
//   btn.value = "Submitting";
//   // .then(response => console.log('Success', response))
//   fetch(scriptURL, {method: 'POST', body: new FormData(form)})
//     .then( response => window.location.href = './src/success.html')
//     .catch(error => console.error('Error!', error.message))

// })

// let data = new FormData(form);
  // fetch('https://script.google.com/macros/s/AKfycbz0BnQdns0F-tWiNEpq6m2q_7Mc_iXjwd1icXnFKKD9S9_LXxWIGvLy0zyXR12S4iAu/exec',{
  //   method: "POST",
  //   body: data
  // })
  //   .then(res => res.text())
  //   .then(data =>console.log(data))



// import express from "express";
// import { ZodError, z } from "zod";
// import sheets, { SHEET_ID } from "./sheetclient.js";
// import { fileURLToPath } from "url";
// import path from "path";

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// const app = express();

// const contactFormSchema = z.object({
//   name: z.string().min(1, { message: "Name is required" }),
//   rollNumber: z.string().min(1, { message: "Roll Number is required" }),
//   year: z.string().min(1, { message: "Year is required" }),
//   branch: z.string().min(1, { message: "Branch is required" }),
//   email: z.string().email(),
//   phoneNumber: z.string().min(1, { message: "Phone Number is required" }),
//   skills: z.string().min(1, { message: "Skills is required" }),
// });

// app.use(express.json());
// app.use(express.static("public"));

// app.post("/send-message", async (req, res) => {
//   try {
//     const body = contactFormSchema.parse(req.body);

//     // objects to sheets

//     const rows = Object.values(body);

//     console.log(rows);
//     console.log(import.meta);

//     await sheets.spreadsheets.values.append({
//       spreadsheetId: SHEET_ID,
//       range: "Data!A:C",
//       insertDataOption: "INSERT_ROWS",
//       valueInputOption: "RAW",
//       requestBody: {
//         values: [rows],
//       },
//     });
//     //res.json({ message: "Data added successfully" });
//     res.redirect("/success");
//   } catch (error) {
//     if (error instanceof ZodError) {
//       res.status(400).json({ error: error.message });
//     } else {
//       res.status(400).json({ error: error });
//     }
//   }
// });

// app.get("/success", (req, res) => {
//   res.sendFile(`${__dirname}/success.html`);
// });

// app.listen(5000, () => console.log("App running on http://localhost:5000"));
