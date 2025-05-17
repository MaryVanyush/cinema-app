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
        return sessions.value;
    }

    const getSession = async (id) => {
        let response = await axios.get(`/api/session/${id}`)
        session.value = response.data.data
    }

   const storeSession = async (data) => {
    errors.value = '';
    try {
        const dateOnly = data.datetime.split('T');
        const filteredSessions = await getFilteredSessions(dateOnly, data.type);

    if (filteredSessions.length > 0) {
        const newSessionStart = new Date(data.datetime);

        const isOverlapping = filteredSessions[0].data.some(session => {
            const existingSessionStart = new Date(session.datetime);
            const existingSessionEnd = new Date(existingSessionStart.getTime() + session.duration * 60000);

            return (newSessionStart >= existingSessionStart && newSessionStart < existingSessionEnd);
        });

        if (isOverlapping) {
            alert("Сеанс накладывается на уже существующий в этом зале.");
            return;
        }
    }

    let response = await axios.post('/api/session', data);

    } catch (e) {
        if (e.response) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors[key];
                }
            }
            if (e.response.status === 409) {
                alert("Сеанс уже существует в этом зале на указанное время.");
            }
        } else {
            console.error("Произошла ошибка:", e);
        }
    }
};

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
