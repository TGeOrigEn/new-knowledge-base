<script setup lang="ts">
import type { Console } from 'console';
import Button from '../button/Button.vue';
const props = defineProps({
    label: { type: String, required: true },
    placeholder: String,
    readonly: Boolean,
    disabled: Boolean,
    length: Number,
    value: String,
    name: String
});
</script>

<template>
    <div class="x-field">
        <label class="x-field-label">{{ label }}</label>
        <div class="none">
            <ul
                style="flex-flow: row wrap; list-style-type: none; display: flex; align-items: center;">
                <li style="display: flex; flex-flow: wrap;">
                    <Button style="margin: 2px; white-space: unset;" onclick='console.log(123)'>
                        <div style="display: flex; align-items: center;">
                            <span style="margin-left: 5px;">123</span>
                            <Button onclick='console.log(321); event.stopImmediatePropagation();'
                                style="background-size: 6px; width: 12px; height: 12px;" src="/close.svg"></Button>
                        </div>
                    </Button>
                </li>
            </ul>
            <Button src="/plus.svg" style="background-size: 14px; flex: 0 0 24px; margin-left: auto; margin-right: 2px; width: 24px; height: 24px;"></Button>
        </div>
    </div>
</template>

<style scoped>
.none {
    display: flex;
    align-items: center;
    width: calc(100% - 20px);
    background-color: #f8f9fa;
    border: 1px solid #85858560;
    border-radius: 4px;
    margin: 5px;
    touch-action: manipulation;
    white-space: pre;
}
</style>