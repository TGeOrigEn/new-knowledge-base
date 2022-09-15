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
    <th>
        <div>
            <button>{{ $props.text }}</button>
            <button :style="{flex: '1'}" class='dropdown-toggle'></button>
        </div>
    </th>
</template>
        
<style scoped>
th {
    min-width: max-content;
    padding: 0;
}

button {
    min-width: fit-content;
    border-radius: 0;
    height: 100%;
    width: 100%;
}

div {
    display: flex;
    height: 100%;
    width: 100%;
}

.dropdown-toggle::after {
    border-right: .3em solid transparent;
    border-left: .3em solid transparent;
    border-top: .3em solid;
    vertical-align: .255em;
    display: inline-block;
    border-bottom: 0;
    content: "";
}
</style>