<script lang="ts">
import type Career from '@/entities/tables/career';
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        items: {
            type: Array<Career>
        }
    }
})
</script>
    
<template>
    <td>
        <p v-for="item in $props.items">{{ item.start_date }} - {{ item.end_date }} — {{ item.post }}, {{ item.place }};
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
      