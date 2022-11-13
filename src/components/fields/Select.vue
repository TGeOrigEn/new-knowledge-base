<script setup lang="ts">
const props = defineProps({
    options: { type: Array<String>, required: true },
    label: { type: String, required: true },
    disabled: Boolean,
    value: String,
    name: String
});
</script>

<template>
    <div class="x-field">
        <label class="x-field-label">{{ label }}</label>
        <select @input="(event) => $emit('update:value', (event.target as HTMLInputElement).value)" :value="value"
            :name="name" :disabled="disabled" class="x-field-input">
            <option v-for="option in options">
                {{ option }}
            </option>
        </select>
    </div>
</template>