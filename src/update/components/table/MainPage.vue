<script setup lang="ts">
import Button from '../buttons/Button.vue';
import AuthorizationCard from '../card/AuthorizationCard.vue';
import AlertCard from '../card/AlertCard.vue';
import router from '@/update/entities/router';
import { Command } from '@/update/entities/DataBase';
import { ref } from 'vue';

const displayed = ref({
    title: "",
    activityFilter: false,
    biographyFilter: false,
    careerFilter: false,
    educationFilter: false,
    rankFilter: false,
    textFilterState: false,
    placeFilter: false,
    authorizationCard: false,
    alertCard: false,
    remove: () => { },
    close: () => { }
});

function exitFromAccount() {
    localStorage.setItem('token', '');
    displayed.value.alertCard = false;
}

async function openAccountWindow() {
    if (await Command.verified())
        displayed.value.alertCard = true;
    else displayed.value.authorizationCard = true;
}
</script>

<template>
    <div style="box-sizing: border-box; width: 100%; height: 100vh; background-image: url('/hero.png');">

        <AlertCard v-if="displayed.alertCard" :message="'Вы действительнно хотите выйти из аккаунта?'" :mask="true"
            :close="() => displayed.alertCard = false" :exit="exitFromAccount">
        </AlertCard>

        <AuthorizationCard v-if="displayed.authorizationCard" :close="() => displayed.authorizationCard = false">
        </AuthorizationCard>

        <div style="padding: 5px; z-index: -1000; background-color: #f0f0f0;">
            <div class="nav">
                <router-link :to="'/table'"><Button style="height: 30px; padding: 5px;" :text="'База знаний'"></Button>
                </router-link>
                <div style=" margin-left: auto;">

                    <Button :src="'/info.svg'" class="x-button-def"
                        style=" padding: 5px; width: 30px; height: 30px;"></Button>
                    <Button :src="'/user.svg'" :onClick="openAccountWindow" class="x-button-def"
                        style="width: 30px; height: 30px;"></Button>
                </div>
            </div>
        </div>

        <div
            style="display: flex; align-items: center; justify-content: center; width: 100%; height: 92.65vh; background-repeat: no-repeat; background-size:cover;">
            <div
                style="display: flex; flex-direction: column; background-color: rgba(240, 240, 240, 0.85); height: 75vh; width: 90vw;">
                <h1
                    style="font-size: 47px; text-align: center; font-weight: bold; letter-spacing: 5px; padding: 50px; margin-left: 120px; margin-right: 120px;">
                    УПРАВЛЕНЧЕСКАЯ ЭЛИТА ЗАПАДНО-СИБИРСКОГО И СТЕПНОГО ГЕНЕРАЛ-ГУБЕРНАТОРСТВ
                </H1>
                <div style="display: flex; flex-direction: row;">

                    <h2
                        style="width: 500px; font-size: 18px; font-weight: bold; line-height: 2; text-align: center; padding-left: 200px; padding-right: 100px ;">
                        База данных чиновничества и
                        управленческой элиты Западно-Сибирского и Степного
                        генерал-губернаторств
                        (вторая половина XIX — начало XX века) создана при финансовой поддержке Российского фонда
                        фундаментальных исследований в рамках реализации научного проекта №20-39-90024.
                        База данных содержит информацию о чиновниках, проходивших службу в Западно-Сибирском и Степном
                        генерал-губернаторствах в период с 70-х гг. XIX века и до 1905-х гг.</h2>

                    <ul style=" font-weight: bold; font-size: 20px; line-height: 2;">Информация о чиновниках получена из
                        справочников, адресных книг,<br> формулярных списков и иных служебных документов, найденных в
                        архивах:
                        <li style="padding-top: 2.5vh;">Российский государственный исторический архив (г.
                            Санкт-Петербург)</li>
                        <li>Отдел рукописей Российской национальной библиотеки (г. Санкт-Петербург)</li>
                        <li>Отдел рукописей Российской государственной библиотеки (г. Москва)</li>
                        <li>Центральный государственный архив Республики Казахстан (г. Алма-Аты,<br> Республика
                            Казахстан)
                        </li>
                        <li>Исторический архив Омской области (г. Омск)</li>
                    </ul>
                </div>
                <div style="padding-top: 40px;">
                    <div style="text-align: center; padding-top: 20px; font-size: 18px; font-weight: 400;">База
                        знаний создана с
                        использованием
                        open source продуктов с лицензией MIT: PostgreSQL,
                        Node, Vue, Express.</div>
                    <div style="text-align: center; padding-top: 10px; font-size: 18px; font-weight: 400;">Адрес
                        электронной почты для
                        связи с
                        автором проекта: <u>elizaveta-mihailenko@mail.ru</u>
                    </div>
                </div>
            </div>
        </div>

        <!-- <h1 style="font-size: 32px;">Управленческая элита Западно-сибирского и Степного генерал-губернаторств</H1>
        <div class="description">
            <h2>База данных чиновничества и управленческой элиты Западно-Сибирского и Степного генерал-губернаторств
                (вторая половина XIX — начало XX века) создана при финансовой поддержке Российского фонда
                фундаментальных исследований в рамках реализации научного проекта №20-39-90024.
                База данных содержит информацию о чиновниках, проходивших службу в Западно-Сибирском и Степном
                генерал-губернаторствах в период с 70-х гг. XIX века и до 1905-х гг.</h2>
            <ul>Информация о чиновниках получена из
                справочников, адресных книг, формулярных списков и иных служебных документов, найденных в архивах:
                <li style="padding-top: 2.5vh;">Российский государственный исторический архив (г. Санкт-Петербург)</li>
                <li>Отдел рукописей Российской национальной библиотеки (г. Санкт-Петербург)</li>
                <li>Отдел рукописей Российской государственной библиотеки (г. Москва)</li>
                <li>Центральный государственный архив Республики Казахстан (г. Алма-Аты, Республика Казахстан)</li>
                <li>Исторический архив Омской области (г. Омск)</li>
            </ul>
            <div style="display: flex;
    align-items: center;
    justify-content: center;">
                <Button :text="'Перейти к базе знаний'"></Button>
            </div>
            <div style="padding-top: 100px;">
                <div style="text-align: center; padding-top: 20px; font-size: 18px;">База знаний создана с
                    использованием
                    исключительно open source продуктов с лицензией MIT: PostgreSQL,
                    Node, Vue, Express.</div>
                <div style="text-align: center; padding-top: 20px; font-size: 18px;">Адрес электронной почты для связи с
                    автором проекта:
                    elizaveta-mihailenko@mail.ru</div>
            </div>
        </div> -->
    </div>
</template>

<style scoped>
ul {
    list-style: none;
}

ul li:before {
    content: "—";
    position: relative;
    left: -5px;
}

ul>li {
    font-weight: bold;
}

.nav {
    align-items: center;
    display: flex;
    flex-direction: row;
    margin: 10px;
}

.x-button-def {
    width: 32px;
    height: 32px;
    padding: 5px;
    flex: 0 0 32px;
}
</style>
