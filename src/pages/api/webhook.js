// export default async function handler(req, res) {
//   const VERIFY_TOKEN = "birthday123"; // Match this in Meta App

//   if (req.method === "GET") {
//     // Webhook Verification
//     const mode = req.query["hub.mode"];
//     const token = req.query["hub.verify_token"];
//     const challenge = req.query["hub.challenge"];

//     if (mode === "subscribe" && token === VERIFY_TOKEN) {
//       console.log("✅ WEBHOOK VERIFIED");
//       res.status(200).send(challenge);
//       console.log(challenge)
//     } else {
//       res.sendStatus(403);
//     }
//   } else if (req.method === "POST") {
//     // Webhook Event (message from IG user)
//     console.log("📩 Webhook Event Received:", JSON.stringify(req.body, null, 2));
//     res.sendStatus(200);
//   } else {
//     res.setHeader("Allow", ["GET", "POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

export default function handler(req, res) {
  if (req.method === "GET") {
    const VERIFY_TOKEN = "birthday123";
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("✅ Webhook verified:", challenge);
      return res.status(200).send(String(challenge)); // ✅ convert to string
    } else {
      return res.status(403).send("Forbidden");
    }
  }

  if (req.method === "POST") {
    const body = req.body;

    if (body.object === "instagram") {
      body.entry.forEach(entry => {
        entry.messaging.forEach(event => {
          const psid = event.sender.id;
          console.log("📩 Received message from PSID:", psid);
          // Optional: Log the full message
          console.log("📝 Message content:", event.message?.text);

          // send message back
          sendMessage(psid);
        });
      });

      return res.status(200).send("EVENT_RECEIVED");
    } else {
      return res.sendStatus(404);
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}

async function sendMessage(psid) {
  try {
    const req = await fetch("https://graph.facebook.com/LATEST_API_VERSION/me/messages?access_token=" + process.env.page_token, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        recipient: { id: psid }, // PSID = Page Scoped ID of the user
        message: { text: "You are chatting with my bot 🤖 \n\n Hello!" }
      })
    })

    const res = await req.json();
    console.log(res);
  } catch (error) {
    console.log("Error: ", error);
  }
}