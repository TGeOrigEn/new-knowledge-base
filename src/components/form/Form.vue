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
    <div style="display: table; width: 100%;">
        <div style="display: table-caption;" class="label">
            <div style="display: flex; align-items: center; justify-content: center;">
                <span style="flex: 1;">{{ title }}</span>
                <Button :style="style" @click="close" src="/arrow.svg"></Button>
            </div>
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
    font-weight: bold;
    font-size: 18px;
    white-space: nowrap;
}

.none {
    display: table-cell;
    width: 100%;
}

.label button {
    margin-left: auto;
    margin-right: 15px;
}

.label span {}
</style>