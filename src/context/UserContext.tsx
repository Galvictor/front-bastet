"use client";

import {createContext, useContext, useState, useEffect} from "react";
import {useRouter} from "next/navigation";

// Define o formato do contexto com informações e funções disponíveis
interface UserContextProps {
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
}

// Criação do contexto com valores padrão
const UserContext = createContext<UserContextProps>({
    isLoggedIn: false,
    login: () => {
    },
    logout: () => {
    },
});

// Componente provedor do contexto
export function UserProvider({children}: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Verifica se o token existe no localStorage ao carregar o app
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const login = (token: string) => {
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        router.push("/"); // Redireciona para a página inicial
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        router.push("/"); // Retorna à página inicial
    };

    return (
        <UserContext.Provider value={{isLoggedIn, login, logout}}>
            {children}
        </UserContext.Provider>
    );
}

// Hook para consumir o contexto de usuário em outros componentes
export const useUser = () => useContext(UserContext);