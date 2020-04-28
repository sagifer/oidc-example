export interface IUser {
    username: string;
    claims: { [id: string]: any; };
}
