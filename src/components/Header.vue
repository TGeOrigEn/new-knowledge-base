<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({

    props: {
        text: {
            type: String
        }
    },
    methods: {
    }
})
</script>
        
<template>
    <th>
        <div>
            <section style="margin-bottom: 5px; margin-top: 5px;">{{ $props.text }}</section>
            <section :style="{flex: '1'}" class='dropdown-trigger'>
                <slot></slot>
            </section>
        </div>
    </th>
</template>
        
<style scoped>
th {
    min-width: max-content;
    padding: 0;
    background-color: aliceblue;
}

section {
    margin-left: 5px;
    font-size: 14px;
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-weight: bold;
    min-width: fit-content;
    border-radius: 0;
    height: 100%;
    width: 100%;
    border: 0;
}

div {
    display: flex;
    height: 100%;
    width: 100%;
}

.dropdown-trigger:hover {
    background-color: antiquewhite;
}

.dropdown-trigger::after {
    margin-right: 5px;
    margin-left: 5px;
    margin-bottom: 5px;
    margin-top: 10px;
    pointer-events: all;
    border-right: .4em solid transparent;
    border-left: .4em solid transparent;
    border-top: .4em solid;
    vertical-align: .255em;
    display: inline-block;
    border-bottom: 0;
    content: "";
}
</style>