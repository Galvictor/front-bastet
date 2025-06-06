"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";

export default function Page() {
    const { login } = useUser(); // Usando o método login do contexto
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrorMessage("");

        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, senha }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.mensagem || "Erro ao fazer login.");
            }

            const data = await response.json();
            if (data.success) {
                // Usa o método login do contexto para salvar o token
                login(data.data.token);
            }
        } catch (error: any) {
            setErrorMessage(error.message);
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