import { createContext, useState, useContext, type ReactNode } from "react";

interface CartContextType {
    cartIds: Set<number>;
    initCartIds: (ids: number[]) => void;
    addToCart: (id: number) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartIds, setCartIds] = useState<Set<number>>(new Set());

    const initCartIds = (ids: number[]) => {
        setCartIds(new Set(ids));
    }

    const addToCart = (id: number) => {
        setCartIds(new Set([...cartIds, id]));
    }

    const removeFromCart = (id: number) => {
        const newSet = new Set(cartIds);
        newSet.delete(id);
        setCartIds(newSet);
    }

    const clearCart = () => {
        setCartIds(new Set());
    }

    return (
        <CartContext.Provider value={{cartIds, initCartIds, addToCart, removeFromCart,clearCart}}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useAuth must be used within an CartProvider");
    return context;
}