import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import {store, key }  from "./store";
//import { store } from './store';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import BaseSpinner from '@/components/ui/BaseSpinner.vue';
import BaseDialog from '@/components/ui/BaseDialog.vue';
import { ICoach } from '@/typings/ICoach'
import { IFilter } from '@/typings/IFilter'


createApp(App)
.component('base-card', BaseCard)
.component('base-button', BaseButton)
.component('base-badge', BaseBadge)
.component('base-spinner', BaseSpinner)
.component('base-dialog', BaseDialog)
  //.use(store, key)
  .use(store, key)
  .use(router)
  .mount("#app");
