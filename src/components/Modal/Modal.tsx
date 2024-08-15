import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
    title?: string;
    children: React.ReactNode;
    onConfirm?: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
    isOpen: boolean;
    hideCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
                                         title,
                                         children,
                                         onConfirm,
                                         onCancel,
                                         confirmText = "Confirm",
                                         cancelText = "Cancel",
                                         isOpen,
                                         hideCloseButton = false,
                                     }) => {
    const closeButtonRef = useRef<HTMLButtonElement>(null!);

    useEffect(() => {
        if (isOpen && closeButtonRef.current) {
            closeButtonRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && onCancel) {
                onCancel();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onCancel]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div
            className="modal modal-open"
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true"
        >
            <div className="modal-box">
                {title && <h3 id="modal-title" className="font-bold text-lg">{title}</h3>}
                <div className="py-4">
                    {children}
                </div>
                <div className="modal-action">
                    {!hideCloseButton && onCancel && (
                        <button className="btn" onClick={onCancel}>
                            {cancelText}
                        </button>
                    )}
                    {onConfirm && (
                        <button className="btn btn-error" onClick={onConfirm} ref={closeButtonRef}>
                            {confirmText}
                        </button>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
