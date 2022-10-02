<script lang="ts">
import { defineComponent } from 'vue'
import TextField from './fields/TextField.vue'
import SelectField from './fields/SelectField.vue'
import Section from './Section.vue'

export default defineComponent({
    components: { TextField, SelectField, Section }
})
</script>
            
<template>
    <ul class="dropdown-menu dropdown-trigger">
        <li>
            <slot></slot>
        </li>
    </ul>
</template>
            
<style scoped>
.dropdown-menu {
    background-color: red;
    list-style: none;
    position: absolute;
    border-top: 1px black solid;
    border-bottom: 1px black solid;
    border-left: 1px black solid;
    width: max-content;
    left: 100%;
    z-index: 10000;
    top: 0;
    padding: 0;
}
</style>