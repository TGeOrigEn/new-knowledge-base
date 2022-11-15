<script setup lang="ts">
import Button from '../../buttons/Button.vue';

const props = defineProps({
    remove: { type: Function, required: true },
    open: { type: Function, required: true },
    text: { type: String, required: true },
    readonly: Boolean
});
</script>

<template>
    <li class="x-item-wrapper">
        <Button class="x-item" :onClick="open">
            <div class="x-item-container">
                <span class="x-item-text">{{ text }}</span>
                <Button src="/close.svg" v-if="!readonly" class="x-item-button-remove"
                    :onClick="(event: MouseEvent) => { remove; event.stopImmediatePropagation(); }" />
            </div>
        </Button>
    </li>
</template>

<style>
.x-item-wrapper {
    flex-flow: wrap;
    display: flex;
}

.x-item-container {
    align-items: center;
    display: flex;
}

.x-item-text {
    max-width: 100px;
    margin-left: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.x-item-button-remove {
    background-size: 6px;
    height: 12px;
    width: 12px;
}

.x-item {
    margin: 2px;
    white-space: unset;
}
</style>