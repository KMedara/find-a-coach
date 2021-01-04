import { ICoach } from "@/typings/ICoach";
import { ICoachState } from "@/typings/store/state/ICoachState";
import { MutationTree } from "vuex";
export default {
    registerCoach(state: ICoachState, payload: ICoach) {
        state.coaches.push(payload);
    },
    setCoaches(state: ICoachState, payload: Array<ICoach>) {
        state.coaches = payload;
    },
    setFetchTimestamp(state: ICoachState) {
        state.lastFetch = new Date();
    }
} as MutationTree<ICoachState>