export default async function handler(req, res) {
    const { code } = req.query;
    let shortaccesstoken;
    if (!code) {
        return res.status(400).json({ error: 'Missing authorization code' });
    }

    console.log(process.env.app_id, process.env.secret, process.env.NEXT_PUBLIC_REDIRECT, code);
    // Build token exchange URL
    const params = new URLSearchParams({
        client_id: process.env.app_id,
        client_secret: process.env.secret,
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT,
        code,
    });

    try {
        // Exchange code for access token
        const response = await fetch(`https://graph.facebook.com/v18.0/oauth/access_token?${params}`);
        const data = await response.json();

        if (data.access_token) {
            // Success! You can now store or use the token

        } else {
            return res.status(500).json({ error: 'Token exchange failed', details: data });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Unexpected error' });
    } finally {
        const params2 = new URLSearchParams({
            grant_type: 'fb_exchange_token',
            client_id: process.env.app_id,
            client_secret: process.env.secret,
            fb_exchange_token: shortaccesstoken,
        });
        console.log(shortaccesstoken)

        const response = await fetch(`https://graph.facebook.com/v18.0/oauth/access_token?${params2}`);
        const data = await response.json();

        console.log(data); // Contains long-lived token
    }
}