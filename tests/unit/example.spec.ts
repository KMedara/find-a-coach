import { mount, shallowMount } from "@vue/test-utils";
import CoachItem from "@/components/coaches/CoachItem.vue"
import App from "@/App.vue";
import router from "@/router"
import { store } from "@/store";
import CoachesList from "@/pages/coaches/CoachesList.vue";
import Vue, { onBeforeMount } from "vue";
import { useRoute } from "vue-router";


function getSiblings(el: any, filter: any | null) {
  var siblings = [];
  el = el.parent.firstChild;
  do { if (!filter || filter(el)) siblings.push(el); } while (el = el.nextSibling);
  return siblings;
}


test('routing', async () => {
  router.push('/')
  await router.isReady()
  const wrapper = mount(App, {
    globals: {
      plugins: [router, store]
    }
  } as any);
  expect(wrapper.find('.app')).toBeTruthy();
}),


  describe("CoachItem.vue", () => {
    it("displays alert when Coach Item is clicked", async () => {
      const route = useRoute();
      router.push('/coaches');
      await router.isReady();
      const AppWrapper = mount(App);
      const wrapper = mount(CoachItem, {
        props: {
          id: 4,
          firstName: 'Kevin',
          lastName: 'Medara',
          rate: 30,
          areas: ['FrontEnd', 'BackEnd']
        },
        attachTo: document.getElementById('app')
      } as any);

      //find item component by name
      const spy = spyOn(wrapper.vm, 'showAlert');
      await wrapper.find('li').trigger('click');
      expect(spy).toHaveBeenCalledTimes(1);
    })
  })