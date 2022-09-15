<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        value: {
            type: String
        }
    }
})
</script>
    
<template>
    <td>
        <p>{{ value }}</p>
    </td>
</template>
    
<style scoped>
td p {
    padding: 5px;
}
</style>