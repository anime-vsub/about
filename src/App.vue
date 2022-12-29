<template>
  <NavBar v-if="!isEmbed" />
  <main class="px-7 pb-10 pt-7">
    <router-view />
    <FooterEmbed />
    <Footer v-if="!isEmbed" />
  </main>
</template>

<script setup lang="ts">
import { useRouteQuery } from "@vueuse/router"
const isEmbed = useRouteQuery("embed")

useHead({
  meta: [
    { property: "og:title", content: "Tachibana Shin (たちばなしん)" },
    {
      property: "og:image",
      content: "https://shin.is-a.dev/avatar-flat.jpg",
    },
    {
      name: "description",
      content: "Tachibana Shin (たちばなしん)'s Portfolio",
    },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:creator", content: "@tachib_shin" },
  ],
})
</script>
