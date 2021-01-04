import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import  mutations  from './mutations';
import  { getters }  from './getters';
import  actions  from './actions';
import  { state }  from './state';
import { ICoachState } from '@/typings/store/state/ICoachState';
//define injection key
//export const key: InjectionKey<Store<typeof state>> = Symbol();

export const CoachStore = {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}