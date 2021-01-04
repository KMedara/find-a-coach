<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh</base-button
          >
          <base-button v-if="!isCoach && !isLoading" link to="/register"
            >Register as Coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          ></coach-item>
        </ul>
        <h3 v-else>No coaches found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script lang="ts">
import CoachItem from "@/components/coaches/CoachItem.vue";
import CoachFilter from "@/components/coaches/CoachFilter.vue";
import { computed, defineComponent, ref, reactive } from "vue";
import { ICoach } from "@/typings/ICoach";
import { IFilter } from "@/typings/IFilter";
import { useStore } from "@/store";

export default defineComponent({
  components: {
    CoachItem,
    CoachFilter,
  },

  setup(_, context) {
    const store = useStore();
    const isLoading = ref(false);
    const error = ref(null);
    const isCoach = computed<ICoach>(() => store.getters["coaches/isCoach"]);
    const activeFilters = reactive<IFilter<boolean>>({
      frontend: true,
      backend: true,
      career: true,
    });
    const filteredCoaches = computed(() =>
      store.getters["coaches/coaches"].filter((coach: ICoach) => {
        if (activeFilters.frontend && coach.areas.includes("frontend")) {
          return true;
        }
        if (activeFilters.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (activeFilters.career && coach.areas.includes("career")) {
          return true;
        }
        return false;
      })
    );
    const hasCoaches = computed<boolean>(
      () => !isLoading.value && store.getters["coaches/hasCoaches"] //instead of ["coaches/hasCoaches"]
    );
    async function loadCoaches(refresh = false): Promise<void> {
          //console.log(store.coaches);

      console.log("loading coaches");
      isLoading.value = true;
      try {
        store.dispatch("coaches/loadCoaches", {
          forceRefresh: refresh,
        });
      } catch (error) {
        error.value = error.message || "Something went wrong!";
      }
      isLoading.value = false;
    }

    function setFilters(updatedFilters: IFilter<boolean>): void {
      Object.assign(activeFilters, updatedFilters);
    }

    function handleError() {
      error.value = null;
    };

    console.log(hasCoaches.value);
    loadCoaches();
    return {
      isLoading,
      error,
      isCoach,
      filteredCoaches,
      hasCoaches,
      setFilters,
      loadCoaches,
    };
  },
});
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>