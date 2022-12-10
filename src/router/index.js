import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("/src/components/templates/TopLayout.vue"),
    children: [
      {
        path: "",
        name: "Test",
        component: () => import("/src/components/views/ComponentView.vue"),
      },
      {
        path: "to_be_hero",
        name: "ToBeHero",
        component: () => import("/src/components/views/ToBeHero.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
