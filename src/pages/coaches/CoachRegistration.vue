<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script lang="ts">

//Vetur plugin doesn't like @ in paths, false error, can ignore
import CoachForm from "@/components/coaches/CoachForm.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ICoach } from "@/typings/ICoach";
import { key } from "@/store";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    CoachForm,
  },
  setup() {
    const store = useStore(key);
    const router = useRouter();
    function saveData(data: ICoach) {
      store.dispatch("coaches/registerCoach", data);
      router.replace("/coaches");
    }
    return {
      saveData,
    };
  },
});
</script>