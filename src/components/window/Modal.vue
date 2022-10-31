<script lang="ts">

import { defineComponent } from 'vue'
import Button from '../button/Button.vue';

export default defineComponent({
    components: { Button },
    props: {
        title: {
            type: String,
            required: true
        },
        cancel: Function,
        close: Function,
        save: Function
    }
})
</script>
            
<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">

                <div class="header">
                    <span>{{ title }}</span>
                    <Button :onClick="close" style="padding: 5px;" src="/close.svg"></Button>
                </div>

                <div class="body">
                    <slot>

                    </slot>
                </div>

                <div class="footer">
                    <div class="container-buttons">
                        <Button style="background-color: rgba(169, 255, 169, 0.5);" :onClick="save"
                            text="Сохранить"></Button>
                        <Button style="background-color: rgba(255, 169, 169, 0.5);" :onClick="cancel"
                            text="Отменить"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

            
<style scoped>
.header {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin-top: 0;
    display: flex;
    align-items: center;
    background-color: #f5f5f5;
    margin-bottom: 10px;
}

.header span {
    font-family: Helvetica, Arial, sans-serif;
    margin-left: 15px;
    margin-right: 100px;
    font-weight: bold;
    font-size: 18px;
}

.header button {
    width: 32px;
    height: 32px;
    margin-left: auto;
}

.footer {
    margin-bottom: 0;
    padding-left: 5px;
    display: flex;
    align-items: center;
}

.footer .container-buttons {
    margin-left: auto;
}

.container-buttons button {
    margin: 0;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-right: 5px;
    height: 32px;
}

.modal-mask {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: table;
    height: 100%;
    width: 100%;
    z-index: 9999999;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: max-content;
    margin: 0px auto;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
}
</style>