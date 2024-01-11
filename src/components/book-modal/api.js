import AXIOS_API from "@/lib/axiosAPI";


export async function createReservation(startDate, endDate, listingId, daysDifference) {
   const { data, error } = await AXIOS_API.post('/reservation', { startDate, endDate, listingId, daysDifference })

  console.log(data, error)

  return data
}