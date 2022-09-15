<script lang="ts">
import type Activity from '@/entities/tables/activity';
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        items: {
            type: Array<Activity>
        }
    }
})
</script>

<template>
    <td>
        <p v-for="item in $props.items">{{ item.name }}: {{ item.description }}</p>
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
  