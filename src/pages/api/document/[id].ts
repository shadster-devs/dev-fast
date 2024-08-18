import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from "@/lib/mongo/mongodb";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
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
                const {id} = req.query;
                const document = await Document.find({_id: id, createdBy: parsedEmail});

                if (!document) {
                    return res.status(404).json({message: 'DocumentForm not found'});
                }

                return res.status(200).json(document);

            } catch (error) {
                res.status(500).json({message: 'Failed to fetch the document'});
            }
            break;

        case 'PUT':
            try {
                const {id} = req.query;
                const {title, content} = req.body;
                const document = await Document.findOneAndUpdate(
                        {_id: id, createdBy: parsedEmail},
                        {title, content},
                        {new: true, upsert: true}
                );
                res.status(200).json(document);
            } catch (error) {
                res.status(500).json({message: error});
            }
            break;

        case 'DELETE':
            try {
                const {id} = req.query;
                const document = await Document.findOneAndDelete({_id: id, createdBy: parsedEmail});
                if (!document) {
                    return res.status(404).json({message: 'DocumentForm not found'});
                }
                res.status(200).json(document);
            } catch (error) {
                res.status(500).json({message: 'Failed to delete the document'});
            }
            break;

        default:
            res.status(405).json({message: 'Method not allowed'});
    }



}