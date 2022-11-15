<script setup lang="ts">
import type Activity from '@/update/entities/tables/Activity';
import type Career from '@/update/entities/tables/Career';
import type Person from '@/update/entities/tables/Person';
import type Rank from '@/update/entities/tables/Rank';

import Header from './Header.vue';

const props = defineProps({
    activity: { type: Array<Activity>, required: true },
    person: { type: Array<Person>, required: true },
    career: { type: Array<Career>, required: true },
    rank: { type: Array<Rank>, required: true }
});
</script>

<template>
    <table>
        <thead>
            <tr>
            </tr>
        </thead>
    </table>
</template>

<style>

</style>