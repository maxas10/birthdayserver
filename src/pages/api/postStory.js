export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { accessToken, igUserId, imageUrl } = req.body;

  if (!accessToken || !igUserId || !imageUrl) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  console.log('uploaded story media')
  try {
    // Step 1: Upload Story media
    const uploadParams = new URLSearchParams({
      image_url: imageUrl,
      is_stories: 'true',
      access_token: accessToken,
    });
    const uploadResponse = await fetch(`https://graph.facebook.com/v18.0/${igUserId}/media?${uploadParams}`, {
      method: 'POST',
    });

    const uploadData = await uploadResponse.json();

    if (!uploadData.id) return res.status(500).json({ error: 'Failed to upload media', details: uploadData });
    console.log('uploaded story media')
    // Step 2: Publish the Story
    const publishResponse = await fetch(`https://graph.facebook.com/v18.0/${igUserId}/media_publish?access_token=${accessToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ creation_id: uploadData.id }),
    });

    const publishData = await publishResponse.json();

    console.log('published')
    return res.status(200).json({ success: true, publishData });
  } catch (error) {
    return res.status(500).json({ error: 'Unexpected error', details: error.message });
  }
}