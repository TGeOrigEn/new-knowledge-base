<script lang="ts">
import { defineComponent } from 'vue'
import Select from '../fields/Select.vue';
import Text from '../fields/Text.vue';
import Section from '../form/Section.vue';
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
    components: { Modal, Section, Text, Select }
})
</script>
                
<template>
    <Modal :close="close" :save="save" v-if="isOpen" title="Фильтрация столбца: Образование">
        <Section label="Фильтрация по содержанию">
            <Text label="Учебное учреждение:"></Text>
        </Section>
        <Section label="Фильрация по равенству">
            <Text label="Учебное учреждение:"></Text>
            <Select label="Место учёбы:" :options="optionsPlace"></Select>
            <Select label="Уровень образования:" :options="optionsLevel"></Select>
        </Section>
    </Modal>
</template>
                
<style scoped>

</style>