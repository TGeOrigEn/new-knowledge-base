<script setup lang="ts">
import type Activity from '@/update/entities/tables/Activity';;

const props = defineProps({ value: { type: Array<Activity>, required: true } });
</script>

<template>
    <td>
        <p v-for="activity in value">
            <span>{{ activity.name }}:</span>
            <span>{{ activity.description }};</span>
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