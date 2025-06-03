import React, { useContext, useState} from "react";

type AuthContextTypes = {
    isLogged: boolean;
    setIsLogged: (isLogged: boolean) => void;
};

const AuthContext = React.createContext<AuthContextTypes | null>(null);



function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLogged, setIsLogged] = useState(false);

    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged }}>
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

