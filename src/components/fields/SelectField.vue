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
    <div class="field">
        <label class="label">{{label}} </label>
        <select class="input">
            <option>Неважно</option>
            <option>Пункт 2</option>
        </select>
    </div>
</template>
                    
<style scoped>
.field {
    display: flex;
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