<template>
    <header class="page-header">
        <h1 class="page-header__title">Идём<span>в</span>кино</h1>
    </header>

    <main>
        <section class="buying" v-if="session.hall && places">
            <div class="buying__info">
                <div class="buying__info-description">
                    <h2 class="buying__info-title">{{ session.film }}</h2>
                    <p class="buying__info-start">Начало сеанса: {{ session.datetime }}</p>
                    <p class="buying__info-hall">{{ session.hall.name }}</p>
                </div>
                <div class="buying__info-hint">
                    <p>Тапните дважды,<br>чтобы увеличить</p>
                </div>
            </div>
            <div class="buying-scheme">
                <div class="buying-scheme__wrapper">
                    <template v-for="(item, indexRow) in session.hall.row" :key="indexRow">
                        <div class="buying-scheme__row">
                            <template v-for="(item, indexCol) in session.hall.col" :key="indexCol">
                                <span class="buying-scheme__chair"
                                      :class="[getClassType(indexRow*session.hall.col+(indexCol))]"
                                      :data-price="getPriceSeat(indexRow*session.hall.col+(indexCol))"
                                      :data-seat="indexRow*session.hall.col+(indexCol)+1"
                                      :data-id="indexRow*session.hall.col+(indexCol)+1"
                                      :data-hall="session.hall.name"
                                      :data-film="session.film"
                                      :data-date="session.datetime"
                                      :data-hallid="session.hall.id"
                                      :data-isActive="isActive"
                                      @click="setBooking">
                                </span>
                            </template>
                        </div>
                    </template>
                </div>
                <div class="buying-scheme__legend">
                    <div class="col">
                        <p class="buying-scheme__legend-price"><span
                            class="buying-scheme__chair buying-scheme__chair_standart"></span> Свободно (<span
                            class="buying-scheme__legend-value">{{session.hall.price}}</span>руб)</p>
                        <p class="buying-scheme__legend-price"><span
                            class="buying-scheme__chair buying-scheme__chair_vip"></span> Свободно VIP (<span
                            class="buying-scheme__legend-value">{{session.hall.vip_price}}</span>руб)</p>
                    </div>
                    <div class="col">
                        <p class="buying-scheme__legend-price"><span
                            class="buying-scheme__chair buying-scheme__chair_taken"></span> Занято</p>
                        <p class="buying-scheme__legend-price"><span
                            class="buying-scheme__chair buying-scheme__chair_selected"></span> Выбрано</p>
                    </div>
                </div>
            </div>

            <button @click="nextPage" class='acceptin-button'>Забронировать</button>

        </section>
    </main>
</template>

<script setup>
import usePlaces from '@/composables/places'
import useSessions from '@/composables/sessions'

import {onMounted, ref} from "vue"
import router from "../../router/index.js"

const props = defineProps({
    id: {required: true}
})

const {getPlaces, places} = usePlaces()
const {session, getSession} = useSessions()

const isActive = ref(false)
const booking = ref([])

const classMap = {
    '0': 'buying-scheme__chair_standart',
    '1': 'buying-scheme__chair_vip',
    '2': 'buying-scheme__chair_disabled',
    '3': 'buying-scheme__chair_taken',
}

const getClassType = (id) => {
    return classMap[places.value[id].status]
}

const getPriceSeat = (id) => {

    let price = 0

    if (places.value[id].status === '0') {
        price = session.value.hall.price
    }
    if (places.value[id].status === '1') {
        price = session.value.hall.vip_price
    }
    return price

}

const setBooking = (event) => {

    const {seat, price, id, film, hall, date, hallid} = event.target.dataset

    if (event.target.classList.contains('buying-scheme__chair_disabled') ||
        event.target.classList.contains('buying-scheme__chair_taken')) {
        return false
    }

    if (event.target.getAttribute('data-isactive') === 'false') {
        event.target.setAttribute('data-isactive', true)
    console.log(hallid)
        booking.value.push({
            'id': id,
            'data': {
                'hall': hall,
                'hallID':hallid,
                'film': film,
                'date': date,
                'price': price,
                'seat': seat,
            }
        })

        event.target.classList.toggle('buying-scheme__chair_selected')
        localStorage.setItem('booking', JSON.stringify(booking.value))

    } else {
        event.target.setAttribute('data-isactive', false)
        event.target.classList.toggle('buying-scheme__chair_selected')
        booking.value = booking.value.filter((item) => item.id !== event.target.getAttribute('data-id'))
        localStorage.setItem('booking', JSON.stringify(booking.value))
    }

}
const nextPage = () => {
    if (!localStorage.booking){
        alert('Выберите нужные места')
        return
    } else {
        router.push('/payment')
    }
}

onMounted(async () => {
    localStorage.clear()
    await getSession(props.id)
    await getPlaces(session.value.hall.id)
})
</script>

