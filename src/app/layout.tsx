"use client";

import {Inter} from "next/font/google";
import "./globals.css";
import Link from "next/link";
import {useUser, UserProvider} from "@/context/UserContext";

const inter = Inter({subsets: ["latin"]});

function LayoutContent({children}: { children: React.ReactNode }) {
    const {isLoggedIn, logout} = useUser(); // Consome valores do UserContext

    return (
        <html lang="pt-br">
        <body className={inter.className}>
        <div className="flex min-h-screen flex-col gap-10">
            <header className="layout-guide h-[16rem] flex flex-col justify-end">
                <h1 className="text-5xl font-bold py-5">
                    <Link href="/" className="text-indigo-800 hover:text-indigo-900">
                        Bastet
                    </Link>
                </h1>
                <p>Uma nova plataforma de cursos</p>
                <menu className="flex flex-row gap-4">
                    {!isLoggedIn && (
                        <>
                            <Link className="text-indigo-600" href="/cadastro">
                                Fazer cadastro
                            </Link>
                            <Link className="text-indigo-600" href="/login">
                                Fazer login
                            </Link>
                        </>
                    )}
                    {isLoggedIn && (
                        <>
                            <Link className="text-indigo-600" href="/usuario/will">
                                Meus cursos
                            </Link>
                            <button
                                className="text-indigo-600 hover:text-indigo-800"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </>
                    )}
                </menu>
            </header>
            <div className="layout-guide flex-1">{children}</div>
            <footer className="bg-indigo-800">
                <p className="p-4 text-center text-white text-sm">
                    A plataforma Baslet faz parte de um projeto criado para fins
                    didaticos para a disciplina de Backend Node.js com SQL no
                    Instituto INFnet.
                </p>
            </footer>
        </div>
        </body>
        </html>
    );
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    // Envolve o conteúdo no UserProvider
    return (
        <UserProvider>
            <LayoutContent>{children}</LayoutContent>
        </UserProvider>
    );
}