<script lang="ts">
import { defineComponent } from 'vue'
import Text from '../fields/Text.vue';
import Form from '../form/Form.vue';
import Modal from '../window/Modal.vue';
import BiographyFilter from '../../entities/filter/biographyFilter'

export default defineComponent({
    props: {
        title: {
            type: String,
            required: true
        },
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
    components: { Modal, Form, Text }
})
</script>
                
<template>
    <Modal :close="close" :save="save" v-if="isOpen" :title="title">
        <Form title="Содержит">
            <Text label="Текст:"></Text>
        </Form>
        <Form title="Равно">
            <Text label="Текст:"></Text>
        </Form>
    </Modal>
</template>
                
<style scoped>

</style>