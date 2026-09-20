import CategoriesHero from "../Components/CategoriesHero"
import CategoryFilters from "../Components/CategoryFilters"
import CategoryGrid from "../Components/CategoryGrid"
import Footer from "../Components/Footer"
import NewsletterBanner from "../Components/NewsletterBanner"
import RequestBanner from "../Components/RequestBanner"


const AllCategories = () => {
  return (
    <div>
        <CategoriesHero />
        <CategoryFilters />
        <CategoryGrid />
        <RequestBanner />
        <NewsletterBanner />
      <Footer />
    </div>
  )
}

export default AllCategories
