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
    flex-direction: column;
    display: flex;
}

</style>