import React from "react";
import {signIn, useSession} from "next-auth/react";
import Loader from "@/components/Loader/Loader";



export default function Home() {

    const { status} = useSession();


    if (status === "authenticated") {
        window.location.href = "/dashboard";
    }

    if (status === "loading") return <Loader/>;

    return (
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="text-center hero-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">

                        </h1>
                        <p className="mb-5">

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
