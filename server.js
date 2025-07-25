
import dotenv from "dotenv";
dotenv.config();
import fetch from "node-fetch";
const token = process.env.token;
function sendMessage() {
  fetch("https://graph.facebook.com/v18.0/me/messages", {
    method: "POST",
    headers: {
      "Authorization": "Bearer IGAAKWz72RzUdBZAE5GZAmZA5OVdNZAG9MbTZAqaWU0ZAUp0ellHU3VxcEplR1JNQzFKSzBXbUFiT2o2OXNxSEFEeWF2RTdtWmV2TEZA3TEx4QUg0akxyeHZAyX2d4SU1HWjVCMjBsMnNZAeGFKMVg2Mk10Qi1aOVVqZA0NlWWZA5WGN1MHlCdwZDZD",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        recipient: { id: "PSID" }, // PSID = Page Scoped ID of the user
        message: { text: "Hello!" }
    })
  }).then(res => res.json()).then(data => console.log(data))
}

sendMessage();  

app.post('/webhook', express.json(), (req, res) => {
  console.log('📩 Received webhook:', JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});