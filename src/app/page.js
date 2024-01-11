import sea from '../../public/assets/sea.jpg'
import hotel_image from '../../public/assets/hr_10.jpg'
import Hero from '@/components/hero/Hero'
import PopularLocations from '@/components/popular-locations/PopularLocations'
import BestHotels from '@/components/best-hotels/BestHotels'

export default function Home() {
  return (
    <div>
      <Hero
        image={sea}
        mainHeader={"Are you ready for an adventure?"}
        secondaryHeader={"Browse through the popular locations."}
      />
      <PopularLocations />
      <Hero
        image={hotel_image}
        mainHeader={"Get the best offer for your hotel!"}
        secondaryHeader={"Pick your desired place."}
      />
      <BestHotels />
    </div>
  )
}
