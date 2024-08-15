import React from "react";
import { BiEdit, BiShare, BiTrash } from "react-icons/bi";
import { useModal } from "@/components/Modal/ModalProvider";
import { Document } from "@/utils/types";
import {useToast} from "@/components/Toast/ToastProvider";
import {router} from "next/client";
import {useRouter} from "next/router";
import {useDocuments} from "@/components/DocumentCards/DocumentProvider";

interface DocumentCardProps {
    index: number;
    mdDocument: Document; // Renamed to avoid clash with global 'document'
}

const DocumentCard: React.FC<DocumentCardProps> = (props) => {
    const { index, mdDocument } = props;
    const { deleteDocument } = useDocuments();
    const { showModal, hideModal } = useModal();

    const router = useRouter();
    const { addToast } = useToast();

    const handleDelete = () => {
        showModal(
            <p>Are you sure you want to delete this document?</p>,
            {
                onConfirm: () => {
                    deleteDocument(mdDocument._id);
                    hideModal();
                },
                confirmText: "Delete",
                cancelText: "Cancel",
            }
        );
    };

    const handleShare = () => {
        const url = window.location.origin + '/document/' + mdDocument._id;

        // Create a temporary textarea to copy the text
        const tempTextarea = document.createElement("textarea");
        tempTextarea.value = url;
        document.body.appendChild(tempTextarea);
        tempTextarea.select();
        document.execCommand("copy");
        document.body.removeChild(tempTextarea);


        addToast('Link copied to clipboard', 'success');
    };

    const dateTime = mdDocument.createdAt
        ? new Date(mdDocument.createdAt).toLocaleString()
        : "Unknown date";

    return (
        <div className="card bg-base-100 sm:w-52 md:w-64 lg:w-80 xl:w-96 shadow-xl overflow-hidden">
            <div className="card-body flex flex-col">
                <h2 className="card-title">
                    <a onClick={()=>
                        router.push(`/document/${mdDocument._id}`)
                    }>{mdDocument.title}</a>
                </h2>
                <p className="text-xs text-gray-500">{dateTime}</p>
            </div>
            <div className="card-actions justify-end mt-auto flex flex-row gap-0">
                <button
                    className="btn btn-ghost text-primary bg-none rounded-full hover:bg-primary hover:bg-opacity-20"
                    onClick={handleShare}
                >
                    <BiShare size={24} />
                </button>
                <button
                    className="btn btn-ghost text-error bg-none rounded-full hover:bg-error hover:bg-opacity-20"
                    onClick={handleDelete}
                >
                    <BiTrash size={24} />
                </button>
            </div>
        </div>
    );
};

export default DocumentCard;
