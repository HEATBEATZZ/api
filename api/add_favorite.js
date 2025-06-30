import { getConnection } from './db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { user_id, item_type, item_name, item_data } = req.body || {};
  if (!user_id || !item_type || !item_name || !item_data) {
    return res.status(400).json({ success: false, error: 'Missing fields' });
  }

  const conn = await getConnection();
  await conn.execute(
    'INSERT IGNORE INTO favorites (user_id, item_type, item_name, item_data) VALUES (?, ?, ?, ?)',
    [user_id, item_type, item_name, JSON.stringify(item_data)]
  );
  await conn.end();

  res.json({ success: true });
} 