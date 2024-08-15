import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from "@/lib/mongo/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect();
    res.status(200).json({ message: 'Connected to MongoDB' });
};

export default handler;
