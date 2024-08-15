import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from "@/lib/mongo/mongodb";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {getServerSession} from "next-auth/next";
import Document from "@/lib/mongo/models/Document";
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
            try{
                const documents = await Document.find({createdBy: parsedEmail});

                if (!documents) {
                    return res.status(200).json(null);
                }

                return res.status(200).json(documents);

            } catch (error) {
                res.status(500).json({message: 'Failed to fetch user documents'});
            }
            break;

        case 'PUT':
            try {
                const {title, content} = req.body;

                const document = await Document.create({title, content, createdBy: parsedEmail});
                if (!document) {
                    return res.status(404).json({message: 'Document not found'});
                }
                res.status(201).json(document);
            } catch (error) {
                res.status(500).json({message: error});
            }
            break;

        default:
            res.status(405).json({message: 'Method not allowed'});
    }


}