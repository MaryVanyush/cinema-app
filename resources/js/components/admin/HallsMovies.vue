<template>
    <section class="conf-step">
        <header class="conf-step__header conf-step__header_opened">
            <h2 class="conf-step__title">Сетка сеансов</h2>
        </header>
        <div class="conf-step__wrapper">
            <p class="conf-step__paragraph">
                <button @click.prevent="modalAddFilmToggle" class="conf-step__button conf-step__button-accent">Добавить
                    фильм
                </button>
                <button @click.prevent="modalSessionToggle" class="conf-step__button conf-step__button-accent">Добавить
                    сеанс
                </button>
            </p>
            <div class="conf-step__movies">
                <template v-for="item in films" :key="item.id">
                    <div class="conf-step__movie" @click="deleteFilm(item.id)">
                        <h3 class="conf-step__movie-title">{{ item.name }}</h3>
                        <p class="conf-step__movie-duration">{{ item.duration }}</p>
                    </div>
                </template>
            </div>

            <div class="conf-step__seances">
                <label class="conf-step__label conf-step__label-fullsize" style="margin-top:20px;">
                    Дата сеансов:
                    <input
                        type="date"
                        class="conf-step__input"
                        v-model="filterDate"
                        @change="filterSessions"
                    />
                </label>

                <template v-for="item in sessions">
                    <div class="conf-step__seances-hall">
                        <h3 class="conf-step__seances-title">{{ item.hallName }}</h3>
                        <div class="conf-step__seances-timeline">
                            <template v-for="item in item.data">
                                <div class="conf-step__seances-movie"
                                     style="background-color: rgb(133, 255, 137);"
                                     :style="{ 'width': getWidthFilm(item.duration)  + 'px',
                                            'left': getCoordinatesFilm(item.datetime) + 'px'}"
                                >
                                    <p class="conf-step__seances-movie-title">{{ item.film }}</p>
                                    <p class="conf-step__seances-movie-start">{{ getTime(item.datetime) }}</p>
                                </div>
                            </template>

                        </div>
                    </div>
                </template>


            </div>

            <!--<fieldset class="conf-step__buttons text-center">
                <button class="conf-step__button conf-step__button-regular">Отмена</button>
                <input type="submit" value="Сохранить" class="conf-step__button conf-step__button-accent">
            </fieldset>-->
        </div>
    </section>

    <div class="popup" :class="{ active: isOpenAddFilmModal }">
        <div class="popup__container">
            <div class="popup__content">
                <div class="popup__header">
                    <h2 class="popup__title">
                        Добавление фильма
                        <a @click.prevent="modalAddFilmToggle" class="popup__dismiss" href="#">
                            <img src="i/close.png" alt="Закрыть"></a>
                    </h2>
                </div>
                <div class="popup__wrapper">
                    <form @submit.prevent="saveFilm">
                        <label class="conf-step__label conf-step__label-fullsize" for="name">
                            Название фильма
                            <input v-model="formAddFilm.name" class="conf-step__input" type="text"
                                   placeholder="Например, &laquo;Гражданин Кейн&raquo;" required>
                        </label>
                        <label class="conf-step__label conf-step__label-fullsize" for="duration">
                            Продолжительность фильма
                            <input v-model="formAddFilm.duration" class="conf-step__input" type="text"
                                   placeholder="Например, &laquo;86&raquo;" name="duration">
                        </label>
                        <label class="conf-step__label conf-step__label-fullsize" for="name">
                            Описание фильма
                            <textarea v-model="formAddFilm.description" class="conf-step__input" type="text"
                                      placeholder="Например, &laquo;Гражданин Кейн был бравым офицером и т.д и тп.&raquo;"
                                      required></textarea>
                        </label>
                        <label class="conf-step__label conf-step__label-fullsize" for="name">
                            Страна
                            <input v-model="formAddFilm.country" class="conf-step__input" type="text"
                                   placeholder="Например, &laquo;Индия&raquo;" required>
                        </label>

                        <div class="conf-step__buttons text-center">
                            <input type="submit" value="Добавить фильм"
                                   class="conf-step__button conf-step__button-accent">
                            <button @click.prevent="modalAddFilmToggle"
                                    class="conf-step__button conf-step__button-regular">Отменить
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <div class="popup" :class="{ active: isOpenSessionModal }">
        <div class="popup__container">
            <div class="popup__content">
                <div class="popup__header">
                    <h2 class="popup__title">
                        Добавление сеанса
                        <a class="popup__dismiss" @click.prevent="modalSessionToggle" href="#">
                            <img src="i/close.png"
                                 alt="Закрыть"
                                 id="showTimePopupDismiss"></a>
                    </h2>
                </div>
                <div class="popup__wrapper">
                    <form @submit.prevent="saveSession">

                        <label class="conf-step__label conf-step__label-fullsize">
                            Название зала
                            <select v-model="formAddSession.hallId"
                                    class="conf-step__input">
                                <template v-for="item in halls" :key="item.id">
                                    <option :value="item.id">{{ item.name }}</option>
                                </template>
                            </select>
                        </label>

                        <label class="conf-step__label conf-step__label-fullsize">
                            Дата и время
                            <input
                                type="datetime-local"
                                class="conf-step__input"
                                v-model="formAddSession.datetime"
                            />
                        </label>

                        <label class="conf-step__label conf-step__label-fullsize">
                            Название фильма
                            <select v-model="formAddSession.filmId"
                                    class="conf-step__input">
                                <template v-for="item in films" :key="item.id">
                                    <option :value="item.id">{{ item.name }}</option>
                                </template>
                            </select>
                        </label>

                        <div class="conf-step__buttons text-center">
                            <input type="submit" value="Добавить" class="conf-step__button conf-step__button-accent">
                            <button @click.prevent="modalSessionToggle"
                                    class="conf-step__button conf-step__button-regular">Отменить
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import useFilms from '@/composables/films'
import useSessions from '@/composables/sessions'
import {useHallStore} from '/resources/js/store/hall'

const {halls} = useHallStore()
const {errors, films, getFilms, destroyFilm, storeFilm} = useFilms()
const {sessions, storeSession, getFilteredSessions} = useSessions()

const formAddFilm = reactive({name: '', duration: '', description: '', country: ''})
const formAddSession = reactive({datetime: '', hallId: '', filmId: '',})

const filterDate = ref(new Date().toISOString().slice(0, 10))

onMounted(async () => {
    await getFilms()
    await filterSessions()
})

const filterSessions = async () => {
    await getFilteredSessions(filterDate.value)
}

const getCoordinatesFilm = (time) => {
    let timeN = new Date(time)
    let coordinates = 30 * (timeN.getHours() + (timeN.getMinutes() / 60));
    return coordinates
}

const getTime = (datetime) => {
    let timeN = new Date(datetime)
    return addZero(timeN.getHours()) + ':' + addZero(timeN.getMinutes())
}

const getWidthFilm = (duration) => {
    return duration * 1
}

const saveSession = async () => {
    await storeSession({...formAddSession})
    if (errors.value === '') {
        await getFilteredSessions(filterDate.value)
        resetForm()
        modalSessionToggle()

    } else {
        return
    }
}
const addZero = (time) => {
    if (time < 10) {
        time = "0" + time
    }
    return time
}

const saveFilm = async () => {
    await storeFilm({...formAddFilm})
    if (errors.value === '') {
        await getFilms()
        resetForm()
        modalAddFilmToggle()
    } else {
        return
    }
}

const deleteFilm = async (id) => {
    if (!window.confirm('Вы точно хотите удалить?')) {
        return
    }
    await destroyFilm(id)
    getFilms()
}

const isOpenAddFilmModal = ref(false)
const isOpenSessionModal = ref(false)

const modalAddFilmToggle = () => {
    isOpenAddFilmModal.value = !isOpenAddFilmModal.value
}
const modalSessionToggle = () => {
    isOpenSessionModal.value = !isOpenSessionModal.value
}

const resetForm = () => {
    formAddFilm.name = '',
        formAddFilm.description = '',
        formAddFilm.country = '',
        formAddFilm.duration = '',
        formAddFilm.datetime = '',
        formAddFilm.hall_id = '',
        formAddFilm.film_id = ''
}
</script>
