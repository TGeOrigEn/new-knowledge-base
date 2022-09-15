<script lang="ts">
import Person from '@/entities/tables/person';
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        person: {
            type: Person
        }
    }
})
</script>

<template>
    <td>
        <p>Уровень образования: {{ $props.person!.level_education }};</p>
        <p>Учебное учреждение: {{ $props.person!.educational_institution }};</p>
        <p>Место учёбы: {{ $props.person!.location_educational_institution }};</p>
    </td>
</template>

<style scoped>
td p {
    padding-top: 5px;
    padding-left: 5px;
    padding-right: 5px;
}

td p:last-child {
    padding-bottom: 5px;
}
</style>