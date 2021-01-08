import { ref } from "vue";

export default function useAlert(visibility = false) {
    const alertIsVisible = ref(visibility);

    function showAlert() {
        console.log("show alert")
        alertIsVisible.value = true;
    }

    function hideAlert() {
        alertIsVisible.value = false;
    }

    return {
        alertIsVisible,
        showAlert,
        hideAlert
    }
}
