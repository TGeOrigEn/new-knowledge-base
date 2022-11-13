<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        label: {
            type: String
        }
    },
})
</script>
                    
<template>
    <section class="section">
        <label>{{ label }}</label>
        <slot></slot>
    </section>
</template>
                    
<style scoped>
.section {
    border: 1px black solid;
    margin: 10px;
}

.label {
    white-space: nowrap;
    margin: 5px;
    margin-right: 10px;
}

.input {
    margin: 5px;
    width: 100%;
}
</style>