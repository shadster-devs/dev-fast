// src/pages/api/user/index.ts
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]'; // Path to your NextAuth configuration
import dbConnect from '@/lib/mongo/mongodb';
import User from '@/lib/mongo/models/User';
import type { NextApiRequest, NextApiResponse } from 'next';
import {Session} from "next-auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    const session: Session | null = await getServerSession(req as any, res as any, authOptions as any);

    if (!session || !session.user || !session.user.email || !session.user.name || !session.user.image) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { email, name, image } = session.user;

    switch (req.method) {
        case 'GET':
            try {
                const user = await User.findOne({ email });

                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }

                res.status(200).json(user);
            } catch (error) {
                res.status(500).json({ message: 'Failed to fetch user data' });
            }
            break;

        case 'PUT':
            try {
                const updatedUser = await User.findOneAndUpdate(
                    { email },
                    { name, image },
                    { new: true, upsert: true } // Upsert will create a new user if not found
                );

                res.status(200).json(updatedUser);
            } catch (error) {
                res.status(500).json({ message: 'Failed to update user data' });
            }
            break;

        default:
            res.status(405).json({ message: 'Method not allowed' });
    }
}