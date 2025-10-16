// SalesOrder.jsx
import React from "react";
import { Page, Text, View, Document, StyleSheet, PDFViewer } from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  // Company Info (left)
  companyInfo: {
    width: "45%",
  },
  // Sales Order box (right)
  salesOrderBox: {
    width: "40%",
    border: "1px solid black",
  },
  salesOrderHeader: {
    borderBottom: "1px solid black",
    padding: 5,
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "start",
  },
  salesOrderRow: {
    flexDirection: "row",
    borderBottom: "1px solid black",
  },
  salesOrderSecondRow: {
    flexDirection: "row",
  },
  salesOrderCellLabel: {
    width: "50%",
    borderRight: "1px solid black",
    padding: 4,
    fontSize: 10,
    // fontWeight: "bold",
  },
  salesOrderCellValue: {
    width: "50%",
    padding: 4,
    fontSize: 10,
  },
  // Bill To & Ship To boxes
  box: {
    width: "45%",
    border: "1px solid black",
    marginTop: 15,
  },
  boxHeader: {
    borderBottom: "1px solid black",
    padding: 2,
    fontSize: 11,
    fontWeight: "bold",
  },
  boxContent: {
    padding: 2,
    fontSize: 11,
  },
  resaleRow: {
    flexDirection: "row",
    borderTop: "1px solid black",
  },
  resaleCellLabel: {
    width: "50%",
    fontSize: 11,
    borderRight: "1px solid black",
    padding: 2,
  },
  resaleCellValue: {
    width: "50%",
    fontSize: 11,
    padding: 2,
  },
  // Original table styles
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 15,
    marginBottom: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  SubheaderCell: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 4,
    fontWeight: "semibold",
    fontSize: 10,
  },
  headerCell: {
    flex: 1,
    backgroundColor: "#D3D3D3",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    paddingVertical: 7,
    paddingHorizontal: 4,
    fontWeight: "semibold",
    fontSize: 10,
  },
  cell: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 4,
    fontSize: 10,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 8,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
    marginVertical: 10,
  },

  absoluteDivider: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
  },
  alignRight: {
    textAlign: "right",
  },
  bold: {
    fontWeight: "bold",
  },
});

// Dynamic data generator
const generateOrderData = (itemCount = 20) => {
  const baseItems = [
    { cases: 1, item: "22-040", description: "", unitPrice: 13.0, qty: 16, upc: "", amount: 208.0 },
    {
      cases: 1,
      item: "37-771",
      description: "Rooster Fountain &/ct",
      unitPrice: 15.0,
      qty: 6,
      upc: "607192377714",
      amount: 90.0,
    },
    {
      cases: 1,
      item: "75-615",
      description: "Glass Jug wiß Cup Set &/ct",
      unitPrice: 12.0,
      qty: 6,
      upc: "607192756151",
      amount: 72.0,
    },
    {
      cases: 1,
      item: "86-043",
      description: "Porcelain Center Piece &/ct",
      unitPrice: 35.0,
      qty: 5,
      upc: "607192860438",
      amount: 175.0,
    },
    {
      cases: 1,
      item: "87-633",
      description: "4pcs Art Deco Set &/ct",
      unitPrice: 13.5,
      qty: 8,
      upc: "607192876330",
      amount: 108.0,
    },
  ];

  const items = [];
  for (let i = 0; i < itemCount; i++) {
    const baseItem = baseItems[i % baseItems.length];
    items.push({
      ...baseItem,
      item: `${baseItem.item}-${i + 1}`,
      amount: baseItem.unitPrice * baseItem.qty * (Math.floor(i / 5) + 1),
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
      email: "starofmirtex@aol.com",
    },
    billTo: {
      name: "86 Furniture",
      address: "86-07 Roosevelt Ave",
      cityStateZip: "Jackson Heights, NY, 11372",
      phone: "718-426-3747",
      email: " ",
    },
    shipTo: {
      name: "86 Furniture",
      address: "86-07 Roosevelt Ave",
      cityStateZip: "Jackson Heights, NY, 11372",
      phone: "718-426-3747",
      email: " ",
    },
    resaleCertificate: "45",
    orderNumber: "182",
    date: "09/02/2025",
    customerInfo: {
      customerNumber: "06768",
      poNumber: "-",
      terms: "test_terms",
      salesman: "3",
    },
    items,
    subtotal,
    allowance,
    total,
  };
};

// Constants for pagination
const ITEMS_PER_PAGE = 18;

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
          {/* Header Section - Using your exact design */}
          {/* Top row: Company info + Sales Order */}
          <View style={styles.row}>
            {/* Company Info */}
            <View style={styles.companyInfo}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>{orderData.company.name}</Text>
              <Text>{orderData.company.address}</Text>
              <Text>{orderData.company.cityStateZip}</Text>
              <Text>{orderData.company.phone}</Text>
              <Text>{orderData.company.email}</Text>
            </View>

            {/* Sales Order */}
            <View style={styles.salesOrderBox}>
              <Text style={styles.salesOrderHeader}>Sales Order</Text>
              <View style={styles.salesOrderRow}>
                <Text style={styles.salesOrderCellLabel}>Order Number#</Text>
                <Text style={styles.salesOrderCellValue}>{orderData.orderNumber}</Text>
              </View>
              <View style={styles.salesOrderSecondRow}>
                <Text style={styles.salesOrderCellLabel}>Date</Text>
                <Text style={styles.salesOrderCellValue}>{orderData.date}</Text>
              </View>
            </View>
          </View>

          {/* Bottom row: Bill To + Ship To */}
          <View style={styles.row}>
            {/* Bill To */}
            <View style={styles.box}>
              <Text style={styles.boxHeader}>Bill To:</Text>
              <View style={styles.boxContent}>
                <Text>{orderData.billTo.name}</Text>
                <Text>{orderData.billTo.address}</Text>
                <Text>{orderData.billTo.cityStateZip}</Text>
                <Text>{orderData.billTo.phone}</Text>
                <Text>{orderData.billTo.email}</Text>
              </View>
              <View style={styles.resaleRow}>
                <Text style={styles.resaleCellLabel}>Resale Certificate #</Text>
                <Text style={styles.resaleCellValue}>{orderData.resaleCertificate}</Text>
              </View>
            </View>

            {/* Ship To */}
            <View style={styles.box}>
              <Text style={styles.boxHeader}>Ship To:</Text>
              <View style={styles.boxContent}>
                <Text>{orderData.shipTo.name}</Text>
                <Text>{orderData.shipTo.address}</Text>
                <Text>{orderData.shipTo.cityStateZip}</Text>
                <Text>{orderData.shipTo.phone}</Text>
                <Text>{orderData.shipTo.email}</Text>
              </View>
            </View>
          </View>

          {/* Customer Information */}
          <View style={[styles.table]}>
            <View style={styles.tableRow}>
              <Text style={[styles.SubheaderCell, { flex: 1 }]}>Customer #</Text>
              <Text style={[styles.SubheaderCell, { flex: 1 }]}>P.O. #</Text>
              <Text style={[styles.SubheaderCell, { flex: 1 }]}>Terms</Text>
              <Text style={[styles.SubheaderCell, { flex: 1 }]}>Salesman</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.cell, { flex: 1 }]}>{orderData.customerInfo.customerNumber}</Text>
              <Text style={[styles.cell, { flex: 1 }]}>{orderData.customerInfo.poNumber}</Text>
              <Text style={[styles.cell, { flex: 1 }]}>{orderData.customerInfo.terms}</Text>
              <Text style={[styles.cell, { flex: 1 }]}>{orderData.customerInfo.salesman}</Text>
            </View>
          </View>
          {/* 
          <View style={styles.divider} /> */}

          {/* Items Table */}
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.headerCell, { flex: 0.7 }]}>Qty Cases</Text>
              <Text style={[styles.headerCell, { flex: 1 }]}>Item#</Text>
              <Text style={[styles.headerCell, { flex: 2 }]}>Description</Text>
              <Text style={[styles.headerCell, { flex: 0.8 }]}>Unit Price</Text>
              <Text style={[styles.headerCell, { flex: 0.6 }]}>Qty.</Text>
              <Text style={[styles.headerCell, { flex: 1.5 }]}>UPC</Text>
              <Text style={[styles.headerCell, { flex: 0.8 }]}>Amount</Text>
            </View>

            {pageItems.map((item, i) => (
              <View style={styles.tableRow} key={i}>
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
                <View style={styles.tableRow}>
                  <Text style={[styles.cell, { flex: 5.6 }]}></Text>
                  <Text style={[styles.cell, { flex: 0.6, fontWeight: "bold" }]}>Sub Total:</Text>
                  <Text style={[styles.cell, { flex: 0.8, fontWeight: "bold" }]}>$ {subtotal.toFixed(2)}</Text>
                </View>

                <View style={styles.divider} />

                {/* Allowance and Total */}
                <View style={styles.tableRow}>
                  <Text style={[styles.headerCell, { flex: 0.7 }]}>Allowance</Text>
                  <Text style={[styles.headerCell, { flex: 1 }]}>-</Text>
                  <Text style={[styles.headerCell, { flex: 2 }]}></Text>
                  <Text style={[styles.headerCell, { flex: 0.8 }]}></Text>
                  <Text style={[styles.headerCell, { flex: 0.6 }]}></Text>
                  <Text style={[styles.headerCell, { flex: 1.5 }]}>- {allowance.toFixed(2)}</Text>
                  <Text style={[styles.headerCell, { flex: 0.8 }]}></Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={[styles.cell, { flex: 0.7 }]}></Text>
                  <Text style={[styles.cell, { flex: 1 }]}>100.00%</Text>
                  <Text style={[styles.cell, { flex: 2 }]}></Text>
                  <Text style={[styles.cell, { flex: 0.8 }]}></Text>
                  <Text style={[styles.cell, { flex: 0.6 }]}></Text>
                  <Text style={[styles.cell, { flex: 1.5 }]}></Text>
                  <Text style={[styles.cell, { flex: 0.8 }]}></Text>
                </View>
                <View style={styles.tableRow}>
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
          <View style={[styles.absoluteDivider]} />
          <Text style={styles.footer}>
            Page {pageIndex + 1} of {itemPages.length}
          </Text>
        </Page>
      ))}
    </Document>
  );
};

// Main component
const SalesOrderInvoice = ({ itemCount = 40 }) => {
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

export default SalesOrderInvoice;
