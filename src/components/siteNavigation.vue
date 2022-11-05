<template>
    <header class="sticky top-0 shadow-lg flex justify-center items-center text-white">
        <nav class="container flex py-4 gap-4 items-center justify-center">
            <RouterLink :to="{name : 'home'}">
                <div class="flex items-center gap-3">
                    <span class="material-icons-round text-5xl animate-spin">light_mode</span>
                    <p class="text-xl font-semibold">The Local Weather</p>
                </div>
            </RouterLink>
            <div class="flex flex-items items-center">
                <span class="material-icons-round hover:text-gray-200 duration-150 cursor-pointer ">info</span>
            </div>
            <div class="flex flex-items items-center">
                <span class="material-icons-round hover:text-gray-200 duration-150 cursor-pointer ">add</span>
            </div>
        </nav>
    </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>