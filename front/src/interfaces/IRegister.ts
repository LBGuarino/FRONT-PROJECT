
    // "name": "Lucia Guarino",
    // "email": "luliguari@hotmail.com",
    // "address": "calle falsa 123",
    // "phone": "789478392",
    // "password": "Admin12345!"

export interface IRegister {
    name: string | undefined | null,
    email: string | undefined | null,
    address?: string | undefined | null,
    phone?: string | undefined | null,
    sub: string | null | undefined,
    password?: string | undefined | null
}