<script setup lang="ts">

const props = defineProps({ value: { type: String, required: true } });
</script>

<template>
    <td>
        <p>
            <span>{{ value }}</span>
        </p>
    </td>
</template>

<style scoped>
p {
    min-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: inherit;
    display: block;
}

span {
    min-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre;
    width: inherit;
    display: block;
}
</style>