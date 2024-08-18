import React from 'react';
import DocumentForm from '@/components/DocumentForm/DocumentForm';
import { Document } from '@/utils/types';

const Create: React.FC = () => {

    const [mdDocument, setMdDocument] = React.useState<Document>({ title: '', content: '' } as Document);

    return (
        <div>
            <DocumentForm document={mdDocument} type="create"/>
        </div>
    );
};

export default Create;
