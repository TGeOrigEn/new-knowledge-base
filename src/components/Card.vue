<script lang="ts">
import { defineComponent } from 'vue'
import SelectField from './fields/SelectField.vue';
import TextField from './fields/TextField.vue';
import Form from './form/Form.vue';
import Modal from './window/Modal.vue';
import ActivityFilter from './../entities/filter/activityFilter'
import TextAreaField from './fields/TextAreaField.vue';
import ButtonGroupe from './button/ButtonGroupe.vue';
import Item from './form/Item.vue';

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
    components: { Modal, Form, TextField, SelectField, TextAreaField, ButtonGroupe, Item }
})
</script>
                
<template>
    <Modal :close="show" :save="save" v-if="isOpen" :title="title">
        <Form title="Биография">
            <TextField :readonly="true" v-model:value="value" label="Фамилия:"></TextField>
            <TextField label="Имя:"></TextField>
            <TextField label="Отчество:"></TextField>
            <TextField label="Дата рождения:"></TextField>
            <TextField label="Вероисповедание:"></TextField>
            <TextField label="Происхождение:"></TextField>
        </Form>
        <Form title="Образование">
            <TextField label="Уровень образования:"></TextField>
            <TextField label="Учебное учреждение:"></TextField>
            <TextField label="Место учёбы:"></TextField>
        </Form>
        <Form title="Личная информация">
            <TextAreaField label="Имущество:"></TextAreaField>
            <TextAreaField label="Награды:"></TextAreaField>
            <TextAreaField label="Жалование:"></TextAreaField>
            <TextAreaField label="Семейное положение:"></TextAreaField>
            <TextAreaField label="Разное:"></TextAreaField>
        </Form>
        <Form title="Карьера">
            <TextField label="Дата начала:"></TextField>
            <TextField label="Дата окончания:"></TextField>
            <TextField label="Должность:"></TextField>
            <TextField label="Место:"></TextField>
            <ButtonGroupe></ButtonGroupe>
            <Item label="Благотворительность; Россия, г. Омск; Давал деньги всем нуждающимся"></Item>
            <Item label="Благотворительность; Россия, г. Омск; Давал деньги всем нуждающимся"></Item>
            <Item label="Благотворительность; Россия, г. Омск; Давал деньги всем нуждающимся"></Item>
        </Form>
        <Form title="Чин">
            <TextField label="Дата начала:"></TextField>
            <TextField label="Дата окончания:"></TextField>
            <TextField label="Класс:"></TextField>
            <TextField label="Название:"></TextField>
            <ButtonGroupe></ButtonGroupe>
            <Item label="Благотворительность; Россия, г. Омск; Давал деньги всем нуждающимся"></Item>
            <Item label="Благотворительность; Россия, г. Омск; Давал деньги всем нуждающимся"></Item>
            <Item label="Благотворительность; Россия, г. Омск; Давал деньги всем нуждающимся"></Item>
        </Form>
        <Form title="Деятельность">
            <TextField label="Название:"></TextField>
            <TextField label="Место:"></TextField>
            <TextAreaField label="Описание:"></TextAreaField>
            <ButtonGroupe></ButtonGroupe>
            <Item
                label="Благотворительность; Россия, г. Омск; Давал деньги всем нуждающимся 1233333333333333333333333333333333333">
            </Item>
            <Item label="Благотворительность; Россия, г. Омск; Давал деньги всем нуждающимся"></Item>
            <Item label="Благотворительность; Россия, г. Омск; Давал деньги всем нуждающимся"></Item>
        </Form>
    </Modal>
</template>
                
<style scoped>

</style>