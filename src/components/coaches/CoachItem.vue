<template>
  <user-alert v-if="alertIsVisible" title="Alert!" @close="hideAlert">
    <template v-slot:content><p>this is a slot</p></template>
  </user-alert>
  <li @click="showAlert">
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hour</h4>
    <div>
      <base-badge
        v-for="area in areas"
        :key="area"
        :type="area"
        :title="area"
      ></base-badge>
    </div>
    <div class="actions">
      <base-button mode="outline" link :to="coachContactLink"
        >Contact</base-button
      >
      <base-button link :to="coachDetailsLink">View Details</base-button>
    </div>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, PropType, ref, inject } from "vue";
import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";
import useAlert from "../../components/hooks/useAlert";
import CoachDetailVue from "../../pages/coaches/CoachDetail.vue";
export default defineComponent({
  name: 'CoachItem',
  props: {
    id: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    areas: {
      type: Object as PropType<Array<string>>,
      required: true,
    },
    routePath: {
      type: String,
      required: true
    }
    // coachDetailsLink: {
    //   type: String,
    //   required: false,
    // },
    // coachContactLink: {
    //   type: String,
    //   required: false,
    // },
  },

  //infers prop types from component option above
  setup(props) {
    //const route = useRoute();
    const alertTitle = ref("delete user?");
    //useAlert(true)
    //Refs infer the type from the initial value:
    // When typing a reactive property, we can use interfaces:
    //const book = reactive<Book>({ title: 'Vue 3 Guide' })
    
    //Computed values will automatically infer the type from returned value
    return {
      fullName: computed(() => props.firstName + " " + props.lastName),
      coachContactLink: computed(
        () => props.routePath + props.id + "/contact"
      ),
      //coachContactLink: computed(() => route? route.path + '/'+ + props.id +'/contact' : props.coachDetailsLink),
      //coachDetailsLink : computed(() => route ? route.path : props.coachDetailsLink),
      coachDetailsLink: computed(() => props.routePath + "/" + props.id),
      ...useAlert(),
    };
  },
});
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>