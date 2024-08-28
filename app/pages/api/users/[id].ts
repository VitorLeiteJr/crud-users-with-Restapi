import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const user = await prisma.user.findUnique({ where: { id: String(id) } });
    res.status(200).json(user);
  } else if (req.method === 'PUT') {
    const { name, email } = req.body;
    try {
      const updatedUser = await prisma.user.update({
        where: { id: String(id) },
        data: { name, email },
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: 'User update failed' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.user.delete({ where: { id: String(id) } });
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ error: 'User deletion failed' });
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
