<script setup>
import { RouterView } from 'vue-router'
import SiteNavigation from './components/siteNavigation.vue';
</script>
<template>
  <main class="flex flex-col min-h-screen font-sans bg-[#2C3333]">
    <SiteNavigation />
    <RouterView />
  </main>
</template>
