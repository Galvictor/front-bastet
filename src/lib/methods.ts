import {type Curso} from "./mockup";
import router from '@/config/routes'

const MOCKED = router.root === '#';

async function request(path: string, options: {
    method?: string,
    body?: any
} = {method: "GET"}) {
    const url = `${router.root}${path}`;
    return await fetch(url, options).then(async (res) => await res.json()).catch(err => {
        error: err.message
    });
}

export async function MeusCursos({idUsuario}: { idUsuario: string }) {
    const status_code: number = 400;
    const result: Curso[] = []

    throw new Error("TODO");

    if (status_code == 403) {
        return {
            error: "Usuário só pode ver os próprios cursos."
        };
    } else {
        return result
    }
}
