import React from 'react';
import {useToast} from "@/components/Toast/ToastProvider";
import {BiPlus} from "react-icons/bi";
import {useRouter} from "next/router";

interface CreateDocumentProps {
}

const CreateDocumentCard: React.FC<CreateDocumentProps> = (props) => {

    const router = useRouter();

    const handleCreateDocument = () => {
        router.push('/document/create');
    }

    return (
        <div className="card bg-primary bg-opacity-15 sm:w-52 md:w-64 lg:w-80 xl:w-96  shadow-xl border-dashed border-4 border-primary cursor-pointer" onClick={handleCreateDocument}>
            <div className="card-body flex flex-col items-center justify-center">
                <BiPlus size={40} />
            </div>
        </div>
    );
}

export default CreateDocumentCard;
