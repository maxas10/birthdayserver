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
}
