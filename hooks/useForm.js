import { useState } from "react";
import { Keyboard } from "react-native";
import req from "../api/req";

function isAsyncFunction(fn) {
    return fn instanceof Object.getPrototypeOf(async function () {}).constructor;
}

const useForm = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    function delay() {
        return new Promise((res) => setTimeout(res, 10000));
    }
    const handleSubmit = async (apiRoute, options) => {
        const { method = "POST", validator, formData, onStatusOk, onError } = options || {}

        if (loading) return setError("Please Wait! Loading...");
        try {
            typeof validator === "function" && (isAsyncFunction(validator) ? await validator() : validator());

            setLoading(true);
            setError(null);
            Keyboard.dismiss()

            // Define the Axios config for the request
            const requestConfig = {
                method, // Use the provided HTTP method or default to POST
                url: apiRoute,
                data: formData,
            };

            // Perform the API request using the provided API route and formData
            // const response = await req.post(apiRoute, formData);
            const response = await req(requestConfig)
            // const response = await delay();

            // calls calback after succesfull response from server
            /* this is necesarry as in aspect of loading
             * for example: if there is some time consuming work after response (store keys)
             * in such case loading is disable in such case user can click on button  again
             * so makes loading false such that no action is left and user not request again (this is temporary)  
            */ 
            typeof onStatusOk === "function" && await onStatusOk(response?.data)

            return response?.data;
        } catch (error) {
            // console.log(error?.message)
            setError(error?.message || error);
            typeof onError === "function" && onError()
        } finally {
            setLoading(false);
        }
    };

    return { error, loading, handleSubmit, setError };
};

export default useForm;
