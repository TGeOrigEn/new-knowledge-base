<script setup lang="ts">

const props = defineProps({
    required: { type: Boolean, default: true },
    label: { type: String, required: true },
    type: { type: String, default: "text" },
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
        <label class="x-field-label">{{ label }}<span v-if="required && !readonly" class="x-field-required">*</span></label>
        <input @input="(event) => $emit('update:value', (event.target as HTMLInputElement).value)" :value="value"
            :maxlength="length" :name="name" :readonly="readonly" :placeholder="placeholder" :disabled="disabled"
            class="x-field-input" :type="type" />
    </div>
</template>