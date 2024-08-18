import DocumentCard from "@/components/DocumentCards/DocumentCard";
import React, {useEffect} from "react";
import CreateDocumentCard from "@/components/DocumentCards/CreateDocumentCard";
import { Document } from "@/utils/types";
import {useToast} from "@/components/Toast/ToastProvider";
import {useDocuments} from "@/components/DocumentCards/DocumentProvider";


interface DocumentCardViewProps {
}

const DocumentsCardView: React.FC<DocumentCardViewProps> = (props) => {

    const {documents} = useDocuments();


    const sortedDocuments = documents.sort((a, b) => b.createdAt - a.createdAt);

    const dates = Array.from(new Set(sortedDocuments.map(doc => new Date(doc.createdAt).toDateString()))).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    if (dates.length === 0 || dates[0] !== new Date().toDateString()) {
        dates.unshift(new Date().toDateString());
    }

    const groupedDocuments = dates.map(date => {
        return {
            date,
            documents: sortedDocuments.filter(doc => new Date(doc.createdAt).toDateString() === date)
        }
    });

    return (
        <div className="flex flex-col gap-16">
            {groupedDocuments.map((group, index) => (
                <div key={index} className={"flex flex-col gap-4"}>
                    <h1 className="text-xl font-bold">{group.date}</h1>
                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {group.date=== new Date().toDateString() && <CreateDocumentCard/>}
                        {group.documents.map((document, index) => (
                            <DocumentCard key={index} index={index} mdDocument={document}/>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DocumentsCardView;