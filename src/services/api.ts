import {Curso} from "@/lib/mockup";

const BASE_URL = "http://localhost:3000";

// Interface para o usuário
interface Usuario {
    id: number;
    nome: string;
    email: string;
    data_nascimento: string;
    criado_em: string;
}

// Interface para resposta do login
interface LoginResponse {
    success: boolean;
    data: {
        usuario: Usuario;
        token: string;
    };
}

// Interface para dados do login
interface LoginData {
    email: string;
    senha: string;
}

export const login = async (loginData: LoginData): Promise<LoginResponse> => {
    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.mensagem || "Erro ao fazer login.");
    }

    return data;
};

export const getCursos = async (userId?: number): Promise<Curso[]> => {
    const url = userId ? `${BASE_URL}/cursos/${userId}` : `${BASE_URL}/cursos`;

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao carregar cursos');
        }

        return response.json();
    } catch (error) {
        console.error('Erro ao buscar cursos:', error);
        throw error;
    }
};