<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';

import { Command, FullPerson, Link, Person, Place, Rank } from '../../entities/DataBase';

import TextAreaField from '../fields/TextAreaField.vue';
import ButtonGroup from '../buttons/ButtonGroup.vue';
import TextField from '../fields/TextField.vue';
import Footer from '../windows/Footer.vue';
import Button from '../buttons/Button.vue';
import Window from '../windows/Window.vue';
import Body from '../windows/Body.vue';
import Section from '../Section.vue';
import DropdownField from '../fields/dropdown/DropdownField.vue';
import Item from '../fields/list/Item.vue';
import List from '../fields/list/List.vue';
import PersonCard from './PersonCard.vue';

const props = defineProps({
    id: { type: Number, required: true },
    close: { type: Function, required: true },
    readonly: { type: Boolean, required: true },
    person: { type: Array<FullPerson>, required: true }
});

const place = ref<Place>({ ...Place.instance(), id: props.id });

const man = ref<Array<FullPerson>>([]);

const mask = ref(true);

const card = ref({
    id: - 1
});

const beforeMount = onBeforeMount(() => {
    Command.select<Place>(Place.NAME, { id: props.id }).then(response => {
        if (response == undefined) return;
        if (response.length == 0) return;
        place.value = response[0];
    });
    props.person.forEach(item => {
        item.activity.forEach(activity => {
            if (activity.place.map(place => place.id).includes(props.id) && !man.value.map(man => man.person.id).includes(item.person.id))
                man.value.push(item);
        });
    });
});

function remove() {
    Command.delete<Link>(Link.NAME, localStorage.getItem('token')!, { place_id: place.value.id }).then(() => {
        Command.delete<Place>(Place.NAME, localStorage.getItem('token')!, { id: place.value.id }).then(() => {
            props.close();
        })
    });
};

function save() {
    Command.update<Place>(Place.NAME, localStorage.getItem('token')!, place.value.id, place.value).then(response => {
        if (response == undefined) return;
        place.value = response;
    });
};
</script>

<template>
    <PersonCard v-if="!mask" :readonly="readonly" :id="card.id" :close="() => mask = true">
    </PersonCard>

    <Window :width="'50vw'" :index="2" :mask="mask" :close="props.close" header="???????????????? ??????????">

        <Body>

            <Section :isOpen="true" header="??????????">
                <TextAreaField label="????????????????:" :readonly="readonly" v-model:value="place.name" />
                <TextAreaField label="????????????????:" :readonly="readonly" v-model:value="place.description" />
                <TextField label="????????????:" :readonly="readonly" v-model:value="place.latitude" />
                <TextField label="??????????????:" :readonly="readonly" v-model:value="place.longitude" />
            </Section>

            <Section :isOpen="true" header="????????????????">
                <DropdownField label="????????????????:" :readonly="readonly">
                    <List>
                        <Item :readonly="readonly" v-for="item in man"
                            :text="`${item.person.surname} ${item.person.name} ${item.person.patronymic}`"
                            :open="() => { card.id = item.person.id; mask = false; }" />
                    </List>
                </DropdownField>
            </Section>
        </Body>

        <Footer v-if="!readonly">
            <ButtonGroup :right="true">
                <Button class="x-button" text="??????????????" :onClick="remove"></Button>
            </ButtonGroup>
            <ButtonGroup :left="true">
                <Button class="x-button" text="??????????????????" :onClick="save"></Button>
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