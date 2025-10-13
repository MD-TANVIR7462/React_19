import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
const demoOrders = [
  {
    id: "5431252",
    product: "Contrasting Sweatshirt",
    category: "Women, Clothing",
    price: 45.0,
    status: "pending",
  },
  {
    id: "5431253",
    product: "Faux-Leather Trousers",
    category: "Women, Clothing",
    price: 45.0,
    status: "delivered",
  },
  {
    id: "5431254",
    product: "V-Neck Knitted Top",
    category: "Women, Clothing",
    price: 45.0,
    status: "complete",
  },
  {
    id: "5431255",
    product: "Denim Jacket",
    category: "Women, Clothing",
    price: 65.0,
    status: "complete",
  },
  {
    id: "5431256",
    product: "Cotton T-Shirt",
    category: "Women, Clothing",
    price: 25.0,
    status: "pending",
  },
  {
    id: "5431257",
    product: "Floral Summer Dress",
    category: "Women, Clothing",
    price: 55.0,
    status: "canceled",
  },
  {
    id: "5431258",
    product: "Woolen Cardigan",
    category: "Women, Clothing",
    price: 60.0,
    status: "delivered",
  },
  {
    id: "5431259",
    product: "Classic Jeans",
    category: "Women, Clothing",
    price: 50.0,
    status: "pending",
  },
  {
    id: "5431257",
    product: "Floral Summer Dress",
    category: "Women, Clothing",
    price: 55.0,
    status: "canceled",
  },
  {
    id: "5431258",
    product: "Woolen Cardigan",
    category: "Women, Clothing",
    price: 60.0,
    status: "delivered",
  },
  {
    id: "5431259",
    product: "Classic Jeans",
    category: "Women, Clothing",
    price: 50.0,
    status: "pending",
  },
];

const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState("all");

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" },
      delivered: { label: "Delivery", className: "bg-blue-100 text-blue-800 hover:bg-blue-100" },
      complete: { label: "Completed", className: "bg-green-100 text-green-800 hover:bg-green-100" },
      canceled: { label: "Canceled", className: "bg-red-100 text-red-800 hover:bg-red-100" },
    };
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const filterOrders = (status) => {
    if (status === "all") return demoOrders;
    return demoOrders.filter((order) => order.status === status);
  };

  return (
    <Card className="rounded-sm p-0 shadow-sm border">
      <CardContent className="p-2 md:p-4">
        <h2 className="text-xl font-semibold text-foreground mb-4">Order History</h2>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab Buttons */}
          <TabsList className="mb-4 flex whitespace-nowrap t sm:gap-2 overflow-x-auto w-full rounded-sm px-2">
            <TabsTrigger value="all"       className="text-xs sm:text-sm cursor-pointer rounded-sm">All Orders</TabsTrigger>
            <TabsTrigger value="pending"   className="text-xs sm:text-sm cursor-pointer rounded-sm">Pending</TabsTrigger>
            <TabsTrigger value="delivered" className="text-xs sm:text-sm cursor-pointer rounded-sm" >Delivered</TabsTrigger>
            <TabsTrigger value="complete"  className="text-xs sm:text-sm cursor-pointer rounded-sm">Complete</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            {/* Responsive Table Wrapper */}
            <div className="overflow-x-auto max-w-full h-[60dvh] max-h-[1000px] lg:w-[70dvw] xl:w-full ">
              <table className="min-w-full border-collapse text-sm text-foreground">
                <thead className="bg-gray-100 border-b ">
                  <tr>
                    <th className="py-3 px-4 text-left font-medium text-muted-foreground border whitespace-nowrap">
                      Order No
                    </th>
                    <th className="py-3 px-4 text-left font-medium text-muted-foreground border whitespace-nowrap">
                      Customer Name
                    </th>
                    <th className="py-3 px-4 text-left font-medium text-muted-foreground border whitespace-nowrap">
                      Terms
                    </th>
                    <th className="py-3 px-4 text-left font-medium text-muted-foreground border whitespace-nowrap">
                      Total
                    </th>
                    <th className="py-3 px-4 text-left font-medium text-muted-foreground border whitespace-nowrap">
                      Date
                    </th>
                    <th className="py-3 px-4 text-left font-medium text-muted-foreground border whitespace-nowrap">
                      Action
                    </th>
                    <th className="py-3 px-4 text-left font-medium text-muted-foreground border whitespace-nowrap">
                      Views
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filterOrders(activeTab).map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 border whitespace-nowrap">{order.id}</td>
                      <td className="py-3 px-4 border whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="min-w-[100px]">
                            <p className="text-sm font-medium truncate max-w-[140px]">Tajul Islam</p>
                            <p className="text-xs text-muted-foreground truncate max-w-[140px]">Hillview</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 border whitespace-nowrap">1/2 Cash - 1/2 P/D 30</td>
                      <td className="py-3 px-4 border whitespace-nowrap">${order.price.toFixed(2)}</td>
                      <td className="py-3 px-4 border whitespace-nowrap">10/11/2025</td>
                      <td className="py-3 px-4 border whitespace-nowrap text-primary cursor-pointer hover:underline">
                        Edit
                      </td>
                      <td className="py-3 px-4 border whitespace-nowrap text-blue-600 cursor-pointer hover:underline">
                        View
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
export default OrderHistory;
