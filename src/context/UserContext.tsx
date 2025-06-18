"use client";

import {createContext, useContext, useState, useEffect} from "react";
import {useRouter} from "next/navigation";

// Interface para dados do usuário
interface UserData {
    id: number;
    nome: string;
    email: string;
    data_nascimento: string;
    criado_em: string;
}

interface UserContextProps {
    isLoggedIn: boolean;
    userData: UserData | null;
    login: (token: string, userData: UserData) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextProps>({
    isLoggedIn: false,
    userData: null,
    login: () => {
    },
    logout: () => {
    },
});

export function UserProvider({children}: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUserData = localStorage.getItem("userData");

        if (token && storedUserData) {
            setIsLoggedIn(true);
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    const login = (token: string, userData: UserData) => {
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(userData));
        setIsLoggedIn(true);
        setUserData(userData);
        router.push("/");
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        setIsLoggedIn(false);
        setUserData(null);
        router.push("/");
    };

    return (
        <UserContext.Provider value={{isLoggedIn, userData, login, logout}}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);