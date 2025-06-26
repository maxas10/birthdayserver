export default function handler(req, res) {
    const { code } = req.query;
    if (code) {
        // Exchange code for access token
        res.status(200).json({ message: 'Code received', code });
    } else {
        res.status(400).json({ error: 'No code found' });
    }
}