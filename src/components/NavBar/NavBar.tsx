import React, {useEffect} from "react";
import {signIn, signOut, useSession} from "next-auth/react";
import {useTheme} from "@/components/Theme/ThemeProvider";
import {MdLogout, MdMenu} from "react-icons/md";
import {useModal} from "@/components/Modal/ModalProvider";
import {HiMoon, HiSun} from "react-icons/hi";
import {FaGoogle} from "react-icons/fa6";


const NavBar: React.FC = () => {
    const {data: session} = useSession();

    return (
        <div>
            {session ? <SignedInNavbar/> : <SignedOutNavbar/>}
            <div className="divider h-0 p-0 mt-0 mb-0"></div>
        </div>
    );
};

export default NavBar;

const SignedInNavbar: React.FC = () => {
    const { theme, updateTheme } = useTheme();

    const {showModal, hideModal} = useModal();

    const {data: session} = useSession();


    const handleOnCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        const currTheme = isChecked ? "dim" : "winter";
        updateTheme(currTheme);

        const updateUserSettingsInDb  = async ()=>await fetch("/api/settings", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ theme: currTheme }),
        });

        updateUserSettingsInDb();

    };

    const handleLogout = () => {
        showModal(
            <p>Are you sure you want to logout?</p>,
            {
                onConfirm: () => {
                    signOut({callbackUrl: '/', redirect: true})
                    hideModal();
                },
                confirmText: "Logout",
                cancelText: "Cancel"
            }
        );
    }

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl" href={"/dashboard"}>
                    Textualize
                </a>
            </div>
            <div className="navbar-center"></div>
            <div className="navbar-end">
                {session && session.user && session.user.image && session.user.name &&
                    <div className="tooltip tooltip-left" data-tip={session.user.email}>
                        <img src={session.user.image} alt={session.user.name} width={25} height={25}
                             className="rounded-full"/>
                    </div>
                }
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <MdMenu size={20}/>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box border-2 z-[1] mt-3 w-52 p-2 shadow-xl right-0">
                        <li className="h-12">
                            <label className="swap swap-rotate text-base h-12 btn-ghost">
                                Theme
                                <input
                                    type="checkbox"
                                    onChange={handleOnCheck}
                                    checked={theme === "dim"}
                                />
                                <HiSun className={"swap-off fill-current"}/>

                                <HiMoon className={"swap-on fill-current"}/>

                            </label>
                        </li>
                        <div className="divider p-0 m-0 "></div>
                        <li className="h-12">
                            <button className="btn btn-ghost text-primary h-12 text-base"
                                    onClick={handleLogout}>
                                <MdLogout/> Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};


const SignedOutNavbar: React.FC = () => {
    const { theme, updateTheme } = useTheme();

    const handleOnCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        updateTheme(isChecked ? "dim" : "winter");
    };

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <label className="swap swap-rotate">
                    <input
                        type="checkbox"
                        onChange={handleOnCheck}
                        checked={theme === "dim"}
                    />

                    {/* Sun icon */}
                    <svg
                        className="swap-off h-18 w-8 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
                        />
                    </svg>

                    {/* Moon icon */}
                    <svg
                        className="swap-on h-8 w-8 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
                        />
                    </svg>
                </label>
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost text-xl" href={"/"}>
                    Textualize
                </a>
            </div>
            <div className="navbar-end">
                <button className="btn btn-ghost rounded-full text-primary" onClick={() => signIn("google" ,{callbackUrl: '/dashboard', redirect: true})}>
                    Sign In <FaGoogle />
                </button>
            </div>
        </div>
    );
};
