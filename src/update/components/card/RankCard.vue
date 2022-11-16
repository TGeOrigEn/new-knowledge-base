<script setup lang="ts">
import Rank from '../../entities/tables/Rank';

import ButtonGroup from '../buttons/ButtonGroup.vue';
import Window from '../windows/Window.vue';
import Body from '../windows/Body.vue';
import Footer from '../windows/Footer.vue';
import Button from '../buttons/Button.vue';
import Section from '../Section.vue';
import AlertCard from './AlertCard.vue';
import SelectField from '../fields/SelectField.vue';
import TextField from '../fields/TextField.vue';
import { ref, onBeforeMount } from 'vue';

const props = defineProps({
    rank: { type: Rank, required: true, default: Rank.EMPTY },
    remove: { type: Function },
    close: { type: Function, required: true },
    index: { type: Number, default: 2 },
    readonly: Boolean,
    width: String,
    mask: Boolean
});

const options = ref(["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV"]);

const data = ref({
    rank: props.rank,
    mask: props.mask
});

const show = ref(false);

function check() {
    if (JSON.stringify(props.rank) !== JSON.stringify(data.value.rank)) {
        show.value = true;
        data.value.mask = false;
    } else props.close();
}
</script>

<template>

    <AlertCard v-if="show" :close="() => { show = false; data.mask = true; }" :mask="show" :save="() => { }"
        :accept="close" :message="'Вы не сохранили карточку.\n Закрыть карточку?'">
    </AlertCard>

    <Window :index="index" :width="width" :mask="mask" :close="check" header="Карточка чина">

        <Body style="width: 100%; display: table;">
            <TextField label="Название:" v-model:value="data.rank.name" :readonly="readonly" />
            <TextField label="Дата начала:" v-model:value="data.rank.start_date" :readonly="readonly" :type="'date'" />
            <TextField label="Дата окончания:" v-model:value="data.rank.end_date" :readonly="readonly" :type="'date'" />
            <SelectField label="Степень:" v-model:value="data.rank.degree" :disabled="readonly" :options="options" />
        </Body>
        <Footer v-if="!readonly" style="height: 42px;">
            <ButtonGroup :right="true">
                <Button v-if="rank.id != 0" :onClick="remove" text="Удалить" style="height: 32px;" />
            </ButtonGroup>
            <ButtonGroup :right="false">
                <Button :onClick="save" text="Сохранить" style="height: 32px; " />
            </ButtonGroup>
        </Footer>
    </Window>
</template>

<style>

</style>