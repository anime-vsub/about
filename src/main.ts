import "virtual:windi.css"
import "virtual:windi-devtools"

import "./styles/main.scss"
import "./styles/prose.scss"
import "./styles/markdown.scss"

import dayjs from "dayjs"
import LocalizedFormat from "dayjs/plugin/localizedFormat"
import NProgress from "nprogress"
import autoRoutes from "pages-generated"
import { ViteSSG } from "vite-ssg"
import type { RouterScrollBehavior } from "vue-router"

import App from "./App.vue"

declare module "vue-router" {
  interface RouteMeta {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    frontmatter: any
  }
}

const routes = autoRoutes.map((i) => {
  return {
    ...i,
    alias: i.path.endsWith("/") ? `${i.path}index.html` : `${i.path}.html`,
  }
})

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) return savedPosition
  else return { top: 0 }
}

export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior },
  ({ router, isClient }) => {
    dayjs.extend(LocalizedFormat)

    if (isClient) {
      router.beforeEach(() => {
        NProgress.start()
      })
      router.afterEach(() => {
        NProgress.done()
      })
    }
  }
)
