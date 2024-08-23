import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get('https://emkc.org/api/v2/runtimes');
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching runtimes' });
  }
}
