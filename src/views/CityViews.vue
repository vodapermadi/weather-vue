<script setup>
import AsyncCity from '../components/AsyncCity.vue';
</script>
<template>
    <div class="">
        <Suspense>
            <AsyncCity />
            <template #fallback>
                <p class="font-bold text-5xl text-white w-full text-center absolute">Loading...</p>
            </template>
        </Suspense>
    </div>
</template>

