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
import { TextFilter } from '@/update/entities/Filter';

const props = defineProps({
    filter: { type: TextFilter, required: true },
    remove: { type: Function, required: true },
    close: { type: Function, required: true },
    title: { type: String, required: true }
});
</script>

<template>
    <Window :width="'50vw'" :index="2" :mask="true" :close="props.close" :header="props.title">

        <Body>

            <Section :isOpen="true" header="Равняется">
                <TextField label="Текст:" :disabled="props.filter.contains.length != 0"
                    v-model:value="props.filter.equals" />
            </Section>

            <Section :isOpen="true" header="Содержится">
                <TextField label="Текст:" :disabled="props.filter.equals.length != 0"
                    v-model:value="props.filter.contains" />
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