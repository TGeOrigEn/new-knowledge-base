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
            optionsLevel: ["Любое", "Нет образования", "Начальное образование", "Домашнее образование", "Среднее образование", "Среднее военное образование", "Высшее образование", "Высшее военное образование"],
            optionsPlace: ["Любое", "Неизвестно", "Европейская часть", "Сибирь"]
        }
    },
    components: { Modal, Form, TextField, SelectField }
})
</script>
                
<template>
    <Modal :close="close" :save="save" v-if="isOpen" title="Фильтрация столбца: Образование">
        <Form title="Содержит:">
            <TextField label="Учебное учреждение:"></TextField>
        </Form>
        <Form title="Равно:">
            <TextField label="Учебное учреждение:"></TextField>
            <SelectField label="Место учёбы:" :options="optionsPlace"></SelectField>
            <SelectField label="Уровень образования:" :options="optionsLevel"></SelectField>
        </Form>
    </Modal>
</template>
                
<style scoped>

</style>