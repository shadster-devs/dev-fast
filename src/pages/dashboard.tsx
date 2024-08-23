import React, {useEffect} from "react";
import {useSession} from "next-auth/react";
import {useTheme} from "@/components/Theme/ThemeProvider";
import Loader from "@/components/Loader/Loader";



const Dashboard: React.FC = () => {

    const {status, data} = useSession();
    const {updateTheme, theme} = useTheme();

    const [isLoading, setIsLoading] = React.useState(true);


    useEffect(() => {
        if (status === "authenticated") {
            const fetchAndUpdateUser = async () => {
                try {
                    // Fetch user data from the API
                    const userResponse = await fetch('/api/user');
                    if (userResponse.status === 404) {
                        // If the user is not found, create/update it in the database
                        const userUpdateResponse = await fetch('/api/user', {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });

                        if (!userUpdateResponse.ok) {
                            console.error("Failed to create or update user data");
                        }
                    } else if (userResponse.ok) {
                        const userData = await userResponse.json();
                    } else {
                        console.error("Failed to fetch user data");
                    }
                } catch (error) {
                    console.error("Error fetching/updating user data:", error);
                }
            };
            const fetchUserSettings = async () => {
                try {
                    const response = await fetch("/api/settings");
                    if (response.status === 404) {
                        const settingsUpdateResponse = await fetch("/api/settings", {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ theme: theme }),
                        });

                        if (!settingsUpdateResponse.ok) {
                            console.error("Failed to create or update user settings");
                        }
                    }else if (response.ok) {
                        const settings = await response.json();
                        updateTheme(settings.theme);
                    }
                } catch (error) {
                    console.error("Failed to fetch user settings", error);
                }
            };


            fetchAndUpdateUser().then( () => {
                fetchUserSettings().then(() => {

                })});

            setIsLoading(false);
        }

    }, [status]);





    if ( status === 'loading' || isLoading ) return <Loader/>

    return (
        <div>
            <div className="hero min-h-screen bg-base-200 flex flex-col p-10 ">

            </div>
        </div>
    );
};

export default Dashboard;

