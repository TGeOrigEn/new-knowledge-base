<script setup lang="ts">
const props = defineProps({
    required: { type: Boolean, default: true },
    label: { type: String, required: true },
    placeholder: String,
    readonly: Boolean,
    disabled: Boolean,
    length: Number,
    value: [String, Number],
    name: String
});
</script>

<template>
    <div class="x-field">
        <label class="x-field-label">{{ label }}</label>
        <textarea @input="(event) => $emit('update:value', (event.target as HTMLInputElement).value)" :value="value"
            :maxlength="length" :name="name" :readonly="readonly" :placeholder="placeholder" :disabled="disabled"
            class="x-field-input" style="resize: vertical; min-height: 50px; max-height: 300px;"></textarea>
    </div>
</template>