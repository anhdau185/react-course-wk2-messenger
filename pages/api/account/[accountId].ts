import type { NextApiRequest, NextApiResponse } from 'next';

import { getAccountById, init } from 'data/repository';

export async function getAccount(accountId: string) {
  await init();
  const account = await getAccountById(accountId);

  return account;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const accountId = req.query.accountId as string;
      const account = await getAccount(accountId);

      return res.status(200).json(account);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
