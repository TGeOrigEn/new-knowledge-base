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
    margin: 2px;
}

span {
    margin: 2px;
}
</style>