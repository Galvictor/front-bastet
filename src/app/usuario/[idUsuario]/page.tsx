'use client';

import Curso from '@/components/curso'
import type {Curso as CursoType} from '@/lib/mockup'
import {useEffect, useState} from 'react';
import {getCursos} from '@/services/api';
import {useRouter} from 'next/navigation';
import {useUser} from '@/context/UserContext';

export default function MeusCursosPage() {
    const [cursos, setCursos] = useState<CursoType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const {isLoggedIn, userData} = useUser();

    useEffect(() => {
        const checkAuthAndFetchCursos = async () => {

            try {
                setIsLoading(true);
                const data = await getCursos(userData?.id);
                setCursos(data);
            } catch (err: any) {
                if (err.message === 'Token inválido' || err.message === 'Token não fornecido') {
                    router.push('/login');
                } else {
                    setError('Erro ao carregar seus cursos. Por favor, tente novamente mais tarde.');
                    console.error('Erro ao buscar cursos:', err);
                }
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthAndFetchCursos();
    }, [isLoggedIn, userData, router]);

    // Removi o check de isLoggedIn aqui para evitar flash de conteúdo
    if (isLoading) {
        return (
            <main className="min-h-screen p-8">
                <h2 className="page-title">Meus cursos</h2>
                <div className="flex justify-center items-center min-h-[200px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen p-8">
                <h2 className="page-title">Meus cursos</h2>
                <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">
                    {error}
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen p-8">
            <h2 className="page-title mb-8">Meus cursos</h2>
            {cursos.length === 0 ? (
                <div className="text-center text-gray-500 p-8">
                    <p>Você ainda não está inscrito em nenhum curso.</p>
                    <button
                        onClick={() => router.push('/cursos')}
                        className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                    >
                        Explorar cursos disponíveis
                    </button>
                </div>
            ) : (
                <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-8'>
                    {cursos.map((curso: CursoType) => (
                        <Curso data={curso} key={curso.id}/>
                    ))}
                </div>
            )}
        </main>
    );
}