import { useToast } from "@/components/Toast/ToastProvider";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Document } from "@/utils/types";
import {useDocuments} from "@/components/DocumentCards/DocumentProvider";
import DocumentForm from "@/components/DocumentForm/DocumentForm";

const ViewEditDocument = () => {
    const router = useRouter();
    const {addToast} = useToast();
    const {getDocument, updateDocument} = useDocuments();
    const { id } = router.query;

    const [mdDocument, setMdDocument] = useState<Document>({
        title: '',
        content: '',
        createdAt: 0,
        _id: ''
    });



    useEffect(() => {
        if (id) {
            const document = getDocument(id as string);
            if  (document) {
                setMdDocument(document);
            }else{
                router.push('/dashboard');
                addToast('Document not found', 'error');
            }
        }
    }, [id]);



    return (
        <div>
            <DocumentForm document={mdDocument} type="edit"/>
        </div>
    );
};

export default ViewEditDocument;
