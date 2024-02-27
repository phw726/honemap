import { StoreType } from '@/interface';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<StoreType[]>) {
  const stores = (await import('../../mapdata/store_data.json'))['DATA'] as StoreType[];

  res.status(200).json(stores);
}
