export interface User {
    token?: string;
    username: string;
    email: string;
    name: string;
    lastName: string;
    roles: string[];
    password?: string;
}