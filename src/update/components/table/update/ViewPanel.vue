<script setup lang="ts">
import Button from '../../buttons/Button.vue';
import Search from '../../fields/viewPanel/Search.vue'
import Filter from '../../fields/viewPanel/Filter.vue'
import Item from '../../fields/list/Item.vue';
import List from '../../fields/list/List.vue';
import Dropdown from '../../fields/viewPanel/Dropdown.vue';
import { size } from '@/update/entities/table';
import { onMounted } from 'vue';


const mounted = onMounted(() => size());
</script>

<template>
    <div style="margin-top: 50px; background-color: blanchedalmond;">
        <div style="width: 1500px; margin-left: auto; margin-right: auto; display: flex; align-items: center;">
            <Button :src="'/plus.svg'" class="x-button"></Button>
            <Button :src="'/refresh.svg'" class="x-button"></Button>
            <Filter>
                <List>
                    <Item
                        v-for="item in ['Биография', 'Образование', 'Награды', 'Жалование', 'Имущество', 'Семейное положение']"
                        :text="item" :remove="() => { }" />
                </List>
                <Dropdown>
                    <Item v-for="item in ['Деятельность', 'Чин', 'Карьера']" :text="item" :width="'100%'" />
                </Dropdown>
            </Filter>
            <Search style="flex: 0.5; margin-left: auto;"></Search>
        </div>
        <div style="display: border-box; width: 1500px; margin-left: auto; margin-right: auto;">
            <table id="table-head" style="width: 100%;">
                <thead>
                    <tr>
                        <th><span>123</span></th>
                        <th><span>123</span></th>
                        <th><span>123</span></th>
                        <th><span>123</span></th>
                    </tr>
                </thead>
            </table>

            <table id="table-body" style="width: 100%;">
                <tbody>
                    <tr>
                        <td><span class="value">12zxcvzxcxzcasdasdasd3</span></td>
                        <td><span class="value">12zxcvzxcxzcasdasdasd3</span></td>
                        <td><span class="value">12zxcvzxsdasdasd3</span></td>
                        <td><span class="value">12zxcvzxcxzcasdasdasd3</span></td>
                    </tr>
                    <tr>
                        <td><span class="value">12zxcvzxcxzcasdasdasd3</span></td>
                        <td><span class="value">12zxcvzxcxzcasdasdasd3</span></td>
                        <td><span class="value">12zxcvzxcxzcasdasdasd3</span></td>
                        <td><span class="value">12zxcvzxcxzcasdasdasd3</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.x-button {
    width: 32px;
    height: 32px;
    padding: 5px;
    flex: 0 0 32px;
}

th {
    background-color: aqua;
}

td {
    background-color: royalblue;
}

td,
th {
    position: relative;
}

td span {
    min-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: inherit;
    display: block;
}

th span {
    min-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: inherit;
    display: block;
}

table {
    border: 1px solid black;
    border-collapse: separate;
    border-spacing: 0;
    max-height: 80vh !important;
    overflow-y: auto;
    text-align: center;
    table-layout: fixed;
    width: 100%;
}

table>tbody>tr>td:not(:last-child) {
    border-right: 1px solid black;
}

table>tbody>tr:not(:last-child)>td {
    border-bottom: 1px solid black;
}

table>thead>tr>th:not(:last-child) {
    border-right: 1px solid black;
}

table>thead>tr>th {
    border-bottom: 1px solid black;
}
</style>