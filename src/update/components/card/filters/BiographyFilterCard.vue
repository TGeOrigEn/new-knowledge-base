<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';

import ButtonGroup from '../../buttons/ButtonGroup.vue';
import TextField from '../../fields/TextField.vue';
import Footer from '../../windows/Footer.vue';
import Button from '../../buttons/Button.vue';
import Window from '../../windows/Window.vue';
import Body from '../../windows/Body.vue';
import Section from '../../Section.vue';
import { BiographyFilter } from '@/update/entities/Filter';
import SelectField from '../../fields/SelectField.vue';

const props = defineProps({
    filter: { type: BiographyFilter, required: true },
    remove: { type: Function, required: true },
    close: { type: Function, required: true },
    title: { type: String, required: true }
});

const religionOptions = ref(["Православное", "Римско-католическое", "Евангельско-лютеранское", "Иное"]);
</script>

<template>
    <Window :width="'50vw'" :index="2" :mask="true" :close="props.close" :header="props.title">

        <Body>

            <Section :isOpen="true" header="Равняется">
                <TextField label="Имя:" :disabled="props.filter.contains.name.length != 0"
                    v-model:value="props.filter.equals.name" />
                <TextField label="Фамилия:" :disabled="props.filter.contains.surname.length != 0"
                    v-model:value="props.filter.equals.surname" />
                <TextField label="Отчество:" :disabled="props.filter.contains.patronymic.length != 0"
                    v-model:value="props.filter.equals.patronymic" />
                <TextField label="Дата рождения:" :disabled="props.filter.contains.date_birth.length != 0"
                    v-model:value="props.filter.equals.date_birth" />
                <SelectField :options="religionOptions" label="Вероисповедание:"
                    v-model:value="props.filter.equals.religion" />
                <TextField label="Происхождение:" :disabled="props.filter.contains.origin.length != 0"
                    v-model:value="props.filter.equals.origin" />
            </Section>

            <Section :isOpen="true" header="Содержится">
                <TextField label="Имя:" :disabled="props.filter.equals.name.length != 0"
                    v-model:value="props.filter.contains.name" />
                <TextField label="Фамилия:" :disabled="props.filter.equals.surname.length != 0"
                    v-model:value="props.filter.contains.surname" />
                <TextField label="Отчество:" :disabled="props.filter.equals.patronymic.length != 0"
                    v-model:value="props.filter.contains.patronymic" />
                <TextField label="Дата рождения:" :disabled="props.filter.equals.date_birth.length != 0"
                    v-model:value="props.filter.contains.date_birth" />
                <TextField label="Происхождение:" :disabled="props.filter.equals.origin.length != 0"
                    v-model:value="props.filter.contains.origin" />
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