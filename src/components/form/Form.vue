<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: { title: String }
})
</script>
                
<template>
    <div style="display: table-row;">
        <span class="label" v-if="title != undefined">{{ title }}</span>
        <div class="none"></div>
    </div>
</template>
                
<style scoped>
.label {
    text-align: center;
    display: table-cell;
    font-family: Helvetica, Arial, sans-serif;
    margin-left: 5px;
    margin-right: 5px;
    font-weight: bold;
    font-size: 18px;
    white-space: nowrap;
}

.none {
    display: table-cell;
    width: 100%;
}
</style>