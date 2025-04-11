import {ref} from 'vue'
import axios from 'axios'

export default function useSessions() {

    const errors = ref('')
    const sessions = ref([])
    const session = ref([])

    const getSessions = async () => {
        let response = await axios.get('/api/session')
        sessions.value = response.data.data
    }

    const getFilteredSessions = async (datetime,type) => {
        let response = await axios.get('/api/session', { params: {'filter[datetime]': datetime, 'type':type} })
        sessions.value = response.data
    }

    const getSession = async (id) => {
        let response = await axios.get(`/api/session/${id}`)
        session.value = response.data.data
    }

    const storeSession = async (data) => {
        errors.value = ''
        try {
            let response = await axios.post('/api/session', data)
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }

    const updateSession = async (id, data) => {
        errors.value = ''
        try {
            await axios.patch(`/api/session/${id}`, data)
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }

    const destroySession = async (id) => {
        await axios.delete(`/api/session/${id}`)
    }

    return {
        getSessions,
        getSession,
        storeSession,
        updateSession,
        destroySession,
        getFilteredSessions,
        errors,
        sessions,
        session
    }
}
