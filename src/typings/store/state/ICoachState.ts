import { ICoach } from '@/typings/ICoach';
export interface ICoachState {
    coaches: Array<ICoach>,
    lastFetch: Date
}
