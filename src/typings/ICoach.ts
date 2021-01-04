export interface ICoach {
    id?: string | number;
    firstName: string,
    lastName: string,
    areas: Array<string>,
    description: string,
    hourlyRate: number
}