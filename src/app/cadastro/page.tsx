"use client";

import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";

export default function Page() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Controle se usuário está logado
    const router = useRouter(); // Para redirecionamento

    useEffect(() => {
        // Verifica se o usuário já está logado baseado no token no localStorage
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true); // Define como true caso haja token no localStorage
            router.push("/"); // Redireciona para Home
        }
    }, [router]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const response = await fetch("http://localhost:3000/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome,
                    email,
                    senha,
                    data_nascimento: dataNascimento, // Formato esperado pelo backend
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.mensagem || "Erro ao cadastrar usuário.");
            }

            const data = await response.json();
            if (data.success) {
                setSuccessMessage("Cadastro realizado com sucesso!");
                // Redireciona para a página de login
                router.push("/login");
            }
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    };

    if (isLoggedIn) {
        return null; // Evita renderizar o formulário se já estiver logado
    }

    return (
        <main>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 p-6 bg-indigo-50 max-w-96 rounded-3xl"
            >
                <h2 className="page-title">Cadastro</h2>
                <p>
                    Eu já tenho cadastro, quero <a href="/login">fazer login.</a>
                </p>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            required
                            name="nome"
                            id="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="border h-10 rounded-xl focus:outline-none focus:border-indigo-300 px-4 py-2"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="nascimento">Data de nascimento</label>
                        <input
                            type="date"
                            required
                            name="nascimento"
                            id="nascimento"
                            value={dataNascimento}
                            onChange={(e) => setDataNascimento(e.target.value)}
                            className="border h-10 rounded-xl focus:outline-none focus:border-indigo-300 px-4 py-2"
                        />
                    </div>
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
                </div>
                <div className="flex flex-row justify-between items-end">
                    <button
                        type="submit"
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg"
                    >
                        Cadastrar
                    </button>
                </div>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                {successMessage && <p className="text-green-500">{successMessage}</p>}
            </form>
        </main>
    );
}