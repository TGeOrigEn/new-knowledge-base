<script setup lang="ts">
import { ref, onBeforeMount, onUpdated } from 'vue';

import type { FullPerson, Place } from '../../entities/DataBase';

import MarkerCard from './MarkerCard.vue';
import ButtonGroup from '../buttons/ButtonGroup.vue';
import SelectField from '../fields/SelectField.vue';
import TextField from '../fields/TextField.vue';
import Footer from '../windows/Footer.vue';
import Button from '../buttons/Button.vue';
import Window from '../windows/Window.vue';
import Body from '../windows/Body.vue';
import TestMap from '../table/update/TestMap.vue';
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

const props = defineProps({
    person: { type: Array<FullPerson>, required: true },
    place: { type: Array<Place>, required: true },
    readonly: { type: Boolean, required: true },
    close: { type: Function, required: true },
});

const mask = ref(true);

const card = ref({
    displayed: false,
    id: -1
});
</script>

<template>
    <MarkerCard v-if="card.displayed" :readonly="readonly" :person="person" :id="card.id"
        :close="() => card.displayed = false"></MarkerCard>
    <Window :index="1" :mask="mask" :close="props.close" header="Карта">

        <Body>

            <l-map :minZoom="1" :maxZoom="19" :zoom="2" ref="map"
                style="width: calc(100vw - 100px); height: calc(-100px + 100vh); z-index: 0;">

                <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
                <l-marker v-for="marker in place" :onClick="() => { card.id = marker.id; card.displayed = true; }"
                    :lat-lng="[marker.longitude, marker.latitude]">
                </l-marker>
            </l-map>
        </Body>
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