import CategoriesHero from "../Components/CategoriesHero"
import CategoryFilters from "../Components/CategoryFilters"
import CategoryGrid from "../Components/CategoryGrid"
import Footer from "../Components/Footer"
import Navbar from "../Components/Navbar"
import NewsletterBanner from "../Components/NewsletterBanner"
import RequestBanner from "../Components/RequestBanner"
import ScrollToTop from "../Components/ScrollToTop"


const AllCategories = () => {
  return (
    <div>
      <Navbar />
        <CategoriesHero />
        <CategoryFilters />
        <CategoryGrid />
        <RequestBanner />
        <NewsletterBanner />
        <ScrollToTop />
      <Footer />
    </div>
  )
}

export default AllCategories
