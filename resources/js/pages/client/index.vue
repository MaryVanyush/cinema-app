<template>
    <header class="page-header">
        <h1 class="page-header__title">Идём<span>в</span>кино</h1>
    </header>

    <nav class="page-nav">
        <label class="conf-step__label conf-step__label-fullsize" style="margin-top:20px;color:black">
            Дата сеансов:
            <input
                type="date"
                class="conf-step__input"
                v-model="filterDate"
                @change="filterSessions"
            />
        </label>
    </nav>

    <main>
        <template v-for="item in sessions">

            <section class="movie">
                <div class="movie__info" style="margin-bottom:30px">
                    <div class="movie__description" style="">
                        <h2 class="movie__title">{{ item.film }}</h2>
                        <p class="movie__synopsis">{{ item.description }}</p>
                        <p class="movie__data">
                            <span class="movie__data-duration">{{ item.duration }} минут</span>
                        </p>
                    </div>
                </div>
                <template v-for="item in item.halls">
                    <div class="movie-seances__hall">
                        <h3 class="movie-seances__hall-title">{{ item.hallName }}</h3>
                        <ul class="movie-seances__list">
                            <template v-for="item in item.dates">
                                <li class="movie-seances__time-block">
                                    <router-link :to="{ name: 'client.hall', params: { id: item.id} }"
                                                 class="movie-seances__time">
                                        {{ getTime(item.datetime) }}
                                    </router-link>
                                </li>
                            </template>
                        </ul>
                    </div>
                </template>

            </section>
        </template>

    </main>
</template>

<script setup>
import {onMounted, ref} from "vue";
import useSessions from "../../composables/sessions.js";

const {sessions, getFilteredSessions} = useSessions()
const filterDate = ref(new Date().toISOString().slice(0, 10))

const filterSessions = async () => {
    await getFilteredSessions(filterDate.value, 'client')
}

const getTime = (datetime) => {
    const date = new Date(datetime)
    return date.getHours() + ":" + date.getMinutes()
}

onMounted(async () => {
    await filterSessions()
})

</script>

<style scoped>

</style>
