import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Pencil } from "lucide-react";
import { CustomerDialog } from "./CustomerModal";

const demoCustomers = [
  {
    id: "1",
    code: "06794",
    name: "Chester",
    email: "chester@example.com",
    phone: "(555) 123-4567",
    terms: "1/2 Cash-1/2P/D 30",
    state: "NY",
    address: "123 Main St, New York, NY 10001",
  },
  {
    id: "2",
    code: "06791",
    name: "Yousuf",
    email: "yousuf@example.com",
    phone: "(555) 234-5678",
    terms: "1/2 Cash-1/2P/D30",
    state: "NY",
    address: "456 Oak Ave, New York, NY 10002",
  },
  {
    id: "3",
    code: "06786",
    name: "Lil Peep",
    email: "lilpeep@example.com",
    phone: "(555) 345-6789",
    terms: "1/2 Cash-1/2P/D 30",
    state: "CA",
    address: "789 Pine Rd, Los Angeles, CA 90001",
  },
  {
    id: "4",
    code: "06778",
    name: "Abu Sayed Abrar",
    email: "abrar@example.com",
    phone: "(555) 456-7890",
    terms: "N/A",
    state: "NY",
    address: "321 Elm St, New York, NY 10004",
  },
  {
    id: "5",
    code: "06771",
    name: "Newton and Nieves Traders",
    email: "newton@example.com",
    phone: "(555) 567-8901",
    terms: "1/2 Cash-1/2P/D45",
    state: "TX",
    address: "654 Maple Dr, Dallas, TX 75001",
  },
  {
    id: "6",
    code: "06767",
    name: "New York Home Decor",
    email: "nyhomedecor@example.com",
    phone: "(555) 678-9012",
    terms: "1/2 Advance 1/2 Net 30",
    state: "NY",
    address: "987 Broadway, New York, NY 10005",
  },
  {
    id: "7",
    code: "06766",
    name: "Abrar",
    email: "abrar2@example.com",
    phone: "(555) 789-0123",
    terms: "1/2 Cash-1/2P/D30-60",
    state: "FL",
    address: "147 Park Ave, Miami, FL 33010",
  },
  {
    id: "8",
    code: "06763",
    name: "Central Village Corp.",
    email: "centralvillage@example.com",
    phone: "(555) 890-1234",
    terms: "P/D 60 Net",
    state: "NY",
    address: "258 Central Ave, New York, NY 10007",
  },
  {
    id: "52",
    code: "067712",
    name: "Newton and Nieves Traders",
    email: "newton@example.com",
    phone: "(555) 567-8901",
    terms: "1/2 Cash-1/2P/D45",
    state: "TX",
    address: "654 Maple Dr, Dallas, TX 75001",
  },
  {
    id: "36",
    code: "067672",
    name: "New York Home Decor",
    email: "nyhomedecor@example.com",
    phone: "(555) 678-9012",
    terms: "1/2 Advance 1/2 Net 30",
    state: "NY",
    address: "987 Broadway, New York, NY 10005",
  },
  {
    id: "73",
    code: "067662",
    name: "Abrar",
    email: "abrar2@example.com",
    phone: "(555) 789-0123",
    terms: "1/2 Cash-1/2P/D30-60",
    state: "FL",
    address: "147 Park Ave, Miami, FL 33010",
  },
  {
    id: "83",
    code: "067632",
    name: "Central Village Corp.",
    email: "centralvillage@example.com",
    phone: "(555) 890-1234",
    terms: "P/D 60 Net",
    state: "NY",
    address: "258 Central Ave, New York, NY 10007",
  },
];

export function CustomerList() {
  const [customers, setCustomers] = useState(demoCustomers);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCustomer = (customer) => {
    const newCustomer = { ...customer, id: Date.now().toString() };
    setCustomers([...customers, newCustomer]);
    setDialogOpen(false);
  };

  const handleEditCustomer = (customer) => {
    setCustomers(customers.map((c) => (c.id === customer.id ? customer : c)));
    setDialogOpen(false);
    setEditingCustomer(null);
  };

  const openEditDialog = (customer) => {
    setEditingCustomer(customer);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingCustomer(null);
  };

  const getStateBadge = (state) => {
    const colorMap = {
      NY: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      CA: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      TX: "bg-green-100 text-green-800 hover:bg-green-100",
      FL: "bg-red-100 text-red-800 hover:bg-red-100",
    };
    return <Badge className={colorMap[state] || "bg-gray-100 text-gray-700"}>{state}</Badge>;
  };

  return (
    <Card className="rounded-md shadow-sm border">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 border-gray-300  rounded"
            />
          </div>
          <Button onClick={() => setDialogOpen(true)} className="bg-green-600 hover:bg-green-700 ml-4">
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>

        <div className="overflow-x-auto h-[60dvh] max-h-[1000px] overflow-y-auto  ">
          <table className="w-full  text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-600 border">Code</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 border">Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 border">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 border">Phone</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 border">Terms</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 border">State</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 border">{customer.code}</td>
                  <td className="py-3 px-4 border font-medium">{customer.name}</td>
                  <td className="py-3 px-4 border text-gray-600">{customer.email}</td>
                  <td className="py-3 px-4 border text-gray-600">{customer.phone}</td>
                  <td className="py-3 px-4 border">{customer.terms}</td>
                  <td className="py-3 px-4 border">{getStateBadge(customer.state)}</td>
                  <td className="py-3 px-4 border">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      onClick={() => openEditDialog(customer)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>

      <CustomerDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        onSave={editingCustomer ? handleEditCustomer : handleAddCustomer}
        customer={editingCustomer}
      />
    </Card>
  );
}
