// SalesOrder.jsx
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font
} from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 9,
    fontFamily: "Helvetica"
  },
  header: {
    marginBottom: 10
  },
  title: {
    fontSize: 16,
    textAlign: "left",
    marginBottom: 5,
    fontWeight: "bold"
  },
  subTitle: {
    fontSize: 10,
    marginBottom: 2
  },
  section: {
    marginBottom: 10
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 10
  },
  row: {
    flexDirection: "row"
  },
  headerCell: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 4,
    fontWeight: "bold",
    fontSize: 9
  },
  cell: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 4,
    fontSize: 8
  },
  infoTable: {
    display: "table",
    width: "auto",
    marginBottom: 10
  },
  infoRow: {
    flexDirection: "row"
  },
  infoCell: {
    flex: 1,
    padding: 2,
    fontSize: 9
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 8
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
    marginVertical: 10
  },
  alignRight: {
    textAlign: "right"
  },
  bold: {
    fontWeight: "bold"
  }
});

// Dynamic data generator (you can replace this with your actual data)
const generateOrderData = (itemCount = 20) => {
  const baseItems = [
    { cases: 1, item: "22-040", description: "", unitPrice: 13.00, qty: 16, upc: "", amount: 208.00 },
    { cases: 1, item: "37-771", description: "Rooster Fountain &/ct", unitPrice: 15.00, qty: 6, upc: "607192377714", amount: 90.00 },
    { cases: 1, item: "75-615", description: "Glass Jug wiß Cup Set &/ct", unitPrice: 12.00, qty: 6, upc: "607192756151", amount: 72.00 },
    { cases: 1, item: "86-043", description: "Porcelain Center Piece &/ct", unitPrice: 35.00, qty: 5, upc: "607192860438", amount: 175.00 },
    { cases: 1, item: "87-633", description: "4pcs Art Deco Set &/ct", unitPrice: 13.50, qty: 8, upc: "607192876330", amount: 108.00 }
  ];

  const items = [];
  for (let i = 0; i < itemCount; i++) {
    const baseItem = baseItems[i % baseItems.length];
    items.push({
      ...baseItem,
      item: `${baseItem.item}-${i + 1}`,
      amount: baseItem.unitPrice * baseItem.qty * (Math.floor(i / 5) + 1)
    });
  }

  // Calculate totals dynamically
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const allowance = subtotal; // 100% allowance
  const total = subtotal - allowance;

  return {
    company: {
      name: "Mirtex Trading Corp",
      address: "20 Berry Street",
      cityStateZip: "Brooklyn, NY 11249",
      phone: "718-486-7832",
      email: "starofmirtex@aol.com"
    },
    billTo: {
      name: "test team",
      address: "4 bay",
      cityStateZip: "NY, NY, 4212",
      phone: "054-454-4453",
      email: "ishrak@ascotek.com"
    },
    resaleCertificate: "dd234424",
    orderNumber: "294",
    date: "09/24/2025",
    customerInfo: {
      customerNumber: "06768",
      poNumber: "-",
      terms: "test_terms",
      salesman: "3"
    },
    items,
    subtotal,
    allowance,
    total
  };
};

// Constants for pagination
const ITEMS_PER_PAGE = 8; // Adjust based on your page size
const HEADER_HEIGHT = 400; // Approximate height of all header sections in points

// Component to split items into pages
const SalesOrderDocument = ({ orderData }) => {
  const { items, subtotal, allowance, total } = orderData;
  
  // Split items into chunks for pagination
  const itemPages = [];
  for (let i = 0; i < items.length; i += ITEMS_PER_PAGE) {
    itemPages.push(items.slice(i, i + ITEMS_PER_PAGE));
  }

  return (
    <Document>
      {itemPages.map((pageItems, pageIndex) => (
        <Page key={pageIndex} size="LETTER" style={styles.page}>
          {/* Company Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{orderData.company.name}</Text>
            <Text style={styles.subTitle}>{orderData.company.address}</Text>
            <Text style={styles.subTitle}>{orderData.company.cityStateZip}</Text>
            <Text style={styles.subTitle}>{orderData.company.phone}</Text>
            <Text style={styles.subTitle}>{orderData.company.email}</Text>
          </View>

          {/* Bill To Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bill To:</Text>
            <Text style={styles.subTitle}>{orderData.billTo.name}</Text>
            <Text style={styles.subTitle}>{orderData.billTo.address}</Text>
            <Text style={styles.subTitle}>{orderData.billTo.cityStateZip}</Text>
            <Text style={styles.subTitle}>{orderData.billTo.phone}</Text>
            <Text style={styles.subTitle}>{orderData.billTo.email}</Text>
          </View>

          {/* Resale Certificate */}
          <View style={styles.infoTable}>
            <View style={styles.infoRow}>
              <Text style={[styles.infoCell, styles.bold]}>Resale Certificate #</Text>
              <Text style={styles.infoCell}>{orderData.resaleCertificate}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Sales Order Header */}
          <Text style={styles.sectionTitle}>Sales Order</Text>
          
          <View style={styles.infoTable}>
            <View style={styles.infoRow}>
              <Text style={[styles.infoCell, styles.bold]}>Order Number#</Text>
              <Text style={styles.infoCell}>{orderData.orderNumber}</Text>
              <Text style={[styles.infoCell, styles.bold]}>Date</Text>
              <Text style={styles.infoCell}>{orderData.date}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Ship To Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ship To:</Text>
            <Text style={styles.subTitle}>{orderData.billTo.name}</Text>
            <Text style={styles.subTitle}>{orderData.billTo.address}</Text>
            <Text style={styles.subTitle}>{orderData.billTo.cityStateZip}</Text>
            <Text style={styles.subTitle}>{orderData.billTo.phone}</Text>
            <Text style={styles.subTitle}>{orderData.billTo.email}</Text>
          </View>

          <View style={styles.divider} />

          {/* Customer Information */}
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={[styles.headerCell, { flex: 1 }]}>Customer #</Text>
              <Text style={[styles.headerCell, { flex: 1 }]}>P.O. #</Text>
              <Text style={[styles.headerCell, { flex: 1 }]}>Terms</Text>
              <Text style={[styles.headerCell, { flex: 1 }]}>Salesman</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.cell, { flex: 1 }]}>{orderData.customerInfo.customerNumber}</Text>
              <Text style={[styles.cell, { flex: 1 }]}>{orderData.customerInfo.poNumber}</Text>
              <Text style={[styles.cell, { flex: 1 }]}>{orderData.customerInfo.terms}</Text>
              <Text style={[styles.cell, { flex: 1 }]}>{orderData.customerInfo.salesman}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Items Table */}
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={[styles.headerCell, { flex: 0.7 }]}>Qty Cases</Text>
              <Text style={[styles.headerCell, { flex: 1 }]}>Item#</Text>
              <Text style={[styles.headerCell, { flex: 2 }]}>Description</Text>
              <Text style={[styles.headerCell, { flex: 0.8 }]}>Unit Price</Text>
              <Text style={[styles.headerCell, { flex: 0.6 }]}>Qty.</Text>
              <Text style={[styles.headerCell, { flex: 1.5 }]}>UPC</Text>
              <Text style={[styles.headerCell, { flex: 0.8 }]}>Amount</Text>
            </View>

            {pageItems.map((item, i) => (
              <View style={styles.row} key={i}>
                <Text style={[styles.cell, { flex: 0.7 }]}>{item.cases}</Text>
                <Text style={[styles.cell, { flex: 1 }]}>{item.item}</Text>
                <Text style={[styles.cell, { flex: 2 }]}>{item.description}</Text>
                <Text style={[styles.cell, { flex: 0.8 }]}>{item.unitPrice.toFixed(2)}</Text>
                <Text style={[styles.cell, { flex: 0.6 }]}>{item.qty}</Text>
                <Text style={[styles.cell, { flex: 1.5 }]}>{item.upc}</Text>
                <Text style={[styles.cell, { flex: 0.8 }]}>{item.amount.toFixed(2)}</Text>
              </View>
            ))}

            {/* Show subtotal only on last page */}
            {pageIndex === itemPages.length - 1 && (
              <>
                {/* Subtotal */}
                <View style={styles.row}>
                  <Text style={[styles.cell, { flex: 5.6 }]}></Text>
                  <Text style={[styles.cell, { flex: 0.6, fontWeight: "bold" }]}>Sub Total:</Text>
                  <Text style={[styles.cell, { flex: 0.8, fontWeight: "bold" }]}>$ {subtotal.toFixed(2)}</Text>
                </View>

                <View style={styles.divider} />

                {/* Allowance and Total */}
                <View style={styles.row}>
                  <Text style={[styles.headerCell, { flex: 0.7 }]}>Allowance</Text>
                  <Text style={[styles.headerCell, { flex: 1 }]}>-</Text>
                  <Text style={[styles.headerCell, { flex: 2 }]}></Text>
                  <Text style={[styles.headerCell, { flex: 0.8 }]}></Text>
                  <Text style={[styles.headerCell, { flex: 0.6 }]}></Text>
                  <Text style={[styles.headerCell, { flex: 1.5 }]}>- {allowance.toFixed(2)}</Text>
                  <Text style={[styles.headerCell, { flex: 0.8 }]}></Text>
                </View>
                <View style={styles.row}>
                  <Text style={[styles.cell, { flex: 0.7 }]}></Text>
                  <Text style={[styles.cell, { flex: 1 }]}>100.00%</Text>
                  <Text style={[styles.cell, { flex: 2 }]}></Text>
                  <Text style={[styles.cell, { flex: 0.8 }]}></Text>
                  <Text style={[styles.cell, { flex: 0.6 }]}></Text>
                  <Text style={[styles.cell, { flex: 1.5 }]}></Text>
                  <Text style={[styles.cell, { flex: 0.8 }]}></Text>
                </View>
                <View style={styles.row}>
                  <Text style={[styles.cell, { flex: 0.7 }]}></Text>
                  <Text style={[styles.cell, { flex: 1 }]}></Text>
                  <Text style={[styles.cell, { flex: 2 }]}></Text>
                  <Text style={[styles.cell, { flex: 0.8 }]}></Text>
                  <Text style={[styles.cell, { flex: 0.6 }]}></Text>
                  <Text style={[styles.cell, { flex: 1.5, fontWeight: "bold" }]}>Total:</Text>
                  <Text style={[styles.cell, { flex: 0.8, fontWeight: "bold" }]}>$ {total.toFixed(2)}</Text>
                </View>
              </>
            )}
          </View>

          {/* Footer with dynamic page numbers */}
          <Text style={styles.footer}>
            Page {pageIndex + 1} of {itemPages.length}
          </Text>
        </Page>
      ))}
    </Document>
  );
};

// Main component
const SalesOrder = ({ itemCount = 20 }) => {
  const orderData = generateOrderData(itemCount);
  
  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <SalesOrderDocument orderData={orderData} />
    </PDFViewer>
  );
};

// You can also export a version that accepts custom data
export const DynamicSalesOrder = ({ data }) => {
  // If custom data is provided, use it; otherwise generate demo data
  const orderData = data || generateOrderData(20);
  
  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <SalesOrderDocument orderData={orderData} />
    </PDFViewer>
  );
};

export default SalesOrder;