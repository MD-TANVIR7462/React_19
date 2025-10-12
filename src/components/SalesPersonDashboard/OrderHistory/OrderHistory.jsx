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
    <Card className="rounded-sm p-0">
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold text-foreground mb-4 ">Order History</h2>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="complete">Complete</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <div className="overflow-x-auto  h-[60dvh] max-h-[1000px] overflow-y-auto">
              <table className="w-full ">
                <thead>
                  <tr className="border-b bg-gray-50  border-border">
                    <th className="text-left py-4 px-2 text-md font-medium text-muted-foreground border ">Order NO</th>
                    <th className="text-left py-4 px-2 text-md font-medium text-muted-foreground border ">
                      Customer Name
                    </th>
                    <th className="text-left py-4 px-2 text-md font-medium text-muted-foreground border ">Terms</th>
                    <th className="text-left py-4 px-2 text-md font-medium text-muted-foreground border ">Total</th>
                    <th className="text-left py-4 px-2 text-md font-medium text-muted-foreground border ">Date</th>
                    <th className="text-left py-4 px-2 text-md font-medium text-muted-foreground border ">Action</th>
                    <th className="text-left py-4 px-2 text-md font-medium text-muted-foreground border ">Views</th>
                  </tr>
                </thead>
                <tbody>
                  {filterOrders(activeTab).map((order) => (
                    <tr key={order.id} className="border-b border-border last:border-0">
                      <td className="py-2 px-2 text-sm text-foreground border">{order.id}</td>
                      <td className="py-2 px-2 border">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="text-sm font-medium text-foreground">Tajul Islam</p>
                            <p className="text-xs text-muted-foreground">Hillview</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-2 text-sm text-foreground border">1/2 Cash-1/2P/D 30</td>
                      <td className="py-2 px-2 border">${order.price.toFixed(2)}</td>
                      <td className="py-2 px-2 border">10/11/2025</td>
                      <td className="py-2 px-2 border">Edit</td>
                      <td className="py-2 px-2 border">View</td>
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
