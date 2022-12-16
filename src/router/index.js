import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("/src/components/templates/TopLayout.vue"),
    children: [
      {
        path: "",
        redirect: "/to_be_hero"
      },
      {
        path: "test",
        name: "Test",
        meta: { forDevelop: true },
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

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.forDevelop)) {
    if (import.meta.env.VITE_ENV !== "product") {
      next({
        path: "/",
      });
      return;
    }
  }

  next();
});

export default router;
