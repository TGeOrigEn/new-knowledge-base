<script setup lang="ts">
import ViewPanel from './update/components/table/update/ViewPanel.vue';
localStorage.setItem('token', '3h4XDBmkdBuVrnYhTGsBVR');
console.log(localStorage.getItem('token'));
</script>

<template>
    <link rel="stylesheet" href="//unpkg.com/leaflet/dist/leaflet.css" />

    <div style="width: 100%; height: 100vh; background-color: #f0f0f0;">
        <ViewPanel></ViewPanel>
    </div>
</template>

<style>

</style>
