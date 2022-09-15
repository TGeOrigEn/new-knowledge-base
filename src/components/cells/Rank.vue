<script lang="ts">
import type Rank from '@/entities/tables/rank';
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        items: {
            type: Array<Rank>
        }
    }
})
</script>
        
<template>
    <td>
        <p v-for="item in $props.items">
            {{ item.start_date }} - {{ item.end_date }} — Класс: {{ item.degree }}, {{ item.name }};
        </p>
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
          