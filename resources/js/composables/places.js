import {ref} from 'vue'
import axios from 'axios'

export default function usePlaces() {

    const errors = ref('')
    const places = ref([])

    const getPlaces = async (id) => {
        let response = await axios.get(`/api/place`,{params:{'hallID':id}})
        places.value = response.data.data
    }

    const updatePlace = async (data) => {
        errors.value = ''
        try {
            await axios.patch(`/api/place/${data.idSeat}`, data)
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }

    return {
        places,
        errors,
        getPlaces,
        updatePlace,
    }
}
