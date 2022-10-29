<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        text: {
            type: String,
            default: undefined
        },
        src: {
            type: String,
            default: undefined
        }
    }
})
</script>
            
<template>
    <button class="button">
        <span v-if="text != undefined">{{ text }}</span>
        <img v-if="src != undefined" style="padding-top: 3px;" v-bind:src="src" />
    </button>
</template>

            
<style scoped>
button span {
    font-family: Helvetica, Arial, sans-serif;
    font-weight: bold;
    padding-left: 5px;
    padding-right: 5px;
    font-size: 14px;
}

.button {
    width: max-content;
    background-color: #f8f9fa;
    border: 1px solid #85858560;
    border-radius: 4px;
    cursor: pointer;
    margin: 5px;
    touch-action: manipulation;
    white-space: pre;
}

.button:hover {
    border-color: #777777;
    box-shadow: rgba(0, 0, 0, .1) 0 1px 1px;
    color: #202124;
}

.button:focus {
    outline: none;
}
</style>