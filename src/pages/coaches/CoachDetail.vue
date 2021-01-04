<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button link :to="contactLink">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";
import { ICoach } from "@/typings/ICoach";
export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  //should infer type from props component option
  //make sure lang="ts" and exporting defineComponent
  setup(props) {
    const route = useRoute();
    const store = useStore();
    console.log(store);
    const selectedCoach = computed(() =>
      store.getters["coaches/coaches"].find(
        (coach: ICoach) => coach.id === props.id
      )
    );
    const fullName = computed(
      () => selectedCoach.value.firstName + " " + selectedCoach.value.lastName
    );
    const areas = computed(() => selectedCoach.value.areas);
    const rate = computed(() => selectedCoach.value.hourlyRate);
    const description = computed(() => selectedCoach.value.description);
    const contactLink = computed(() =>
      route.path.includes("contact") ? route.path : route.path + "/contact"
    );
    //#endregion

    return {
      selectedCoach,
      fullName,
      areas,
      rate,
      description,
      contactLink,
    };
  },
});
</script>