


'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState, useEffect } from "react";


interface ContextProps {
    loggedIn: boolean,
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>,
}

const AuthContext = createContext<ContextProps>({
    loggedIn: false,
    setIsLoggedIn: () => {},
})

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const [loggedIn, setIsLoggedIn] = useState(false);

     const contextValues = {
        loggedIn,
        setIsLoggedIn,
     }
    
    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuthContext = () => useContext(AuthContext);