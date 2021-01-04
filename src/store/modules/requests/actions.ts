import { IRequest } from "@/typings/IRequest";
import { IRequestState } from "@/typings/store/state/IRequestState";
import { IRootState } from "@/typings/store/state/IRootState";
import { ActionTree } from "vuex";

export default {
    async contactCoach(context: any, payload: IRequest) {
        const newRequest: IRequest = payload;

        const response = await fetch(`https://vue-http-demo-85e9e.firebaseio.com/requests/${payload.coachId}.json`, {
            method: 'POST',
            body: JSON.stringify(newRequest)
        });

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to send request.');
            throw error;
        }

        newRequest.id = responseData.name;
        newRequest.coachId = payload.coachId;

        context.commit('addRequest', newRequest);

        },

        async fetchRequests(context: any) {
            const coachId = context.rootGetters.userId;
            const response = await fetch(`https://vue-http-demo-85e9e.firebaseio.com/requests/${coachId}.json`);
            const responseData = await response.json();
        
            if (!response.ok) {
              const error = new Error(responseData.message || 'Failed to fetch requests.');
              throw error;
            }
        
            const requests = [];
        
            for (const key in responseData) {
              const request:IRequest = responseData[key];
              requests.push(request);
            }
            context.commit('setRequests', requests);
          } 
} as ActionTree<IRequestState,IRootState>