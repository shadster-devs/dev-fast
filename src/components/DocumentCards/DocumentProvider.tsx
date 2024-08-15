import React, { createContext, useContext, useState, useEffect } from 'react';
import { Document } from '@/utils/types';
import {useSession} from "next-auth/react";
import {useToast} from "@/components/Toast/ToastProvider";
import {useRouter} from "next/router";

interface DocumentContextProps {
    documents: Document[];
    fetchAllDocuments: () => void;
    getDocument: (id: string) => Document | null;
    addDocument: (newDocument: Document) => void;
    updateDocument: (updatedDocument: Document) => void;
    deleteDocument: (id: string) => void;
}

const DocumentContext = createContext<DocumentContextProps | undefined>(undefined);

// Custom hook for consuming the context
export const useDocuments = () => {
    const context = useContext(DocumentContext);
    if (!context) {
        throw new Error("useDocuments must be used within a DocumentProvider");
    }
    return context;
};

interface DocumentProviderProps {
    children: React.ReactNode;
}

const DocumentProvider: React.FC<DocumentProviderProps> = ({ children }) => {

    const {addToast} = useToast();
    const {data:sessions} = useSession();
    const router = useRouter();

    const [documents, setDocuments] = useState<Document[]>([]);


    const fetchAllDocuments = async () => {
        try {
            const response = await fetch("/api/document");
            if (response.ok) {
                const data = await response.json();
                setDocuments(data);
                addToast('Documents fetched successfully', 'success');
            }
        } catch (error) {
            addToast('Failed to fetch documents!' , 'error');
        }
    }

    const getDocument = (id: string) => {
        return documents.find((document) => document._id === id) || null;
    }

    const addDocument = async (newDocument: Document) => {
        try {
            const response = await fetch("/api/document", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newDocument),
            });
            if (response.ok) {
                const data = await response.json();
                setDocuments([...documents, data]);
                router.push(`/document/${data._id}`);
                addToast('Document created successfully', 'success');
            }
        } catch (error) {
            addToast('Failed to create document', 'error');
        }
    }

    const updateDocument = async (updatedDocument: Document) => {
        try {
            const response = await fetch(`/api/document/${updatedDocument._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedDocument),
            });
            if (response.ok) {
                const data = await response.json() as Document;
                const updatedDocuments = documents.map((document) =>
                    document._id === data._id ? data : document
                );
                setDocuments(updatedDocuments);
                addToast('Document updated successfully', 'success');
            }
        } catch (error) {
            addToast('Failed to update document', 'error');
        }
    }

    const deleteDocument = async (id: string) => {
        try {
            const response = await fetch(`/api/document/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setDocuments(documents.filter((document) => document._id !== id));
                addToast('Document deleted successfully', 'success');
            }
        } catch (error) {
            addToast('Failed to delete document', 'error');
        }
    }



    return (
        <DocumentContext.Provider value={{ documents, fetchAllDocuments,getDocument, addDocument, updateDocument, deleteDocument }}>
            {children}
        </DocumentContext.Provider>
    );
}

export default DocumentProvider;

