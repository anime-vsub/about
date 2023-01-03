<template>
  <header class="header z-40">
    <router-link
      class="w-10 h-10 absolute lg:fixed m-6 select-none outline-none"
      to="/"
      focusable="false"
    >
      <img v-show="!isDark" src="/src/assets/animevsub.svg" alt="logo" />
      <img v-show="isDark" src="/src/assets/animevsub.svg" alt="logo" />
    </router-link>
    <nav class="nav">
      <div class="spacer" />
      <div class="right">
        <router-link to="/">
          <span class="<md:hidden">About</span>
          <Icon
            class="md:hidden align-middle"
            icon="ri:information-line"
            width="25"
            height="25"
          />
        </router-link>
        <router-link to="/privacy-police">
          <span class="<md:hidden">Privacy Police</span>
          <Icon
            class="md:hidden align-middle"
            icon="ri:chat-private-line"
            width="25"
            height="25"
          />
        </router-link>
        <router-link to="/tems-of-use">
          <span class="<md:hidden">Tems of use</span>
          <Icon
            class="md:hidden align-middle"
            icon="ri:article-line"
            width="25"
            height="25"
          />
        </router-link>
        <router-link to="/disclaimer">
          <span class="<md:hidden">Disclaimer</span>
          <Icon
            class="md:hidden align-middle"
            icon="simple-icons:unlicense"
            width="25"
            height="25"
          />
        </router-link>
        <router-link to="/sponsors">
          <span class="<md:hidden">Sponsors</span>
          <Icon
            class="md:hidden align-middle"
            icon="octicon:sponsor-tiers-24"
            width="25"
            height="25"
          />
        </router-link>
        <a
          href="https://twitter.com/tachib_shin"
          target="_blank"
          title="Twitter"
        >
          <Icon icon="fe:twitter" width="25" height="25" class="align-middle" />
        </a>
        <a href="https://github.com/anime-vsub" target="_blank" title="GitHub">
          <Icon icon="uil:github" width="25" height="25" class="align-middle" />
        </a>
        <toggle-theme />
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue"

import { isDark } from "../logics"
</script>

<style lang="scss" scoped>
.header h1 {
  margin-bottom: 0;
}
.logo {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
}
.nav {
  padding: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: auto max-content;
  box-sizing: border-box;
  > * {
    margin: auto;
  }
  img {
    margin-bottom: 0;
  }
  a {
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    transition: opacity 0.2s ease;
    opacity: 0.6;
    outline: none;
    &:hover {
      opacity: 1;
      text-decoration-color: inherit;
    }
  }
  .right {
    display: grid;
    grid-gap: 1.2rem;
    grid-auto-flow: column;
    > * {
      margin: auto;
    }
  }
}
</style>
