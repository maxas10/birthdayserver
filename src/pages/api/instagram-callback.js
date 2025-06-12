export default async function handler(req, res) {
    const code = req.query;

    if(!code) {
        console.log("instagram didn't send you code");
    }

    try {
        const response = await fetch("https://graph.facebook.com/v18.0/oauth/access_token?" + new URLSearchParams({
            client_id: process.env.id,
            client_secret: process.env.secret,
            redirect_uri: process.env.redirect,
            code,
        }));

        const data = await response.json();
        console.log(data);

        if(data.access_token) {
            res.status(200).send("success! access_token: " + data.access_token);
        } else {
            res.status(500).json(data);
        }
    } catch(error) {
        res.status(500).send("token exchange failed")
    }
}