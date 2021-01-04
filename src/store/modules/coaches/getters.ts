import { ICoachState } from '@/typings/store/state/ICoachState'
import { GetterTree } from 'vuex';
import { state } from './state'
import { ICoach } from '@/typings/ICoach';
import { IRootState } from '@/typings/store/state/IRootState';

const coaches = (state: ICoachState) => state.coaches;
const hasCoaches = (state: ICoachState) => state.coaches && state.coaches.length > 0;

//state,getters,rootState, rootGetters
// ? https://vuex.vuejs.org/guide/modules.html#module-local-state
function isCoach(_: ICoachState | null, getters: any, _2: any, rootGetters: any): boolean {
    const coaches = getters.coaches;
    const userId = rootGetters.userId;
    return coaches.some((coach: ICoach) => coach.id === userId);
};
const shouldUpdate = (state: ICoachState) => {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
        return true;
    }
    const currentTimeStamp = Date.now();
    return ((currentTimeStamp - lastFetch.getTime()) / 1000 > 60);
};
export const getters = {
    coaches,
    hasCoaches,
    isCoach,
    shouldUpdate

} as GetterTree<ICoachState,IRootState>
