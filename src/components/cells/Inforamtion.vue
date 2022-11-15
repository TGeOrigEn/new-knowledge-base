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
        <p>
            <span>{{ $props.person?.surname }}</span>
            <span>{{ $props.person?.name }}</span>
            <span>{{ $props.person?.patronymic }}</span></p>
        <p>Год рождения: {{ $props.person!.date_birth }};</p>
        <p>Вероисповедание: {{ $props.person!.religion }};</p>
        <p>Происхождение: {{ $props.person!.origin }};</p>
    </td>
</template>

<style scoped>

span {
    margin: 2px;
}

td p {
    padding-top: 5px;
    padding-left: 5px;
    padding-right: 5px;
}

dt p:last-child {
    padding-bottom: 5px;
}
</style>