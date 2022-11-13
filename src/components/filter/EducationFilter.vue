<script lang="ts">
import { defineComponent } from 'vue'
import Select from '../fields/Select.vue';
import Text from '../fields/Text.vue';
import Form from '../form/Form.vue';
import Modal from '../window/Modal.vue';
import EducationFilter from '@/entities/filter/educationFilter';

export default defineComponent({
    props: {
        isOpen: Boolean,
        close: Function,
        save: Function,
        data: EducationFilter
    },
    data() {
        return {
            optionsLevel: ["Любое", "Нет образования", "Начальное образование", "Домашнее образование", "Среднее образование", "Среднее военное образование", "Высшее образование", "Высшее военное образование"],
            optionsPlace: ["Любое", "Неизвестно", "Европейская часть", "Сибирь"]
        }
    },
    components: { Modal, Form, Text, Select }
})
</script>
                
<template>
    <Modal :close="close" :save="save" v-if="isOpen" title="Фильтрация столбца: Образование">
        <Form title="Фильтрация по содержанию">
            <Text label="Учебное учреждение:"></Text>
        </Form>
        <Form title="Фильрация по равенству">
            <Text label="Учебное учреждение:"></Text>
            <Select label="Место учёбы:" :options="optionsPlace"></Select>
            <Select label="Уровень образования:" :options="optionsLevel"></Select>
        </Form>
    </Modal>
</template>
                
<style scoped>

</style>