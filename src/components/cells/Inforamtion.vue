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
        <p>{{ $props.person!.surname }} {{ $props.person!.name }} {{ $props.person!.patronymic }};</p>
        <p>Год рождения: {{ $props.person!.date_birth }};</p>
        <p>Вероисповедание: {{ $props.person!.religion }};</p>
        <p>Происхождение: {{ $props.person!.origin }};</p>
    </td>
</template>

<style scoped>
td p {
    padding-top: 5px;
    padding-left: 5px;
    padding-right: 5px;
}

dt p:last-child {
    padding-bottom: 5px;
}
</style>