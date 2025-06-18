export type Curso = {
    id: string;
    nome: string;
    descricao: string;
    capa: string;
    inscricoes: number;
    inicio: string;
    inscricao_cancelada?: boolean;
    inscrito?: boolean;
};

export type Usuario = {
    nome: string;
    email: string;
    senha: string;
    nascimento: Date;
};
