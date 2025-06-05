"use client";

import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";

export default function Page() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar se está logado
    const router = useRouter(); // Hook do Next.js para redirecionamento

    useEffect(() => {
        // Verifica se o usuário está logado ao carregar a página
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true); // Define como logado
            router.push("/"); // Redireciona para / -> home
        }
    }, [router]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, senha}),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.mensagem || "Erro ao fazer login.");
            }

            const data = await response.json();
            if (data.success) {
                setSuccessMessage("Login realizado com sucesso!");
                // Salvar o token no localStorage
                localStorage.setItem("token", data.data.token);

                // Atualiza o estado para refletir que o usuário está logado
                setIsLoggedIn(true);

                // Redirecionar para a página / -> home
                router.push("/");
            }
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    };

    if (isLoggedIn) {
        return null; // Ou coloque um spinner caso necessário para evitar piscar o conteúdo.
    }

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
                {successMessage && <p className="text-green-500">{successMessage}</p>}
            </form>
        </main>
    );
}