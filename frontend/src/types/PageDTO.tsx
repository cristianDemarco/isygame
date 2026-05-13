export interface PageDTO<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;
    number: number;
    size: number;
    empty: boolean;
}