import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import { IRequest } from '@/typings/IRequest'
import  mutations  from './mutations';
import  getters  from './getters';
import  actions  from './actions';
import { state } from './state';
import { IRequestState } from '@/typings/store/state/IRequestState';

//define injection key
export const key: InjectionKey<Store<typeof state>> = Symbol();

export const RequestStore = {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}