<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';

import { Command, FullPerson, Link, Person, Place, Rank } from '../../../entities/DataBase';

import TextAreaField from '../../fields/TextAreaField.vue';
import ButtonGroup from '../../buttons/ButtonGroup.vue';
import TextField from '../../fields/TextField.vue';
import Footer from '../../windows/Footer.vue';
import Button from '../../buttons/Button.vue';
import Window from '../../windows/Window.vue';
import Body from '../../windows/Body.vue';
import Section from '../../Section.vue';
import DropdownField from '../../fields/dropdown/DropdownField.vue';
import Item from '../../fields/list/Item.vue';
import List from '../../fields/list/List.vue';
import PersonCard from '../PersonCard.vue';
import { BiographyFilter, CareerFilter, EducationFilter, TextFilter } from '@/update/entities/Filter';
import SelectField from '../../fields/SelectField.vue';

const props = defineProps({
    filter: { type: CareerFilter, required: true },
    remove: { type: Function, required: true },
    close: { type: Function, required: true },
    title: { type: String, required: true }
});

const options = ref([
    "Главное управление Западной Сибири",
    "Тобольская губерния",
    "Томская губерния",
    "Акмолинская область",
    "Семипалатинская область",
    "Семиреченская область",
    "Степное генерал-губернаторство",
    "Туркестанское генерал-губернаторство",
    "Европейская Россия",
    "Восточная сибирь"]);
</script>

<template>
    <Window :width="'50vw'" :index="2" :mask="true" :close="props.close" :header="props.title">

        <Body>

            <Section :isOpen="true" header="Равняется">
                <TextField label="Должность:" :disabled="props.filter.contains.post.length != 0"
                    v-model:value="props.filter.equals.post" />
                <TextField label="Дата начала:" :type="'date'" v-model:value="props.filter.equals.start_date" />
                <TextField label="Дата окончания:" :type="'date'" v-model:value="props.filter.equals.end_date" />
                <SelectField :options="options" label="Место:" v-model:value="props.filter.equals.start_date" />
            </Section>

            <Section :isOpen="true" header="Содержится">
                <TextField label="Должность:" :disabled="props.filter.equals.post.length != 0"
                    v-model:value="props.filter.contains.post" />
            </Section>
        </Body>

        <Footer>
            <ButtonGroup :right="true">
                <Button class="x-button" text="Удалить" :onClick="props.remove"></Button>
            </ButtonGroup>
        </Footer>

    </Window>
</template>

<style scoped>
.x-button {
    height: 32px;
}

.x-dody {
    display: table;
}
</style>