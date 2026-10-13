import { useNavigate } from "react-router-dom"
import CategoriesHero from "../Components/CategoriesHero"
import CategoryFilters from "../Components/CategoryFilters"
import CategoryGrid from "../Components/CategoryGrid"
import Footer from "../Components/Footer"
import Navbar from "../Components/Navbar"
import NewsletterBanner from "../Components/NewsletterBanner"
import RequestBanner from "../Components/RequestBanner"
import ScrollToTop from "../Components/ScrollToTop"


const AllCategories = () => {
  const navigate = useNavigate()

  return (
    <div>
      <Navbar />
        <CategoriesHero />
        <CategoryFilters />
        <CategoryGrid
          onCategoryClick={(category) =>
            navigate(`/artisans?category=${encodeURIComponent(category.slug)}`)
          }
        />
        <RequestBanner />
        <NewsletterBanner />
        <ScrollToTop />
      <Footer />
    </div>
  )
}

export default AllCategories
