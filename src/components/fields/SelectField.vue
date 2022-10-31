<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        label: {
            type: String
        },
        options: {
            type: Array<String>
        }
    },
})
</script>
                    
<template>
    <div class="field">
        <label class="label">{{ label }} </label>
        <select class="input">
            <option v-for="option in options">{{ option }}</option>
        </select>
    </div>
</template>
                    
<style scoped>
.field {
    display: table-row;
    align-items: center;
}

.label {
    display: table-cell;
    text-align: start;
    padding-right: 15px;
    padding-left: 15px;
    white-space: nowrap;
    font-family: Helvetica, Arial, sans-serif;
    font-weight: bold;
    font-size: 14px;
    width: 0px;
}

.input {
    width: calc(100% - 18px);
    display: table-cell;
    padding: 5px;
    background-color: #f8f9fa;
    border: 1px solid #85858560;
    border-radius: 4px;
    cursor: pointer;
    margin: 5px;
    touch-action: manipulation;
    white-space: pre;
}

.input:focus {
    border: 1px solid black;
    border-radius: 5px;
    outline: 0;
    border-color: #777777;
    box-shadow: rgba(0, 0, 0, .1) 0 1px 1px;
    color: #202124;
}
</style>