import { useToast } from "@/components/Toast/ToastProvider";
import React from "react";
import {CgClose} from "react-icons/cg";
import {VscCheck, VscError, VscInfo, VscWarning} from "react-icons/vsc";

const Toast: React.FC = () => {
    const { toasts, removeToast } = useToast();

    const toastTypeClasses = {
        success: "alert-success",
        error: "alert-error",
        warning: "alert-warning",
        info: "alert-info",
    };

    const toastTextSizeClasses = {
        s: "text-sm p-2",
        m: "text-base p-3",
        l: "text-lg p-4",
    }

    const toastIconByType = {
        success: <VscCheck size={20} />,
        error: <VscError size={20} />,
        warning: <VscWarning size={20} />,
        info: <VscInfo size={20} />,
    }


    return (
        <div className="toast toast-bottom toast-end" style={{ zIndex: 1000 }}>
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`alert ${toastTypeClasses[toast.type || "warning"]} ${toastTextSizeClasses[toast.size || "m"]} flex justify-between items-center shadow-lg`}
                >
                    {toastIconByType[toast.type]}<span>{toast.message}</span>
                    <button className="btn btn-sm btn-circle btn-ghost ml-2" onClick={() => removeToast(toast.id)}>
                        <CgClose size={20} />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Toast;
