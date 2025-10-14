import SalesPersonDashboardStats from "@/components/SalesPersonDashboard/DashboardStates/DashboardStates";
import { CustomerList } from "@/pages/SalesPersonDashboard/CustomerList";
import InvoiceList from "@/pages/SalesPersonDashboard/InvoiceList";
import OrderHistory from "@/pages/SalesPersonDashboard/OrderHistory";
import { SalesManProfile } from "@/pages/SalesPersonDashboard/SalesManProfile";

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
