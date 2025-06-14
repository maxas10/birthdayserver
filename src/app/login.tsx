export default function LoginWithInstagram() {
  const handleLogin = () => {
    const redirectUri = encodeURIComponent(
      "https://yourdomain.com/api/instagram-callback"
    ); // Replace with your real callback URL
    const clientId = "YOUR_INSTAGRAM_APP_ID";

    const authUrl =
      `https://www.facebook.com/v18.0/dialog/oauth?` +
      new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        scope: "instagram_basic, pages_show_list",
        response_type: "code",
      });

    window.location.href = authUrl;
  };
  return <button onClick={handleLogin}>Login with Instagram</button>;
}
