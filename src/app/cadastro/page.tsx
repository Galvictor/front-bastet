"use client";

import {useState, useEffect} from "react";
import {useUser} from "@/context/UserContext";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function Page() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const {isLoggedIn, login} = useUser();
    const router = useRouter();

    // Redireciona para a home se o usuário já estiver logado
    useEffect(() => {
        if (isLoggedIn) {
            router.push("/");
        }
    }, [isLoggedIn, router]); // Só executa quando `isLoggedIn` mudar

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const dataFormatada = new Date(dataNascimento).toLocaleDateString("pt-BR", {
                timeZone: "UTC",
            });

            const response = await fetch("http://localhost:3000/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome,
                    email,
                    senha,
                    data_nascimento: dataFormatada,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erro ao cadastrar usuário.");
            }

            const data = await response.json();
            if (data.success) {
                setSuccessMessage("Cadastro realizado com sucesso!");

                // Faz login automaticamente após o cadastro
                login(data.data.token);

                // Redireciona para a página inicial
                router.push("/");
            }
        } catch (error: any) {
            console.log(error);
            setErrorMessage(error.message);
        }
    };

    // Evita renderizar o formulário enquanto redireciona
    if (isLoggedIn) return null;

    return (
        <main>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 p-6 bg-indigo-50 max-w-96 rounded-3xl"
            >
                <h2 className="page-title">Cadastro</h2>
                <p>
                    Eu já tenho cadastro, quero{" "}
                    <Link href="/login" className="text-indigo-600 underline">
                        fazer login.
                    </Link>
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