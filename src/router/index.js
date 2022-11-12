import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Test",
    component: () => import("/src/components/views/ComponentView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
