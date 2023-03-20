import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './route'
import { blogStore } from '@/stores/blogStore';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const name = to.path.replace('/', '')
  if (router.hasRoute(name)) next()
  else {
    const blog = blogStore()
    await blog.GETALLBLOG()
    blog.blogs.forEach((blog: any) => {
      router.addRoute(blog.route, {
        path: `/${blog.route}`,
        name: blog.route,
        component: () => import('@/views/BlogView.vue'),
        meta: {
          showMenu: true
        }
      })
    })
    next(`/${name}`)
  }
})


export default router
