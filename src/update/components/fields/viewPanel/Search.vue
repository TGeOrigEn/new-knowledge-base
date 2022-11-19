<script setup lang="ts">

const props = defineProps({
    type: { type: String, default: "text" },
    value: [String, Number],
});
</script>

<template>
    <input @input="(event) => $emit('update:value', (event.target as HTMLInputElement).value)" :value="value"
        :placeholder="'Поиск в таблице...'" class="x-search-field" :type="type" />
</template>

<style scoped>
.x-search-field {
    font-size: 14px;
    width: calc(100% - 30px);
    display: table-cell;
    padding: 5px;
    background-color: #f8f9fa;
    border: 1px solid #85858560;
    border-radius: 4px;
    margin: 5px;
    touch-action: manipulation;
    white-space: pre;
    max-height: 34px;
}

.x-search-field:focus {
    border: 1px solid black;
    border-radius: 5px;
    outline: 0;
    border-color: #777777;
    box-shadow: rgba(0, 0, 0, .1) 0 1px 1px;
    color: #202124;
}
</style>