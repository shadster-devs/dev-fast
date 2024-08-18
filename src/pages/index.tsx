import React from "react";
import { FaGoogle } from "react-icons/fa6";
import { useTheme } from "@/components/Theme/ThemeProvider";
import {signIn, useSession} from "next-auth/react";

export default function Home() {


    const { status} = useSession();

    if (status === "loading") return <div><span className="loading loading-spinner loading-lg"></span></div>;


    if (status === "authenticated") {
        window.location.href = "/dashboard";
    }

    return (
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="text-center hero-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Textualize</h1>
                        <p className="mb-5">
                            Textualize is a tool that helps you convert your handwriting into digital text.
                        </p>
                        <button className="btn btn-primary"
                                onClick={() => signIn("google", {callbackUrl: '/dashboard', redirect: true})}>
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
