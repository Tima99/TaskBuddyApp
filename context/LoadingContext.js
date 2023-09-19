import React, { createContext, useContext, useState } from "react";

const LoadingContext = createContext();
// Create a function component that will serve as the provider for your context. 
// This component will wrap your entire app and manage the loading state
const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    // Function to turn on the loading screen
    const showLoading = () => {
        setIsLoading(true);
    };

    // Function to turn off the loading screen
    const hideLoading = () => {
        setIsLoading(false);
    };

    return (
        <LoadingContext.Provider
            value={{ isLoading, showLoading, hideLoading }}
        >
            {children}
        </LoadingContext.Provider>
    );
};


// Create a custom hook to access the loading context. 
// This hook will provide access to the isLoading, showLoading, and hideLoading functions
const useLoading = () => {
    return useContext(LoadingContext);
};

export { useLoading, LoadingProvider };
