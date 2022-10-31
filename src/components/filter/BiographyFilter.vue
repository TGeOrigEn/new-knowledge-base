<script lang="ts">
import { defineComponent } from 'vue'
import SelectField from '../fields/SelectField.vue';
import TextField from '../fields/TextField.vue';
import Form from '../form/Form.vue';
import Modal from '../window/Modal.vue';
import BiographyFilter from '../../entities/filter/biographyFilter'

export default defineComponent({
    props: {
        isOpen: Boolean,
        close: Function,
        save: Function,
        data: BiographyFilter
    },
    data() {
        return {
            options: ["Любое", "Православное", "Римско-католическое", "Евангельско-лютеранское", "Иное"]
        }
    },
    components: { Modal, Form, TextField, SelectField }
})
</script>
                
<template>
    <Modal :close="close" :save="save" v-if="isOpen" title="Фильтрация столбца: Биография">
        <Form title="Содержит:">
            <TextField label="Фамилия:"></TextField>
            <TextField label="Имя:"></TextField>
            <TextField label="Отчество:"></TextField>
            <TextField label="Год рождения:"></TextField>
        </Form>
        <Form title="Равно:">
            <TextField label="Фамилия:"></TextField>
            <TextField label="Имя:"></TextField>
            <TextField label="Отчество:"></TextField>
            <TextField label="Год рождения:"></TextField>
            <TextField label="Происхождение:"></TextField>
            <SelectField label="Вероисповедание:" :options="options"></SelectField>
        </Form>
    </Modal>
</template>
                
<style scoped>

</style>