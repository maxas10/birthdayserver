import fetch from "node-fetch";
import dotenv from "dotenv";
  dotenv.config();
import express from "express";


const token = process.env.token;
// fetch("https://graph.instagram.com/v23.0/me/media?access_token=" + token).then(res => res.json()).then(data => console.log(data));
function sendMessage() {
  fetch("https://graph.instagram.com/v23.0/me/messages", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: {
      "recipient": {"id": "18044670743627843"},
      "message": {"text": "Hello!"}
    }
  }).then(res => res.json()).then(data => console.log(data))
}

sendMessage();  

const app = express();
app.get("/callback", (req,res) => {
    const code = req.query;
    console.log("Auth code: " + code);
    res.send("Callback recieved!");
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})