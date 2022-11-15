<script setup lang="ts">
import { computed } from '@vue/reactivity';

const style = computed(() => {
    if (props.right && props.left) return "margin-left: auto; margin-right: auto;";
    else if (props.right) return "margin-right: auto;";
    return "margin-left: auto;";
});

const props = defineProps({
    right: Boolean,
    left: Boolean
});
</script>
            
<template>
    <div :style="style">
        <slot></slot>
    </div>
</template>

            
<style>

</style>