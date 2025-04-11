<template>
    <section class="conf-step">
        <header class="conf-step__header conf-step__header_opened">
            <h2 class="conf-step__title">Управление залами</h2>
        </header>
        <div class="conf-step__wrapper">
            <p class="conf-step__paragraph">Доступные залы:</p>
            <ul class="conf-step__list">
                <template v-for="item in halls" :key="item.id">
                    <li>{{ item.name }}
                        <button @click="deleteHall(item.id)" class="conf-step__button conf-step__button-trash"></button>
                    </li>
                </template>
            </ul>
            <button @click.prevent="modalShow" class="conf-step__button conf-step__button-accent">Создать зал
            </button>
        </div>

        <div class="popup" :class="{ active: isOpenModal }">
            <div class="popup__container">
                <div class="popup__content">
                    <div class="popup__header">
                        <h2 class="popup__title">
                            Добавление зала
                            <a class="popup__dismiss" @click.prevent="modalHide">
                                <img src="image/close.png" alt="Закрыть"></a>
                        </h2>
                    </div>
                    <div class="popup__wrapper">
                        <form @submit.prevent="saveHall">
                            <label class=" conf-step__label conf-step__label-fullsize" for="name">
                                Название зала
                                <input class="conf-step__input" type="text" placeholder="Например, &laquo;Зал 1&raquo;"
                                       v-model="form.name">
                                <div v-if="errors">
                                    <div v-for="(v, k) in errors" :key="k">
                                        <p v-for="error in v" :key="error">
                                            {{ error }}
                                        </p>
                                    </div>
                                </div>
                            </label>
                            <div class="conf-step__buttons text-center">
                                <input type="submit" value="Добавить зал"
                                       class="conf-step__button conf-step__button-accent">
                                <button @click.prevent="modalHide"
                                        class="conf-step__button conf-step__button-regular">Отменить
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </section>

</template>

<script setup>
import useHalls from '@/composables/halls'
import {useHallStore} from '/resources/js/store/hall'
import {ref, reactive, onMounted} from 'vue'

const isOpenModal = ref(false)
const form = reactive({name: ''})

const {errors, getHalls, destroyHall, storeHall} = useHalls()
const {halls} = useHallStore()

onMounted(async () => {
    await getHalls()
})

const deleteHall = async (id) => {
    if (!window.confirm('Вы точно хотите удалить?')) {
        return
    }
    await destroyHall(id)
    await getHalls()
}

const saveHall = async () => {
    await storeHall({...form})
    if (errors.value === '') {
        await getHalls()
        resetForm()
        modalHide()
    } else {
        return
    }
}
const modalShow = () => {
    isOpenModal.value = true
}
const modalHide = () => {
    isOpenModal.value = false
}
const resetForm = () => {
    form.name = ''
}
</script>

