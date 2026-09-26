import Footer from "../Components/Footer"
import GettingStarted from "../Components/GettingStarted"
import Navbar from "../Components/Navbar"
import ScrollToTop from "../Components/ScrollToTop"
import VendorHero from "../Components/VendorHero"
import WhyJoin from "../Components/WhyJoin"


const Vendor = () => {
  return (
    <div>
      <Navbar />
      <VendorHero />
      <WhyJoin />
      <GettingStarted />
      <ScrollToTop />
      <Footer />
    </div>
  )
}

export default Vendor
