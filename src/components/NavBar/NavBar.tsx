import React, {useEffect} from "react";
import {signOut, useSession} from "next-auth/react";
import {useTheme} from "@/components/Theme/ThemeProvider";
import {MdLogout, MdMenu} from "react-icons/md";
import DocumentsCardView from "@/components/DocumentCards/DocumentsCardView";
import {useModal} from "@/components/Modal/ModalProvider";
import {HiMoon, HiSun} from "react-icons/hi";
import { Document } from "@/utils/types";

const Navbar: React.FC = () => {
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

export default Navbar;
