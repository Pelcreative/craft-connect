
import CustomerDashboard from "../Components/CustomerDashboard"
import CustomerSidebar from "../Components/CustomerSidebar"
import DashboardNavbar from "../Components/DashboardNavbar"
import ScrollToTop from "../Components/ScrollToTop"


const Customerpage = () => {
  return (
    <div>
      <CustomerSidebar />
      <DashboardNavbar />
      <CustomerDashboard />
      <ScrollToTop />

    </div>
  )
}

export default Customerpage
