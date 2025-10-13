
import { CustomerList } from "@/components/SalesPersonDashboard/CustomerList/CustomerList";
import SalesPersonDashboardStats from "@/components/SalesPersonDashboard/DashboardStates/DashboardStates";
import InvoiceList from "@/components/SalesPersonDashboard/Invoice/InvoiceList";
import OrderHistory from "@/components/SalesPersonDashboard/OrderHistory/OrderHistory";
import { SalesManProfile } from "@/components/SalesPersonDashboard/Profile/SalesManProfile";

export const SalesPersonRoutePaths = [
  {
    index: true,
    element: <SalesPersonDashboardStats />,
  },
  {
    path: "/salesman-dashboard/salesorders",
    element: <OrderHistory />,
  },
  {
    path: "/salesman-dashboard/invoices",
    element: <InvoiceList />,
  },
  {
    path: "/salesman-dashboard/cutomers",
    element: <CustomerList />,
  },
  {
    path: "/salesman-dashboard/profile",
    element: <SalesManProfile />,
  },
];
