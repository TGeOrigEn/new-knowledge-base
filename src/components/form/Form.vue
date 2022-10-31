<script lang="ts">
import { defineComponent } from 'vue'
import Button from '../button/Button.vue';

export default defineComponent({
    data() {
        return {
            isOpen: false
        };
    },
    components: { Button },
    props: { title: String },
    computed: {
        style() {
            return this.isOpen ? `transform: rotate(180deg); height: 24px; width: 24px;` : `height: 24px; width: 24px`;
        }
    },
    methods: {
        close() {
            this.isOpen = !this.isOpen;
        },

    }
})
</script>
                
<template>
    <div style="display: table;">
        <div style="display: table-cell; vertical-align: middle;
text-align: center;">
            <span class="label" v-if="title != undefined">{{ title }}</span>
        </div>
        <div class="none">
            <Button :style="style" @click="close" src="/arrow.svg"></Button>
        </div>
        <slot v-if="isOpen">

        </slot>
    </div>
</template>
                
<style scoped>
.label {
    vertical-align: middle;
    text-align: center;
    font-family: Helvetica, Arial, sans-serif;
    padding: 15px;
    font-weight: bold;
    font-size: 18px;
    white-space: nowrap;
}

.none {
    display: table-cell;
    width: 100%;
}

.none .button {
    float: right;
    margin-right: 15px;
}
</style>