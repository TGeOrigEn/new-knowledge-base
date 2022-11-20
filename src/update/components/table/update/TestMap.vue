<script setup lang="ts">
import { ref, onBeforeMount, onUpdated } from "vue";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import type { FullPerson, Place } from "@/update/entities/DataBase";
import MarkerCard from "../../card/MarkerCard.vue";

const props = defineProps({
    person: { type: Array<FullPerson>, required: true },
    readonly: { type: Boolean, required: true }
});

const place = ref<Array<Place>>([]);

const card = ref({
    displayed: false,
    id: -1
});

const beforeMount = onBeforeMount(() => {
    place.value = [];
    props.person.forEach(person => {
        person.activity.forEach(activity => {
            activity.place.forEach(item => {
                if (!place.value.map(place => place.id).includes(item.id))
                    place.value.push(item);
            });
        });
    });
});

const update = onUpdated(() => {
    place.value = [];
    props.person.forEach(person => {
        person.activity.forEach(activity => {
            activity.place.forEach(item => {
                if (!place.value.map(place => place.id).includes(item.id))
                    place.value.push(item);
            });
        });
    });
});

</script>

<template>
    <MarkerCard v-if="card.displayed"  :readonly="readonly" :person="person" :id="card.id"
        :close="() => card.displayed = false"></MarkerCard>
    <l-map :minZoom="1" :maxZoom="19" :zoom="2" ref="map" style="width: calc(100vw - 100px); height:100vh; z-index: 0;">

        <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
        <l-marker v-for="marker in place" :onClick="() => { card.id = marker.id; card.displayed = true; }"
            :lat-lng="[marker.longitude, marker.latitude]">
        </l-marker>
    </l-map>
</template>

<style scoped>
.leaflet-popup-content>* {
    display: block !important;
}
</style>