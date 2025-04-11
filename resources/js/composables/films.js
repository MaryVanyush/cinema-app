import {ref} from 'vue'
import axios from 'axios'

export default function useFilms() {

    const errors = ref('')
    const films = ref([])
    const film = ref([])


    const getFilms = async () => {
        let response = await axios.get('/api/film')
        films.value = response.data.data
    }

    const getFilm = async (id) => {
        let response = await axios.get(`/api/film/${id}`)
        film.value = response.data.data
    }

    const storeFilm = async (data) => {
        errors.value = ''
        try {
            let response = await axios.post('/api/film', data)
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }

    const updateFilm = async (id, data) => {
        errors.value = ''
        try {
            await axios.patch(`/api/film/${id}`, data)
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }

    const destroyFilm = async (id) => {
        await axios.delete(`/api/film/${id}`)
    }

    return {
        getFilms,
        getFilm,
        destroyFilm,
        updateFilm,
        storeFilm,
        films,
        film,
        errors
    }
}
