<script lang="ts">
import { defineComponent } from 'vue'
import Select from './fields/Select.vue';
import Text from './fields/Text.vue';
import Form from './form/Form.vue';
import Modal from './window/Modal.vue';
import ActivityFilter from './../entities/filter/activityFilter'
import TextArea from './fields/TextArea.vue';
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
    components: { Modal, Form, Text, Select, TextArea, ButtonGroupe, Item }
})
</script>
                
<template>
    <Modal :close="show" :save="save" v-if="isOpen" :title="title">
        <Form title="Биография">
            <Text :readonly="true" v-model:value="value" label="Фамилия:"></Text>
            <Text label="Имя:"></Text>
            <Text label="Отчество:"></Text>
            <Text label="Дата рождения:"></Text>
            <Text label="Вероисповедание:"></Text>
            <Text label="Происхождение:"></Text>
        </Form>
        <Form title="Образование">
            <Text label="Уровень образования:"></Text>
            <Text label="Учебное учреждение:"></Text>
            <Text label="Место учёбы:"></Text>
        </Form>
        <Form title="Личная информация">
            <TextArea label="Имущество:"></TextArea>
            <TextArea label="Награды:"></TextArea>
            <TextArea label="Жалование:"></TextArea>
            <TextArea label="Семейное положение:"></TextArea>
            <TextArea label="Разное:"></TextArea>
        </Form>
        <Form title="Карьера">
            <Text label="Дата начала:"></Text>
            <Text label="Дата окончания:"></Text>
            <Text label="Должность:"></Text>
            <Text label="Место:"></Text>
            <ButtonGroupe></ButtonGroupe>
            <Item label="Благотворительность; Россия, г. Омск; Давал деньги всем нуждающимся"></Item>
            <Item label="Благотворительность; Россия, г. Омск; Давал деньги всем нуждающимся"></Item>
            <Item label="Благотворительность; Россия, г. Омск; Давал деньги всем нуждающимся"></Item>
        </Form>
        <Form title="Чин">
            <Text label="Дата начала:"></Text>
            <Text label="Дата окончания:"></Text>
            <Text label="Класс:"></Text>
            <Text label="Название:"></Text>
            <ButtonGroupe></ButtonGroupe>
            <Item label="Благотворительность; Россия, г. Омск; Давал деньги всем нуждающимся"></Item>
            <Item label="Благотворительность; Россия, г. Омск; Давал деньги всем нуждающимся"></Item>
            <Item label="Благотворительность; Россия, г. Омск; Давал деньги всем нуждающимся"></Item>
        </Form>
        <Form title="Деятельность">
            <Text label="Название:"></Text>
            <Text label="Место:"></Text>
            <Text label="Описание:"></Text>
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