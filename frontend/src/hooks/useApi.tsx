import type {ApiMethod} from "../types/ApiMethod";

const apiUrl = import.meta.env.VITE_API_BASE_URL as string;

export const sendRequest = async (
    method: ApiMethod,
    path: string,
    body ?: any,
    authToken ?: string |null   
) => {
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
                throw {
                    status: response.status,
                }
            } else {
                return response;
            }
        })
    );
};