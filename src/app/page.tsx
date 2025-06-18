'use client';

import {useEffect, useState} from 'react';
import Curso from '@/components/curso';
import type {Curso as CursoType} from '@/lib/mockup';
import {getCursos} from '@/services/api';
import {useUser} from '@/context/UserContext';

export default function Page() {
    const [cursos, setCursos] = useState<CursoType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {isLoggedIn, userData} = useUser();

    useEffect(() => {
        const fetchCursos = async () => {
            try {
                const userId = isLoggedIn && userData ? userData.id : undefined;
                const data = await getCursos(userId);
                setCursos(data);
            } catch (err) {
                setError('Erro ao carregar cursos. Tente novamente mais tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchCursos();
    }, [isLoggedIn, userData]);


    if (loading) {
        return <div>Carregando cursos...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <main>
            <h2 className="page-title">Cursos</h2>
            <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-8'>
                {cursos.map((curso: CursoType) => (
                    <Curso data={curso} key={curso.id}/>
                ))}
            </div>
        </main>
    );
}