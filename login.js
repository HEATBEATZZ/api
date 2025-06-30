import { getConnection } from './db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Missing email or password' });
  }

  const conn = await getConnection();
  const [rows] = await conn.execute(
    'SELECT id, email FROM users WHERE email=? AND password=?',
    [email, password]
  );
  await conn.end();

  if (rows.length > 0) {
    res.json({ success: true, user: rows[0] });
  } else {
    res.json({ success: false, error: 'Invalid credentials' });
  }
} 