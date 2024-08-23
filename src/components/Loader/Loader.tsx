import React from "react";

interface LoaderProps {

}

const Loader: React.FC<LoaderProps> = () => {
    return (
            <span className="loading loading-spinner loading-lg"></span>
    )
}

export default Loader;