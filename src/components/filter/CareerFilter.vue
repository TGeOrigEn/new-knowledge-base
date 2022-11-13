<script lang="ts">
import { defineComponent } from 'vue'
import SelectField from '../fields/Select.vue';
import Text from '../fields/Text.vue';
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
    components: { Modal, Form, Text, SelectField }
})
</script>
                
<template>
    <Modal :close="close" :save="save" v-if="isOpen" :title="title">
        <Form title="Содержит">
            <Text label="Дата начала:"></Text>
            <Text label="Дата окончания:"></Text>
            <Text label="Должность:"></Text>
            <Text label="Место:"></Text>
        </Form>
        <Form title="Равно">
            <Text label="Дата начала:"></Text>
            <Text label="Дата окончания:"></Text>
            <Text label="Должность:"></Text>
            <Text label="Место:"></Text>
        </Form>
    </Modal>
</template>
                
<style scoped>

</style>