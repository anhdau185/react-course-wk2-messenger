import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from 'data';
import { init } from 'data/repository';

async function AccountsAPI(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const accounts = await getAllAccounts();
      return res.status(200).json(accounts);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export async function getAllAccounts() {
  await init();
  return db.data?.users ?? []; // return all accounts from db
}

export default AccountsAPI;
