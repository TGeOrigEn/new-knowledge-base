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
import { PlaceFilter, TextFilter } from '@/update/entities/Filter';

const props = defineProps({
    filter: { type: PlaceFilter, required: true },
    remove: { type: Function, required: true },
    close: { type: Function, required: true },
    title: { type: String, required: true }
});
</script>

<template>
    <Window :width="'50vw'" :index="2" :mask="true" :close="props.close" :header="props.title">

        <Body>

            <Section :isOpen="true" header="Равняется">
                <TextField label="Описание:" :disabled="props.filter.contains.description.length != 0"
                    v-model:value="props.filter.equals.description" />
                <TextField label="Название:" :disabled="props.filter.contains.name.length != 0"
                    v-model:value="props.filter.equals.name" />
            </Section>

            <Section :isOpen="true" header="Содержится">
                <TextField label="Описание:" :disabled="props.filter.equals.description.length != 0"
                    v-model:value="props.filter.contains.description" />
                <TextField label="Название:" :disabled="props.filter.equals.name.length != 0"
                    v-model:value="props.filter.contains.name" />
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