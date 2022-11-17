<script setup lang="ts">

import { ref } from 'vue';
import Button from '../../buttons/Button.vue';

const props = defineProps({
    readonly: Boolean,
    show: Boolean
});

const data = ref({
    show: props.show
});

</script>

<template>
    <div v-if="data.show" class="lol">
        <slot></slot>
    </div>
    <Button :disabled="readonly" :onClick="() => data.show = !data.show" src="/arrow.svg"
        class="x-dropdown-button"></Button>
</template>

<style>
.lol {
    position: absolute;
    top: 100%;
    width: 100%;
    margin-top: 2px;
    flex-direction: column;
    display: flex;
    align-items: center;
    background-color: #f8f9fa;
    border: 1px solid #85858560;
    border-radius: 4px;
    touch-action: manipulation;
    white-space: pre;
}
</style>