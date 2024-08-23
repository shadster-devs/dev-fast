import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Modal from "@/components/Modal/Modal";
import {signIn} from "next-auth/react";

interface SignUpModalProps {
    redirectUrl: string;
}

const SignUpModal: React.FC<SignUpModalProps> = (props) => {

    const { redirectUrl } = props;

    const [isOpen, setIsOpen] = React.useState(true);

    return (
        <Modal
            isOpen={isOpen}
            hideCloseButton={true}
            title={'User not signed in'}
            confirmText={'Sign In'}
            onConfirm={() => {
                signIn("google", {callbackUrl: redirectUrl, redirect: true});
                setIsOpen(false);
            }}
            children={null}
        />

    );
};

export default SignUpModal;
