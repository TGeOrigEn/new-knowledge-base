<script setup lang="ts">
import type { Career, Rank } from '@/update/entities/DataBase';
import { ref, onBeforeMount, onUpdated } from 'vue';

const props = defineProps({ value: { type: Array<Rank>, required: true } });
const text = ref<Rank[]>(props.value);

const beforeMount = onBeforeMount(() => {
    text.value.forEach(element => {
        element.start_date = dateChange(element.start_date);
        element.end_date = dateChange(element.end_date);
    });
});

const update = onUpdated(() => {
    text.value.forEach(element => {
        element.start_date = dateChange(element.start_date);
        element.end_date = dateChange(element.end_date);
    });
})

function dateChange(e: string): string {
    const zeroPad = (num: number, places: number) => String(num).padStart(places, '0')

    let date = new Date(e);
    let month = date.getMonth();
    let day = date.getDate();
    let year = date.getFullYear();
    return zeroPad(day, 2) + '.' + zeroPad(month + 1, 2) + '.' + zeroPad(year, 4);
}
</script>

<template>
    <td>
        <p v-for="rank in value">
            <span>{{ rank.start_date }}</span>
            <span>-</span>
            <span>{{ rank.end_date }}</span>
            <span>—</span>
            <span>Класс:</span>
            <span>{{ rank.degree }},</span>
            <span>{{ rank.name }};</span>
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
    white-space: nowrap;
    width: inherit;
    display: block;
}
</style>