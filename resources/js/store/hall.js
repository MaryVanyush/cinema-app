import {ref} from 'vue'

const halls = ref([])
const hall = ref([])
const activeHall = ref(0)

export const useHallStore = () => {

    const setHalls = (data) => {
        halls.value = data
    }

    const setHall = (data) => {
        hall.value = data
    }

    const setActiveHall = (data) => {
        activeHall.value = data
    }

    return {
        activeHall,
        halls,
        hall,
        setActiveHall,
        setHalls,
        setHall
    }
};

