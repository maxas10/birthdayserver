'use client';

export default function LoginWithInstagram() {
      console.log(String(process.env.NEXT_PUBLIC_REDIRECT));
  const handleLogin = () => {
    const redirectUri = encodeURIComponent(
      String(process.env.NEXT_PUBLIC_REDIRECT)
    ); // Replace with your real callback URL
    const clientId:any = process.env.NEXT_PUBLIC_ID;

    const authUrl =
      `https://graph.facebook.com/v18.0/me/accounts?access_token=` +
      new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        scope: "instagram_basic, pages_show_list",
        response_type: "code",
      });
    alert(authUrl)
    window.location.href = authUrl;
  };
  return <button onClick={handleLogin}>Login with Instagram</button>;
}
