"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const demoInvoices = [
  {
    id: "1",
    invoiceNo: "INV-2024-001",
    customerName: "Chester",
    total: 450.0,
    deliveryStatus: "delivered",
    paymentStatus: "paid",
    datePurchased: "2024-01-15",
  },
  {
    id: "2",
    invoiceNo: "INV-2024-002",
    customerName: "Yousuf",
    total: 320.5,
    deliveryStatus: "shipped",
    paymentStatus: "partial",
    datePurchased: "2024-01-18",
  },
  {
    id: "3",
    invoiceNo: "INV-2024-003",
    customerName: "Lil Peep",
    total: 890.0,
    deliveryStatus: "pending",
    paymentStatus: "unpaid",
    datePurchased: "2024-01-20",
  },
  {
    id: "4",
    invoiceNo: "INV-2024-004",
    customerName: "Abu Sayed Abrar",
    total: 675.25,
    deliveryStatus: "delivered",
    paymentStatus: "paid",
    datePurchased: "2024-01-22",
  },
  {
    id: "5",
    invoiceNo: "INV-2024-005",
    customerName: "Newton and Nieves Traders",
    total: 1250.0,
    deliveryStatus: "shipped",
    paymentStatus: "paid",
    datePurchased: "2024-01-25",
  },
  {
    id: "6",
    invoiceNo: "INV-2024-006",
    customerName: "New York Home Decor",
    total: 540.75,
    deliveryStatus: "pending",
    paymentStatus: "unpaid",
    datePurchased: "2024-01-28",
  },
  {
    id: "12",
    invoiceNo: "INV-2025-001",
    customerName: "Chester",
    total: 450.0,
    deliveryStatus: "delivered",
    paymentStatus: "paid",
    datePurchased: "2025-01-15",
  },
  {
    id: "22",
    invoiceNo: "INV-2025-002",
    customerName: "Yousuf",
    total: 320.5,
    deliveryStatus: "shipped",
    paymentStatus: "partial",
    datePurchased: "2025-01-18",
  },
  {
    id: "31",
    invoiceNo: "INV-2025-003",
    customerName: "Lil Peep",
    total: 890.0,
    deliveryStatus: "pending",
    paymentStatus: "unpaid",
    datePurchased: "2025-01-20",
  },
  {
    id: "41",
    invoiceNo: "INV-2025-004",
    customerName: "Abu Sayed Abrar",
    total: 675.25,
    deliveryStatus: "delivered",
    paymentStatus: "paid",
    datePurchased: "2025-01-22",
  },
  {
    id: "52",
    invoiceNo: "INV-2025-005",
    customerName: "Newton and Nieves Traders",
    total: 1250.0,
    deliveryStatus: "shipped",
    paymentStatus: "paid",
    datePurchased: "2025-01-25",
  },
  {
    id: "63",
    invoiceNo: "INV-2025-006",
    customerName: "New York Home Decor",
    total: 540.75,
    deliveryStatus: "pending",
    paymentStatus: "unpaid",
    datePurchased: "2025-01-28",
  },
];

export default function InvoiceList() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInvoices = demoInvoices.filter(
    (invoice) =>
      invoice.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDeliveryBadge = (status) => {
    const config = {
      pending: "bg-yellow-100 text-yellow-800 border border-yellow-300",
      shipped: "bg-blue-100 text-blue-800 border border-blue-300",
      delivered: "bg-green-100 text-green-800 border border-green-300",
    };
    return (
      <Badge className={`text-xs font-medium px-2.5 py-0.5 rounded-md ${config[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getPaymentBadge = (status) => {
    const config = {
      unpaid: "bg-red-100 text-red-800 border border-red-300",
      partial: "bg-orange-100 text-orange-800 border border-orange-300",
      paid: "bg-emerald-100 text-emerald-800 border border-emerald-300",
    };
    return (
      <Badge className={`text-xs font-medium px-2.5 py-0.5 rounded-md ${config[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <Card className="rounded-md shadow-sm border">
      <CardContent className="p-4">
        {/* Search Bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search invoices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto h-[60dvh] max-h-[1000px] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-600 border">Invoice No</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 border">Customer Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 border">Total</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 border">Delivery Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 border">Payment Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 border">Date Purchased</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 border font-medium">{invoice.invoiceNo}</td>
                  <td className="py-3 px-4 border">{invoice.customerName}</td>
                  <td className="py-3 px-4 border text-gray-700">${invoice.total.toFixed(2)}</td>
                  <td className="py-3 px-4 border">{getDeliveryBadge(invoice.deliveryStatus)}</td>
                  <td className="py-3 px-4 border">{getPaymentBadge(invoice.paymentStatus)}</td>
                  <td className="py-3 px-4 border text-gray-500">
                    {new Date(invoice.datePurchased).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
