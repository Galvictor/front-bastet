"use client";

import type {Curso as CursoType} from "@/lib/mockup"
import Image from "next/image"
import {useState, useEffect} from "react";
import {useUser} from "@/context/UserContext";
import {inscreverEmCurso, cancelarInscricao} from "@/services/api";

export default function CursoView({data}: { data: CursoType }) {
    const [isLoading, setIsLoading] = useState(false);
    const [inscricaoStatus, setInscricaoStatus] = useState({
        inscrito: data.inscrito,
        inscricao_cancelada: data.inscricao_cancelada
    });
    const {isLoggedIn} = useUser();

    // Atualiza o estado quando as props mudam
    useEffect(() => {
        setInscricaoStatus({
            inscrito: data.inscrito,
            inscricao_cancelada: data.inscricao_cancelada
        });
    }, [data.inscrito, data.inscricao_cancelada]);

    const handleInscricao = async () => {
        if (!isLoggedIn) return;

        setIsLoading(true);
        try {
            await inscreverEmCurso(data.id);
            setInscricaoStatus({
                inscrito: true,
                inscricao_cancelada: false
            });
        } catch (error) {
            console.error("Erro ao fazer inscrição:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelamento = async () => {
        if (!isLoggedIn) return;

        setIsLoading(true);
        try {
            await cancelarInscricao(data.id);
            setInscricaoStatus({
                inscrito: true,
                inscricao_cancelada: true
            });
        } catch (error) {
            console.error("Erro ao cancelar inscrição:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return <div className="border flex-1 flex flex-col">
        <figure className="relative aspect-video">
            <Image src={data.capa} alt={data.nome} fill/>
            {inscricaoStatus.inscrito &&
                <figcaption
                    className="text-sm p-4 bg-slate-200 absolute m-4 shadow-xl border-slate-400 border rounded-xl">
                    Você já se inscreveu neste curso
                </figcaption>
            }
        </figure>
        <div className="p-6 flex flex-col gap-2 flex-1">
            <h3 className="text-2xl">{data.nome}</h3>
            <p>{data.descricao}</p>
            <div className="flex flex-row flex-wrap gap-1">
                <span className="text-xs py-1 px-2 leading-tight bg-slate-200 rounded-2xl">
                    {data.inscricoes} inscritos
                </span>
                <span className="text-xs py-1 px-2 leading-tight bg-slate-200 rounded-2xl">
                    Inicia em {data.inicio}
                </span>
            </div>
        </div>
        {
            inscricaoStatus.inscrito ?
                inscricaoStatus.inscricao_cancelada ?
                    <p className="bg-red-500 p-4 text-center text-white">Inscrição cancelada</p> :
                    <button
                        className="text-center p-4 bg-slate-300 hover:bg-slate-400 disabled:bg-slate-200 disabled:cursor-not-allowed"
                        onClick={handleCancelamento}
                        disabled={isLoading || !isLoggedIn}
                        title={!isLoggedIn ? "Faça login para interagir com o curso" : ""}
                    >
                        {isLoading ? 'Processando...' : 'Cancelar inscrição'}
                    </button> :
                <button
                    className="text-center p-4 bg-indigo-500 hover:bg-indigo-600 text-white disabled:bg-indigo-300 disabled:cursor-not-allowed"
                    onClick={handleInscricao}
                    disabled={isLoading || !isLoggedIn}
                    title={!isLoggedIn ? "Faça login para interagir com o curso" : ""}
                >
                    {isLoading ? 'Processando...' : 'Fazer inscrição'}
                </button>
        }
    </div>
}