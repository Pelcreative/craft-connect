

import FeaturedArtisans from '../Components/FeaturedArtisans'
import Footer from '../Components/Footer'
import Hero from '../Components/Herosection'
import HowItWorks from '../Components/HowItWorks'
import Newsletter from '../Components/Newsletter'
import PopularCategories from '../Components/PopularCategories'
import ScrollToTop from '../Components/ScrollToTop'
import Testimonials from '../Components/Testimonials'


const Homepage = () => {
  return (
    <div>
   
      <Hero />
      <ScrollToTop />
      <PopularCategories />
      <HowItWorks />
      <FeaturedArtisans />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default Homepage
