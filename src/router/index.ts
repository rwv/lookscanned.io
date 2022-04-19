import { createRouter, createWebHistory } from "vue-router";
import ScanView from "@/views/ScanView.vue";
import IndexView from "@/views/IndexView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: IndexView,
    },
    {
      path: "/scan",
      name: "scan",
      component: ScanView,
    },
  ],
});

export default router;
