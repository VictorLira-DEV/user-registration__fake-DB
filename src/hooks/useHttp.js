import { useCallback } from "react";

const useHttp = () => {
    const sendRequest = useCallback(async (arg, sendData) => {
        try {
            const response = await fetch(arg.url, {
                method: arg.method ? arg.method : "GET",
                headers: arg.headers ? arg.headers : {},
                body: arg.body ? arg.body : null,
            });

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const data = await response.json();
            sendData(data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    return {
        sendRequest,
    };
};

export default useHttp;
