<script setup lang="ts">
const props = defineProps({
    options: { type: Array<String>, required: true },
        required: { type: Boolean, default: true },
    label: { type: String, required: true },
    disabled: Boolean,
    
    value: [String, Number],
    name: String,
});
</script>

<template>
    <div class="x-field">
        <label class="x-field-label">{{ label }}</label>
        <select @input="(event) => $emit('update:value', (event.target as HTMLInputElement).value)" :value="value"
            :name="name" :disabled="disabled" class="x-field-select">
            <option v-for="option in options">
                {{ option }}
            </option>
        </select>
    </div>
</template>