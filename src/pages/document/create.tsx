import React, { useState } from 'react';
import Navbar from "@/components/NavBar/NavBar";
import { Document } from "@/utils/types";
import {useDocuments} from "@/components/DocumentCards/DocumentProvider";

const Create: React.FC = () => {

    const {addDocument} = useDocuments()

    const [mdDocument, setMdDocument] = React.useState<Document>({ title: '', content: '' } as Document);

    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        addDocument(mdDocument);
        setLoading(false);
    };

    return (
        <div>
            <Navbar />
            <div className="divider h-0 p-0 mt-0 mb-0"></div>
            <div className="hero min-h-screen bg-base-200 p-10 ">
                <div className="card w-full h-full bg-base-100 shadow-xl p-6">
                    <h2 className="text-2xl font-bold mb-4">Create New Document</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
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
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Document Content</span>
                            </label>
                            <textarea
                                placeholder="Enter document content"
                                className="textarea textarea-bordered w-full"
                                value={mdDocument.content}
                                onChange={(e) => setMdDocument({ ...mdDocument, content: e.target.value })}
                                rows={6}
                                required
                            />
                        </div>
                        <div className="form-control relative">
                            <button
                                type="submit"
                                className={`btn btn-primary`}
                                disabled={loading}
                            >
                                {loading ? 'Creating...' : 'Create Document'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Create;
