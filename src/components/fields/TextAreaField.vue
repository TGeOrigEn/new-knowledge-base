<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        disabled: Boolean,
        label: {
            type: String
        }
    },
})
</script>
                
<template>
    <div class="field">
        <label class="label">{{ label }} </label>
        <textarea :disabled="disabled" class="input" type="text" ></textarea>
    </div>
</template>
                
<style scoped>
.field {
    display: table-row;
    align-items: center;
}

.label {
    vertical-align: middle;
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
    overflow: auto;
    resize: none;
    width: calc(100% - 30px);
    display: table-cell;
    padding: 5px;
    background-color: #f8f9fa;
    border: 1px solid #85858560;
    border-radius: 4px;
    margin: 5px;
    touch-action: manipulation;
    white-space: pre;
}

.input:disabled {
    background-color: #7e7e7e77;
    cursor: default;
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