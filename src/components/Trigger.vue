<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({

    props: {
        text: {
            type: String
        }
    }
})
</script>
            
<template>
    <div class='dropdown-trigger'>
        <label>{{text}}</label>
        <slot></slot>
    </div>
</template>
            
<style scoped>
.dropdown-trigger {
    height: 100%;
    width: 100%;
}

.dropdown-trigger:hover {
    background-color: antiquewhite;
}

label {
    margin: 5px;
}
</style>