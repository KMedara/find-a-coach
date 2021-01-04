import { IRequest } from "@/typings/IRequest"
import { IRequestState } from "@/typings/store/state/IRequestState"
import { IRootState } from "@/typings/store/state/IRootState";
import { GetterTree } from "vuex";

const requests = (state: IRequestState, _: any, _2: any, rootGetters: any) => {
    const coachId = rootGetters.userId;
    return state.requests.filter(req => req.coachId === coachId);
};

const hasRequests = (_: IRequestState, getters: any) => {
    const doesHave: boolean = (getters.requests && getters.requests.length > 0);
    return doesHave;
}

export default {
    requests,
    hasRequests
} as GetterTree<IRequestState,IRootState>