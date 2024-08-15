// src/pages/api/settings/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongo/mongodb';
import UserSettings from '@/lib/mongo/models/UserSettings';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import {Session} from "next-auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    const session: Session | null = await getServerSession(req as any, res as any, authOptions as any);

    if (!session || !session.user || !session.user.email) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const email = session.user.email;
    const parsedEmail = JSON.parse(JSON.stringify(email));


    switch (req.method) {
        case 'GET':
            try {
                const settings = await UserSettings.findOne({ email: parsedEmail });

                if (!settings) {
                    return res.status(404).json({ message: 'Settings not found' });
                }

                res.status(200).json(settings);
            } catch (error) {
                res.status(500).json({ message: 'Failed to fetch user settings' });
            }
            break;

        case 'PUT':
            try {
                const { theme } = req.body;

                const settings = await UserSettings.findOneAndUpdate(
                    { email : parsedEmail },
                    { theme },
                    { new: true, upsert: true } // Upsert will create new settings if not found
                );

                res.status(200).json(settings);
            } catch (error) {
                res.status(500).json({ message: 'Failed to update user settings' });
            }
            break;

        default:
            res.status(405).json({ message: 'Method not allowed' });
    }
}