export const endpoints = {
    auth: {
        login: "auth/login",
        signup: "auth/signup",
        refresh: "auth/refresh",
    },
    users: {
        me: `users/me`
    },
    products: {
        product: {
            image: (productId: number) => `products/${productId}/image`,
        },
        page: (pageNum: number, LIMIT: number) => `products?page=${pageNum}&limit=${LIMIT}`,
    },
    cart: {
        products: {
            all: `cart/products`,
            product: (productId: number) => `cart/${productId}`,
        }
    },
} as const;

export type endpoints = typeof endpoints[keyof typeof endpoints];