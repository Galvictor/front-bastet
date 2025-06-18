"use client";

import {useState} from "react";
import {useUser} from "@/context/UserContext";
import {login} from "@/services/api";

export default function Page() {
    const {login: userLogin} = useUser();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrorMessage("");

        try {
            const response = await login({email, senha});

            if (response.success) {
                userLogin(
                    response.data.token,
                    response.data.usuario
                );
            }
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Erro ao fazer login');
        }
    };


    return (
        <main>
            <form
                onSubmit={handleSubmit}
                className="p-6 bg-indigo-50 max-w-96 rounded-3xl flex flex-col gap-4"
            >
                <h2 className="page-title">Login</h2>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        required
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border h-10 rounded-xl focus:outline-none focus:border-indigo-300 px-4 py-2"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="senha">Senha</label>
                    <input
                        type="password"
                        required
                        name="senha"
                        id="senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className="border h-10 rounded-xl focus:outline-none focus:border-indigo-300 px-4 py-2"
                    />
                </div>
                <div className="flex flex-row justify-between items-end">
                    <a href="/cadastro" className="my-3">
                        Fazer cadastro
                    </a>
                    <button
                        type="submit"
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg"
                    >
                        Entrar
                    </button>
                </div>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </form>
        </main>
    );
}