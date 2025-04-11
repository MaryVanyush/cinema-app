<template>
    <header class="page-header">
        <h1 class="page-header__title">Идём<span>в</span>кино</h1>
    </header>

    <main>
        <section class="ticket">

            <header class="tichet__check">
                <h2 class="ticket__check-title">Вы выбрали билеты:</h2>
            </header>

            <div class="ticket__info-wrapper" v-if="booking[0]">
                <p class="ticket__info">На фильм: <span
                    class="ticket__details ticket__title">{{ booking[0].data.film }}</span></p>
                <p class="ticket__info">Места: <span
                    class="ticket__details ticket__chairs">{{ getNumberSeats() }}</span></p>
                <p class="ticket__info">В зале: <span
                    class="ticket__details ticket__hall">{{ booking[0].data.hall }}</span></p>
                <p class="ticket__info">Начало сеанса: <span
                    class="ticket__details ticket__start">{{ booking[0].data.date }}</span></p>
                <p class="ticket__info">Стоимость: <span
                    class="ticket__details ticket__cost">{{ getSumPayment() }}</span> рублей</p>

                <button class="acceptin-button" @click.prevent="bookingSeat">Получить код бронирования</button>

                <p class="ticket__hint">После оплаты билет будет доступен в этом окне, а также придёт вам на почту.
                    Покажите QR-код нашему контроллёру у входа в зал.</p>
                <p class="ticket__hint">Приятного просмотра!</p>
            </div>
        </section>
    </main>
</template>

<script setup>
import {onMounted, ref} from "vue"
import usePlaces from '@/composables/places'

const {updatePlace} = usePlaces()

const booking = ref([])

const getNumberSeats = () => {
    let stringSeats = ''
    booking.value.forEach(function (item) {
        stringSeats += item.id + ','
    })
    return stringSeats.slice(0, -1)
}

const getSumPayment = () => {
    let sum = 0
    booking.value.forEach(function (item) {
        sum += Number(item.data.price)
    })
    return sum
}

const bookingSeat = () => {

    let data = {}
    booking.value.forEach(function (item) {
        console.log(item.data.hallID)
        data = {
            'idSeat': item.id,
            'hallId': Number(item.data.hallID),
            'type': '3',
            'hall':item.data.hall,
            'fill':item.data.film,
            'datetime':item.data.date
        }
        updatePlace(data)
        data = {}
    })
}

onMounted(() => {
    booking.value = JSON.parse(localStorage.getItem('booking'))
})
</script>

