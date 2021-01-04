import { IRequest } from "@/typings/IRequest";
import { IRequestState } from "@/typings/store/state/IRequestState";
import { MutationTree } from "vuex";

export default {
    addRequest(state:IRequestState, payload: IRequest): void{
        state.requests.push(payload);
    },
    setRequests(state:IRequestState, payload: Array<IRequest>): void{
        state.requests = payload;
    }
} as  MutationTree<IRequestState>