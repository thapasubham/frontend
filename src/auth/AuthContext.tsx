import React, { useContext, useState } from "react";

export type AuthContextTypes = {
    isLogged: boolean;
    userStatus: string;
    setIsLogged: (isLogged: boolean) => void;
    setUserStatus: (userStatus: string) => void;
};

const AuthContext = React.createContext<AuthContextTypes | null>(null);



function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLogged, setIsLogged] = useState(() => {
        const stored = localStorage.getItem("isLogged");
        return stored === "true";
    });
    const [userStatus, setUserStatus] = useState(()=>{
            const currentUser = localStorage.getItem("userStatus");
            return currentUser ? currentUser : "" ;
        }
        )
    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged, userStatus, setUserStatus }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export default AuthProvider;

