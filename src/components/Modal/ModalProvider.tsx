import React, { createContext, useContext, useState } from "react";
import Modal from "./Modal";

interface ModalContextProps {
    showModal: (content: React.ReactNode, options?: ModalOptions) => void;
    hideModal: () => void;
    modalContent: React.ReactNode;
    isModalOpen: boolean;
}

interface ModalOptions {
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
    hideCloseButton?: boolean;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);
    const [modalOptions, setModalOptions] = useState<ModalOptions>({});

    const showModal = (content: React.ReactNode, options?: ModalOptions) => {
        setModalContent(content);
        setModalOptions(options || {});
        setModalOpen(true);
    };

    const hideModal = () => {
        setModalOpen(false);
        setModalContent(null);
    };

    return (
        <ModalContext.Provider value={{ showModal, hideModal, modalContent, isModalOpen }}>
            {children}
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    onConfirm={()=>{modalOptions.onConfirm && modalOptions.onConfirm(); hideModal();}}
                    onCancel={hideModal}
                    confirmText={modalOptions.confirmText}
                    cancelText={modalOptions.cancelText}
                    hideCloseButton={modalOptions.hideCloseButton}
                >
                    {modalContent}
                </Modal>
            )}
        </ModalContext.Provider>
    );
};
