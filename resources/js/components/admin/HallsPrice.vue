<template>
    <section class="conf-step">
        <header class="conf-step__header conf-step__header_opened">
            <h2 class="conf-step__title">Конфигурация цен</h2>
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

            <p class="">Установите цены для типов кресел:</p>
            <form @submit.prevent="saveHall(hall.id)">
                <div class="conf-step__legend">
                    <label class="conf-step__label">Цена, рублей
                        <input v-model="hall.price"
                               type="text"
                               class="conf-step__input"
                               placeholder="0">
                    </label>
                    за <span class="conf-step__chair conf-step__chair_standart"></span> обычные кресла
                </div>
                <div class="conf-step__legend">
                    <label class="conf-step__label">Цена, рублей
                        <input v-model="hall.vip_price"
                               type="text"
                               class="conf-step__input"
                               placeholder="0">
                    </label>
                    за <span class="conf-step__chair conf-step__chair_vip"></span> VIP кресла
                </div>

                <fieldset class="conf-step__buttons text-center">
                    <button class="conf-step__button conf-step__button-regular">Отмена</button>
                    <input type="submit" value="Сохранить" class="conf-step__button conf-step__button-accent">
                </fieldset>
            </form>
        </div>
    </section>
</template>

<script setup>
import useHalls from '@/composables/halls'
import {useHallStore} from '/resources/js/store/hall'

const {halls, hall} = useHallStore()
const {getHall, updateHall} = useHalls()

const getActiveHall = async (id) => {
    await getHall(id)
}

const saveHall = async (id) => {
    
    if (!id) {
        alert(`Выберите зал!`)
        return
    }

    if (hall.value.price <= 0) {
        alert(`Значение не допустимо! Укажите корректное значение цены за обычные кресла!`)
        return
    }
    if (hall.value.vip_price <= 0) {
        alert(`Значение не допустимо! Укажите корректное значение цены за VIP кресла!`)
        return
    }
    if (hall.value.price === '' || hall.value.vip_price === '') {
        alert(`Цена не указана!`)
        return
    }


    console.log({...hall.value})
    await updateHall(id, {...hall.value})
    await getHall(id)
}

</script>

