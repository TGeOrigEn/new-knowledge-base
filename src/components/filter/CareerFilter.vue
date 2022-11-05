<script lang="ts">
import { defineComponent } from 'vue'
import SelectField from '../fields/SelectField.vue';
import TextField from '../fields/TextField.vue';
import Form from '../form/Form.vue';
import Modal from '../window/Modal.vue';
import CareerFilter from '../../entities/filter/careerFilter'

export default defineComponent({
    props: {
        title: {
            type: String,
            required: true
        },
        isOpen: Boolean,
        close: Function,
        save: Function,
        data: CareerFilter
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
    <Modal :close="close" :save="save" v-if="isOpen" :title="title">
        <Form title="Содержит">
            <TextField label="Дата начала:"></TextField>
            <TextField label="Дата окончания:"></TextField>
            <TextField label="Должность:"></TextField>
            <TextField label="Место:"></TextField>
        </Form>
        <Form title="Равно">
            <TextField label="Дата начала:"></TextField>
            <TextField label="Дата окончания:"></TextField>
            <TextField label="Должность:"></TextField>
            <TextField label="Место:"></TextField>
        </Form>
    </Modal>
</template>
                
<style scoped>

</style>