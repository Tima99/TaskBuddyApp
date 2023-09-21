import React, { createContext, useContext, useState } from "react";

const CredentialsContext = createContext();
// Create a function component that will serve as the provider for your context. 
// This component will wrap your entire app and manage the loading state
const CredentailsProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);

    // Function to turn on the loading screen
    const setToken = (access_token) => {
        setAccessToken(access_token);
    };

    return (
        <CredentialsContext.Provider
            value={{ accessToken, setToken }}
        >
            {children}
        </CredentialsContext.Provider>
    );
};


// Create a custom hook to access the loading context. 
// This hook will provide access to the isLoading, showLoading, and hideLoading functions
const useCredentials = () => {
    return useContext(CredentialsContext);
};

export { useCredentials, CredentailsProvider };
