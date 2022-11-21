<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';

import { Command, Career } from '../../entities/DataBase';

import ButtonGroup from '../buttons/ButtonGroup.vue';
import SelectField from '../fields/SelectField.vue';
import TextField from '../fields/TextField.vue';
import Window from '../windows/Window.vue';
import Footer from '../windows/Footer.vue';
import Button from '../buttons/Button.vue';
import Body from '../windows/Body.vue';

const props = defineProps({
    close: { type: Function, required: true },
});

const login = ref("");
const password = ref("");

async function logIn() {
    const token = await Command.login(login.value, password.value);
    console.log(token);
    localStorage.setItem('token', token);
    if (token.trim() !== "") props.close();
};

const verified = ref(false);

const mounted = onBeforeMount(async () => { verified.value = await Command.verified(); if (verified.value) localStorage.setItem('token', ''); });
</script>

<template>
    <Window :index="4" :mask="true" :width="'300px'" :close="props.close" header="Авторизация">

        <Body class="x-body">
            <TextField label="Логин:" v-model:value="login" />
            <TextField label="Пароль:" type="password" v-model:value="password" />
        </Body>

        <Footer>
            <ButtonGroup :left="true">
                <Button class="x-button" text="Авторизоваться" :onClick="logIn"></Button>
            </ButtonGroup>
        </Footer>

    </Window>
</template>

<style scoped>
.x-button {
    height: 32px;
}

.x-body {
    display: table;
}
</style>