import React, { createContext, useContext, useState } from "react";

const LoadingContext = createContext();
// Create a function component that will serve as the provider for your context. 
// This component will wrap your entire app and manage the loading state
const LoadingProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);


    return (
        <LoadingContext.Provider
            value={{ todos, setTodos }}
        >
            {children}
        </LoadingContext.Provider>
    );
};


// Create a custom hook to access the loading context. 
// This hook will provide access to the todos, showLoading, and hideLoading functions
const useLoadingTodos = () => {
    return useContext(LoadingContext);
};

export { useLoadingTodos, LoadingProvider };
