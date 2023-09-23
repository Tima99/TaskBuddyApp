import React, { createContext, useContext, useState } from "react";

const CompleteCountContext = createContext();
// Create a function component that will serve as the provider for your context. 
// This component will wrap your entire app and manage the loading state
const CompleteCountProvider = ({ children }) => {
    const [completeTaskCount, setCompleteTaskCount] = useState(0);


    return (
        <CompleteCountContext.Provider
            value={{ completeTaskCount, setCompleteTaskCount }}
        >
            {children}
        </CompleteCountContext.Provider>
    );
};


// Create a custom hook to access the loading context. 
// This hook will provide access to the isLoading, showLoading, and hideLoading functions
const useCount = () => {
    return useContext(CompleteCountContext);
};

export { useCount, CompleteCountProvider };
