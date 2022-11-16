<script lang="ts">
import { defineComponent } from 'vue'
import Select from './fields/Select.vue';
import Text from './fields/Text.vue';
import Section from './form/Section.vue';
import Modal from './window/Modal.vue';
import ActivityFilter from './../entities/filter/activityFilter'
import TextArea from './fields/TextArea.vue';
import ButtonGroupe from './button/ButtonGroupe.vue';
import Item from './form/Item.vue';
import Items from './fields/Items.vue';
import ListField from '@/update/components/fields/list/ListField.vue';
import SelectField from '@/update/components/fields/SelectField.vue';

export default defineComponent({
    props: {
        title: {
            type: String,
            required: true
        },
        isOpen: Boolean,
        close: Function,
        save: Function,
        data: ActivityFilter
    },
    data() {
        return {
            optionsLevel: ["Любое", "Нет образования", "Начальное образование", "Домашнее образование", "Среднее образование", "Среднее военное образование", "Высшее образование", "Высшее военное образование"],
            optionsPlace: ["Любое", "Неизвестно", "Европейская часть", "Сибирь"],
            value: "123"
        }
    },
    methods: {
        show() {
            console.log(this.value);
        }
    },
    components: { Modal, Section, Text, Select, TextArea, ButtonGroupe, Item, Items, ListField, SelectField }
})
</script>
                
<template>
    <Modal :close="show" :save="save" v-if="isOpen" :title="title">
        <Section label="Биография">
            <Text v-model:value="value" label="Фамилия:"></Text>
            <ListField label="Имя:" :value="optionsLevel"></ListField>
            <SelectField label="Отчество:" :options="optionsLevel"></SelectField>
            <Text label="Дата рождения:"></Text>
            <Text label="Вероисповедание:"></Text>
            <Text label="Происхождение:"></Text>
        </Section>
        <Section label="Образование">
            <Text label="Уровень образования:"></Text>
            <Text label="Учебное учреждение:"></Text>
            <Text label="Место учёбы:"></Text>
        </Section>
        <Section label="Личная информация">
            <TextArea label="Имущество:"></TextArea>
            <TextArea label="Награды:"></TextArea>
            <TextArea label="Жалование:"></TextArea>
            <TextArea label="Семейное положение:"></TextArea>
            <TextArea label="Разное:"></TextArea>
        </Section>
        <Section label="Карьера">
            <Text label="Дата начала:"></Text>
            <Text label="Дата окончания:"></Text>
            <Text label="Должность:"></Text>
            <Text label="Место:"></Text>
            <ButtonGroupe></ButtonGroupe>
            <Item label="Благотворительность; Россия, г. Омск; Давал деньги всем нуждающимся"></Item>
            <Item label="Благотворительность; Россия, г. Омск; Давал деньги всем нуждающимся"></Item>
            <Item label="Благотворительность; Россия, г. Омск; Давал деньги всем нуждающимся"></Item>
        </Section>
        <Section label="Чин">
            <Text label="Дата начала:"></Text>
            <Text label="Дата окончания:"></Text>
            <Text label="Класс:"></Text>
            <Text label="Название:"></Text>
            <ButtonGroupe></ButtonGroupe>
            <Item label="Благотворительность; Россия, г. Омск; Давал деньги всем нуждающимся"></Item>
            <Item label="Благотворительность; Россия, г. Омск; Давал деньги всем нуждающимся"></Item>
            <Item label="Благотворительность; Россия, г. Омск; Давал деньги всем нуждающимся"></Item>
        </Section>
        <Section label="Деятельность">
            <Text label="Название:"></Text>
            <Text label="Место:"></Text>
            <Text label="Описание:"></Text>
            <ButtonGroupe></ButtonGroupe>
            <Item
                label="Благотворительность; Россия, г. Омск; Давал деньги всем нуждающимся 1233333333333333333333333333333333333">
            </Item>
            <Item label="Благотворительность; Россия, г. Омск; Давал деньги всем нуждающимся"></Item>
            <Item label="Благотворительность; Россия, г. Омск; Давал деньги всем нуждающимся"></Item>
        </Section>
    </Modal>
</template>
                
<style scoped>

</style>