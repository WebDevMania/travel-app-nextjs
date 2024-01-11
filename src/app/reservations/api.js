import AXIOS_API from "@/lib/axiosAPI";


export async function getUserReservations() {
    const { data } = await AXIOS_API.get(`/reservation`)

    return data
}

export async function deleteReservation(id) {
    const { data } = await AXIOS_API.delete(`/reservation/${id}`)

    return data
}