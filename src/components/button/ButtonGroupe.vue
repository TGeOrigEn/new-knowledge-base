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
    <div style="display: table-row; width: 100%;">
        <div style="display: table-cell;"></div>
        <div style="display: table-cell;">
            <div style="display: flex;">
                <Button style="background-color: rgba(169, 255, 169, 0.5); margin-left: auto; height: 32px; margin-right: 13px;" text="Добавить"></Button>
            </div>
        </div>
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

.label span {
    padding-right: 5px;
    padding-left: 5px;
}
</style>