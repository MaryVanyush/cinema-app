<template>
    <section class="conf-step">
        <header class="conf-step__header conf-step__header_opened">
            <h2 class="conf-step__title">Конфигурация залов</h2>
        </header>
        <div class="conf-step__wrapper">

            <p class="conf-step__paragraph">Выберите зал для конфигурации:</p>
            <ul class="conf-step__selectors-box">
                <template v-for="(item, index) in halls" :key="item.id">
                    <li>
                        <input type="radio"
                               class="conf-step__radio"
                               name="price_tab"
                               :value="item.id"
                               :checked="index===0 ? true: false"
                               @click="getActiveHall(item.id)">
                        <span class="conf-step__selector">{{ item.name }}</span>
                    </li>
                </template>
            </ul>

            <p class="conf-step__paragraph">Укажите количество рядов и максимальное количество кресел в ряду:</p>

            <form @submit.prevent="resizeHall(hall.id)">
                <div class="conf-step__legend">
                    <label class="conf-step__label">Рядов, шт
                        <input type="text"
                               class="conf-step__input"
                               placeholder="3"
                               v-model.number="hall.row"></label>
                    <span class="multiplier">x</span>
                    <label class="conf-step__label">Мест, шт
                        <input type="text"
                               class="conf-step__input"
                               placeholder="3"
                               v-model.number="hall.col"></label>
                </div>

                <fieldset class="conf-step__buttons text-left">
                    <input
                        type="submit"
                        class="conf-step__button conf-step__button-accent">
                </fieldset>
            </form>

            <p class="conf-step__paragraph">Теперь вы можете указать типы кресел на схеме зала:</p>
            <div class="conf-step__legend">

                <span class="conf-step__chair conf-step__chair_standart" @click="setTypeSeat(0)"></span> — обычные
                кресла
                <span class="conf-step__chair conf-step__chair_vip" @click="setTypeSeat(1)"></span> — VIP кресла
                <span class="conf-step__chair conf-step__chair_disabled" @click="setTypeSeat(2)"></span> —
                заблокированные (нет кресла)

                <p class="conf-step__hint">Чтобы изменить вид кресла, выберите какое кресло хотите добавить и кликните
                    на нужном месте<br>
                    Сейчас выбрано для изменения: {{ getTypeText(typeSeat) }}</p>
            </div>

            <div class="conf-step__hall">
                <div class="conf-step__hall-wrapper">
                    <template v-for="(item, indexRow) in hall.row" :key="indexRow">
                        <div class="conf-step__row">
                            <template v-for="(item, indexCol) in hall.col" :key="indexCol">
                                <span class="conf-step__chair"
                                      :id="indexRow*hall.col+(indexCol)+1"
                                      :class="getClassType(indexRow*hall.col+(indexCol))"
                                      @click.prevent="setSeatStatus((indexRow*hall.col+indexCol)+1, hall.id, typeSeat)">
                                </span>
                            </template>
                        </div>
                    </template>
                </div>
            </div>

        </div>
    </section>

</template>

<script setup>
import useHalls from '@/composables/halls'
import usePlaces from '@/composables/places'
import {useHallStore} from '/resources/js/store/hall'
import {onMounted, ref} from "vue";

const {halls} = useHallStore()
const {getHall, updateHall, hall} = useHalls()
const {getPlaces, updatePlace, places} = usePlaces()

const isOpenModal = ref(false)
const typeSeat = ref(0)

const modalToggle = () => {
    isOpenModal.value = !isOpenModal.value
}

const classMap = {
    '0': 'conf-step__chair_standart',
    '1': 'conf-step__chair_vip',
    '2': 'conf-step__chair_disabled',
}

const typeTextMap = {
    '0': 'Обычное кресло',
    '1': 'VIP кресло',
    '2': 'Нет кресла',
}

const getTypeText = (type) => {
    return typeTextMap[type]
}

const setTypeSeat = (type) => {
    typeSeat.value = type
}
const setSeatStatus = async (idSeat, hallID) => {
    let data = {
        'idSeat': idSeat,
        'hallId': hallID,
        'type':typeSeat.value
    }
    await updatePlace(data)
    await getPlaces(hallID)
}

const getClassType = (id) => {
   const place = places.value[id];

    if (!place || !place.status) return;

    return classMap[place.status];

}

const getActiveHall = async (id) => {
    await getHall(id)
    await getPlaces(hall.value.id)
}
const resizeHall = async (id) => {
    if (hall.value.row <= 0) {
        alert(`Значение не допустимо. Укажите корректное значение рядов!`)
        return
    }
    if (hall.value.col <= 0) {
        alert(`Значение не допустимо. Укажите корректное значение мест!`)
        return
    }
    if (hall.value.row === '' || hall.value.col === '') {
        alert(`Пустое значение не допустимо`)
        return
    }
    if (!id) {
        alert(`Выберите зал!`)
        return
    }
    if (!window.confirm('Внимание, при изменении размера зала - статусы мест сбросятся. Продолжить?')) {
        return
    }

    await updateHall(id, {...hall.value})
    await getHall(id)
    await getPlaces(hall.value.id)
}
</script>
