import CustomerBooking from "../Components/CustomerBoooking"
import CustomerSidebar from "../Components/CustomerSidebar"
import DashboardNavbar from "../Components/DashboardNavbar"
import ScrollToTop from "../Components/ScrollToTop"


const Customerbookingpage = () => {
  return (
    <div>
      <CustomerSidebar />
      <DashboardNavbar />
      <CustomerBooking />
      <ScrollToTop />
    </div>
  )
}

export default Customerbookingpage
