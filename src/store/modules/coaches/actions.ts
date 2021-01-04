import { ICoach } from '@/typings/ICoach'
import { ICoachState } from '@/typings/store/state/ICoachState';
import { IRootState } from '@/typings/store/state/IRootState';
import { ActionTree } from "vuex";
export default {
  async registerCoach(context: any, data: ICoach): Promise<void> {
    const userId = context.rootGetters.userId;
    const response = await fetch(
      `https://vue-http-demo-85e9e.firebaseio.com/coaches/${userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(data)
      }
    );

    if (!response.ok) {
      console.log("error");
    }

    context.commit('registerCoach', {
      ...data,
      id: userId
    });
  },
  async loadCoaches(context: any, payload: any) {
    if(!payload.forceRefresh && !context.getters.shouldUpdate){
      return;
    }

    const response = await fetch(
      `https://vue-http-demo-85e9e.firebaseio.com/coaches.json`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    const coaches = [];

    for(const key in responseData){
      const coach: ICoach = {
        id: key,
        ...responseData[key]
      };
      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');

  }
  
} as ActionTree<ICoachState,IRootState>