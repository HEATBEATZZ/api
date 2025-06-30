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

  const { user_id, item_type, item_name } = req.body || {};
  if (!user_id || !item_type || !item_name) {
    return res.status(400).json({ success: false, error: 'Missing fields' });
  }

  const conn = await getConnection();
  await conn.execute(
    'DELETE FROM favorites WHERE user_id=? AND item_type=? AND item_name=?',
    [user_id, item_type, item_name]
  );
  await conn.end();

  res.json({ success: true });
} 