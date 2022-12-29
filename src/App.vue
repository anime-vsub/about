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

import icon from "/src/assets/animevsub.svg?url"
const isEmbed = useRouteQuery("embed")

useHead({
  meta: [
    { property: "og:title", content: "About - AnimeVsub" },
    {
      property: "og:image",
      content: icon,
    },
    {
      name: "description",
      content: "AnimeVsub's information, terms of service, statement",
    },
    {
      property: "og:description",
      content: "AnimeVsub's information, terms of service, statement",
    },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:creator", content: "@tachib_shin" },
  ],
})
</script>
