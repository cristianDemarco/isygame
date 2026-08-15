import type {ApiMethod} from "../types/ApiMethod";

const apiUrl = import.meta.env.VITE_API_BASE_URL as string;

export const sendRequest = async (
    method: ApiMethod,
    path: string,
    body ?: any,
    authToken ?: string |null   
) => {
    const response = await fetch(
    apiUrl + path,
    {
        method,
        ...(body && {body: JSON.stringify(body)}),
        headers: {
            "Content-Type":"application/json",
            ...(authToken && {"Authorization": `Bearer ${authToken}`})
        },
    })
        
    if(!response.ok){
        const errorData = await response.json();

        throw {
            status: errorData.status,
            message: errorData.message,
        }
    }

    return response;
};