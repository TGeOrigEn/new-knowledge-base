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
    min-width: 100px;
    display: flex;
    align-items: center;
}

ul>:first-child {
    margin-left: 3px;
}
</style>