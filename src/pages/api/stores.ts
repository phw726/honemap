import { StoreApiResponse, StoreType } from '@/interface';
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<StoreApiResponse | StoreType[]>) {
  const { page = '' }: { page?: string } = req.query;
  const skipPage = parseInt(page) - 1;
  const prisma = new PrismaClient();

  if (page) {
    const count = await prisma.store.count();

    const stores = await prisma.store.findMany({
      orderBy: { id: 'asc' },
      take: 10,
      skip: skipPage * 10,
    });

    //totalpage, data, page  전달

    res.status(200).json({
      page: parseInt(page),
      data: stores,
      totalCount: count,
      totalPage: Math.ceil(count / 10),
    });
  } else {
    const stores = await prisma.store.findMany({
      orderBy: { id: 'asc' },
    });

    return res.status(200).json(stores);
  }
}
