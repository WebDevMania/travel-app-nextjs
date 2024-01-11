import AXIOS_API from "@/lib/axiosAPI"

export async function getFilteredListings(values) {

    const { data } = await AXIOS_API.get(`/listing/filter?location=${values.location}&min_price=${values.min_price}&max_price=${values.max_price}&type=${values.type}`)

    return data
}