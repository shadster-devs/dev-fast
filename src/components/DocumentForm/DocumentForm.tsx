import React, {useEffect, useState} from 'react';
import { Document } from '@/utils/types';
import { useDocuments } from "@/components/DocumentCards/DocumentProvider";

interface DocumentProps {
    document: Document;
    type: 'create' | 'edit' | 'view';
}

const DocumentForm: React.FC<DocumentProps> = (props) => {
    const { document, type } = props;
    const { addDocument, updateDocument } = useDocuments();
    const [mdDocument, setMdDocument] = React.useState<Document>(document);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setMdDocument(document);
    }, [document]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if (type === 'create') {
            addDocument(mdDocument);
        } else {
            updateDocument(mdDocument);
        }
        setLoading(false);
    };

    const config = {
        create: {
            title: 'Create New DocumentForm',
            buttonText: 'Create DocumentForm',
            buttonLoadingText: 'Creating...',
        },
        edit: {
            title: 'Update DocumentForm',
            buttonText: 'Update DocumentForm',
            buttonLoadingText: 'Updating...',
        },
        view: {
            title: 'View DocumentForm',
            buttonText: 'Update DocumentForm',
            buttonLoadingText: 'Updating...',
        },
    };

    return (
        <div>
            <div className="hero min-h-screen bg-base-200 p-10 ">
                <div className="card w-full h-full bg-base-100 shadow-xl p-6 flex flex-col">
                    <h2 className="text-2xl font-bold mb-4">{config[type].title}</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-grow">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Document Title</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter document title"
                                className="input input-bordered w-full"
                                value={mdDocument.title}
                                onChange={(e) => setMdDocument({ ...mdDocument, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-control flex-grow">
                            <label className="label">
                                <span className="label-text">Document Content</span>
                            </label>
                            <textarea
                                placeholder="Enter document content"
                                className="textarea textarea-bordered w-full h-full resize-y"
                                value={mdDocument.content}
                                onChange={(e) => setMdDocument({ ...mdDocument, content: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <button
                                type="submit"
                                className={`btn btn-primary`}
                                disabled={loading || type === 'view'}
                            >
                                {loading ? config[type].buttonLoadingText : config[type].buttonText}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DocumentForm;
