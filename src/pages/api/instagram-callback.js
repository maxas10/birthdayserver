export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Missing authorization code' });
  }

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
      return res.status(200).json({ access_token: data.access_token });
    } else {
      return res.status(500).json({ error: 'Token exchange failed', details: data });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Unexpected error' });
  }
}