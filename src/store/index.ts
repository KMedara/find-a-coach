import { createStore,Store, useStore as baseUseStore } from "vuex";
import { CoachStore } from '@/store/modules/coaches';
import { RequestStore } from '@/store/modules/requests';
import { IRootState } from "@/typings/store/state/IRootState";

//seperated store with different typed modules
import { InjectionKey } from 'vue';
import { ICoachState } from "@/typings/store/state/ICoachState";
//define injection key
export const key: InjectionKey<Store<IRootState>> = Symbol();

//modules are namespaced
export const store = createStore<IRootState>({
  modules: {
    coaches: CoachStore,
    requests: RequestStore
  }, 
  state: {
    userId: 'c3'
  },
  actions: {},
  getters: { //defined IRootState in order to maintiain rootStore
    userId(state: IRootState) {
      return state.userId
    }
  },
  mutations: {}
});

export function useStore() {
  return baseUseStore(key);
}
