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
import { BiographyFilter, EducationFilter, TextFilter } from '@/update/entities/Filter';
import SelectField from '../../fields/SelectField.vue';

const props = defineProps({
    filter: { type: EducationFilter, required: true },
    remove: { type: Function, required: true },
    close: { type: Function, required: true },
    title: { type: String, required: true }
});
</script>

<template>
    <Window :width="'50vw'" :index="2" :mask="true" :close="props.close" :header="props.title">

        <Body>

            <Section :isOpen="true" header="Равняется">
                <TextField label="Учебное учреждение:"
                    :disabled="props.filter.contains.educational_institution.length != 0"
                    v-model:value="props.filter.equals.educational_institution" />
                <SelectField :options="[]" label="Уровень образования:"
                    v-model:value="props.filter.equals.level_education" />
                <SelectField :options="[]" label="Место учёбы:"
                    v-model:value="props.filter.equals.location_educational_institution" />
            </Section>

            <Section :isOpen="true" header="Содержится">
                <TextField label="Учебное учреждение:"
                    :disabled="props.filter.equals.educational_institution.length != 0"
                    v-model:value="props.filter.contains.educational_institution" />
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