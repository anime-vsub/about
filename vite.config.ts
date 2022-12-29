import { resolve } from "path"

import Vue from "@vitejs/plugin-vue"
import fs from "fs-extra"
import matter from "gray-matter"
import anchor from "markdown-it-anchor"
import markdownAttr from "markdown-it-link-attributes"
import Prism from "markdown-it-prism"
import TOC from "markdown-it-table-of-contents"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import type { UserConfig } from "vite"
import Inspect from "vite-plugin-inspect"
import Markdown from "vite-plugin-md"
import Pages from "vite-plugin-pages"
import WindiCSS from "vite-plugin-windicss"

import { slugify } from "./scripts/slugify"

import "prismjs/components/prism-regex"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-xml-doc"
import "prismjs/components/prism-yaml"
import "prismjs/components/prism-json"
import "prismjs/components/prism-markdown"
import "prismjs/components/prism-java"
import "prismjs/components/prism-javadoclike"
import "prismjs/components/prism-javadoc"
import "prismjs/components/prism-jsdoc"

// eslint-disable-next-line import/order
import { execSync } from "child_process"

function getCtimeFile(filepath: string): string {
  return execSync(`git log -1 --format="%ad" -- "${filepath}"`).toString()
}

const config: UserConfig = {
  resolve: {
    alias: [{ find: "/~/", replacement: `${resolve(__dirname, "src")}/` }],
  },
  optimizeDeps: {
    include: [
      "vue",
      "vue-router",
      "@vueuse/core",
      "dayjs",
      "dayjs/plugin/localizedFormat",
    ],
  },
  plugins: [
    WindiCSS(),

    Vue({
      include: [/\.vue$/, /\.md$/],
    }),

    Pages({
      extensions: ["vue", "md"],
      pagesDir: "pages",
      extendRoute(route) {
        const path = resolve(__dirname, route.component.slice(1))

        if (!path.includes("projects.md")) {
          const md = fs.readFileSync(path, "utf-8")
          const { data } = matter(md)
          route.meta = Object.assign(route.meta || {}, {
            frontmatter: data,
          })

          if (!route.meta.frontmatter.date) {
            route.meta.frontmatter.date = getCtimeFile(path)
          }
        }

        return route
      },
    }),

    Markdown({
      wrapperComponent: "post",
      wrapperClasses: "prose m-auto",
      headEnabled: true,
      markdownItOptions: {
        quotes: "\"\"''",
      },
      markdownItSetup(md) {
        md.use(Prism)
        md.use(anchor, {
          slugify,
          permalink: anchor.permalink.linkInsideHeader({
            symbol: "#",
            renderAttrs: () => ({ "aria-hidden": "true" }),
          }),
        })

        md.use(markdownAttr, {
          pattern: /^https?:/,
          attrs: {
            target: "_blank",
            rel: "noopener",
          },
        })

        md.use(TOC, {
          includeLevel: [1, 2, 3],
          slugify,
        })
      },
    }),

    AutoImport({
      imports: ["vue", "vue-router", "@vueuse/core", "@vueuse/head"],
    }),

    Components({
      extensions: ["vue", "md"],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    }),

    Inspect(),
  ],

  build: {
    rollupOptions: {
      onwarn(warning, next) {
        if (warning.code !== "UNUSED_EXTERNAL_IMPORT") next(warning)
      },
    },
  },

  ssgOptions: {
    formatting: "minify",
  },
}

export default config
