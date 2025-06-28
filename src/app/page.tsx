import Image from "next/image";
import LoginWithInstagram from "./login";
export default async function Home() {
  const response = await fetch('https://birthdayserver-rbs9.vercel.app/api/postStory', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      accessToken: 'YOUR_LONG_LIVED_ACCESS_TOKEN',
      igUserId: 'YOUR_INSTAGRAM_USER_ID',
      imageUrl: 'https://example.com/your-image.jpg', // Must be public HTTPS URL
    }),
  });

  const result = await response.json();
  console.log('Story Post Result:', result);

  return (
    <div>
      <p>Birthdays</p>
      {/* <p>{result}</p> */}
    </div>
  );
}
