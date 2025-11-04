export type Proccess = {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    description: string | null;
    status: string | null;
    created_by: string | null;
    id_module: string;
    tasks: Task[]
}

export type Module = {
    id?: string;
    name: string;
    description: string;
    created_by: string;
    background_image_url: string | null;
    identifier_code: string;
    created_at: Date
    user: User
}


export type ModuleCreateInputs = {
    id?: string;
    name: string;
    description: string;
    created_by?: string;
    background_image_url?: string | null;
    indentifier_code?: string;
}

export type Org = {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    created_by: string;
    identifier_code: string;
}

export type User = {
    id: string;
    email: string;
    name: string;
    role: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    password: string;
}

export type Task = {
    id_process: string;
    id: string;
    description: string;
    status: "CONCLUIDA" | "EM_ANDAMENTO" | "PENDENTRE";
    title: string;
}


export type TaskCreateInput = {
    id_process: string
    title: string
    description: string
}