<template>
  <a class="select-none" title="Toggle Color Scheme" @click="toggleDark">
    <Icon
      v-show="isDark"
      icon="ri:moon-clear-line"
      width="25"
      height="25"
      class="align-middle"
    />
    <Icon
      v-show="!isDark"
      icon="ri:sun-line"
      width="25"
      height="25"
      class="align-middle"
    />
  </a>
</template>

<script setup lang="ts">
import { isDark } from "/~/logics"

import { Icon } from "@iconify/vue"
function toggleDark() {
  isDark.value = !isDark.value
}
</script>
