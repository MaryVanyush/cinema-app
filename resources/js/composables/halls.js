import {ref} from 'vue'
import axios from 'axios'
import {useHallStore} from '/resources/js/store/hall'

export default function useHalls() {

    const {setHalls, setHall, setActiveHall} = useHallStore()

    const errors = ref('')
    const hall = ref([])

    const getHalls = async () => {
        let response = await axios.get('/api/hall')
        await setHalls(response.data.data)
    }

    const getHall = async (id) => {
        let response = await axios.get(`/api/hall/${id}`)
        setHall(response.data.data)
        hall.value = response.data.data
    }

    const storeHall = async (data) => {
        errors.value = ''
        try {
            let response = await axios.post('/api/hall', data)
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }

    const updateHall = async (id, data) => {
        errors.value = ''
        try {
            await axios.patch(`/api/hall/${id}`, data)
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }

    const destroyHall = async (id) => {
        await axios.delete(`/api/hall/${id}`)
    }

    return {
        hall,
        errors,
        getHalls,
        getHall,
        storeHall,
        updateHall,
        destroyHall,
    }
}
