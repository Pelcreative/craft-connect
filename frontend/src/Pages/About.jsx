import AboutCTA from "../Components/AboutCTA"
import AboutHero from "../Components/AboutHero"
import Footer from "../Components/Footer"
import Navbar from "../Components/Navbar"
import OurStory from "../Components/OurStory"
import ScrollToTop from "../Components/ScrollToTop"
import WhatWeStandFor from "../Components/WhatWeStandFor"


const About = () => {
  return (
    <div>
      <Navbar />
      <AboutHero />
      <OurStory />
      <WhatWeStandFor />
      <AboutCTA />
      <ScrollToTop />
      <Footer />
    </div>
  )
}

export default About
