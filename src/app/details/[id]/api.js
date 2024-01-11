import AXIOS_API from "@/lib/axiosAPI";

export async function getListingById(id) {
    const { data } = await AXIOS_API.get(`/listing/details/${id}`)

    return data
}

export async function getReviewsByListingId(id) {
    const { data } = await AXIOS_API.get(`/review/${id}`)

   return data
}

export async function postReview(id, body) {
    const { data } = await AXIOS_API.post(`/review?id=${id}`, body)

    return data
}