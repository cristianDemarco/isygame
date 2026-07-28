import type {ApiMethod} from "../types/ApiMethod";

const apiUrl = import.meta.env.VITE_API_BASE_URL as string;

export const sendRequest = (
    method: ApiMethod,
    path: string,
    body ?: any,
    authToken ?: string |null   
) => {
    console.log("authToken:" + authToken);
    return fetch(
        apiUrl + path,
        {
            method,
            ...(body && {body: JSON.stringify(body)}),
            headers: {
                "Content-Type":"application/json",
                ...(authToken && {"Authorization": `Bearer ${authToken}`})
            },
        }).then((response => {
            if(response.status >= 400){
                console.log(response);
                return response
            } else {
                return response;
            }
        })
    );
};    