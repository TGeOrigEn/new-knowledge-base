<script setup lang="ts">
</script>

<template>
    <ul class="x-field-items-list">
        <slot></slot>
    </ul>
</template>

<style>
.x-field-items-list {
    flex-flow: row wrap;
    list-style-type: none;
    display: flex;
    align-items: center;
}
</style>