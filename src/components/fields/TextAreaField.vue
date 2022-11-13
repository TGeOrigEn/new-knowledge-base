<script setup lang="ts">
const props = defineProps({
    placeholder: String,
    readonly: Boolean,
    disabled: Boolean,
    length: Number,
    label: String,
    value: String,
    name: String
});
</script>

<template>
    <div class="x-field">
        <label class="x-field-label">{{ label }}</label>
        <textarea @input="(event) => $emit('update:value', (event.target as HTMLInputElement).value)" :value="value"
            :maxlength="length" :name="name" :readonly="readonly" :placeholder="placeholder" :disabled="disabled"
            class="x-field-input"></textarea>
    </div>
</template>