<script lang="ts">
import { defineComponent } from 'vue'
import SelectField from '../fields/Select.vue';
import Text from '../fields/Text.vue';
import Section from '../form/Section.vue';
import Modal from '../window/Modal.vue';
import RankFilter from '../../entities/filter/rankFilter'

export default defineComponent({
    props: {
        title: {
            type: String,
            required: true
        },
        isOpen: Boolean,
        close: Function,
        save: Function,
        data: RankFilter
    },
    data() {
        return {
            optionsLevel: ["Любое", "Нет образования", "Начальное образование", "Домашнее образование", "Среднее образование", "Среднее военное образование", "Высшее образование", "Высшее военное образование"],
            optionsPlace: ["Любое", "Неизвестно", "Европейская часть", "Сибирь"]
        }
    },
    components: { Modal, Section, Text, SelectField }
})
</script>
                
<template>
    <Modal :close="close" :save="save" v-if="isOpen" :title="title">
        <Section label="Содержит">
            <Text label="Дата начала:"></Text>
            <Text label="Дата окончания:"></Text>
            <Text label="Место:"></Text>
        </Section>
        <Section label="Равно">
            <Text label="Дата начала:"></Text>
            <Text label="Дата окончания:"></Text>
            <SelectField :options="optionsLevel" label="Степень:"></SelectField>
            <Text label="Место:"></Text>
        </Section>
    </Modal>
</template>
                
<style scoped>

</style>