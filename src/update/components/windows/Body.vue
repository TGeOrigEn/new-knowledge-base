<script setup lang="ts">
</script>
            
<template>
    <div class="x-window-body">
        <slot></slot>
    </div>
</template>

            
<style>
.x-window-body {
    width: 100%;
    max-height: calc(100vh - 100px);
    overflow: auto;
}
</style>