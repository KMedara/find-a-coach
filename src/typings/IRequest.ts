export interface IRequest {
     id?: string | number;
     coachId: number,
    readonly email: string;
    readonly message: string;
}