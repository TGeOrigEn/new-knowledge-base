<script lang="ts">
import { defineComponent } from 'vue'
import Select from '../fields/Select.vue';
import Text from '../fields/Text.vue';
import Section from '../form/Section.vue';
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
    components: { Modal, Section, Text, Select }
})
</script>
                
<template>
    <Modal :close="close" :save="save" v-if="isOpen" title="Фильтрация столбца: Биография">
        <Section label="Содержит">
            <Text label="Фамилия:"></Text>
            <Text label="Имя:"></Text>
            <Text label="Отчество:"></Text>
            <Text label="Год рождения:"></Text>
        </Section>
        <Section label="Равно">
            <Text label="Фамилия:"></Text>
            <Text label="Имя:"></Text>
            <Text label="Отчество:"></Text>
            <Text label="Год рождения:"></Text>
            <Text label="Происхождение:"></Text>
            <Select label="Вероисповедание:" :options="options"></Select>
        </Section>
    </Modal>
</template>
                
<style scoped>

</style>