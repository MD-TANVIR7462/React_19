// SalesOrder.jsx
import React, { useRef } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  pdf
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";

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

// Demo data matching the provided PDF
const demoOrderData = {
  company: {
    name: "Mirtex Trading Corp",
    address: "20 Berry Street",
    cityStateZip: "Brooklyn, NY 11249",
    phone: "718-486-7832",
    email: "starofmirtex@aol.com"
  },
  billTo: {
    name: "99c Avenue",
    address: "3024 Church Avenue",
    cityStateZip: "Brooklyn, NY, 11226",
    phone: "718-284-2791"
  },
  shipTo: {
    name: "99c Avenue",
    address: "3024 Church Avenue",
    cityStateZip: "Brooklyn, NY, 11226",
    phone: "718-284-2791"
  },
  resaleCertificate: "",
  orderNumber: "141",
  date: "08/24/2025",
  customerInfo: {
    customerNumber: "05435",
    poNumber: "-",
    terms: "2% COD",
    salesman: "1"
  },
  items: [
    { cases: 2, item: "30-236", description: "Cutting Board 20 per case", unitPrice: 3.00, qty: 40, upc: "607192302365", amount: 120.00 },
    { cases: 2, item: "15-743", description: "Framed Picture 4/ct", unitPrice: 13.50, qty: 18, upc: "607192157439", amount: 243.00 },
    { cases: 2, item: "15-816", description: "32*48 Framed Picture 2/ct", unitPrice: 92.00, qty: 3, upc: "607192158160", amount: 270.00 },
    { cases: 2, item: "22-023", description: "S/S Sugar Bowl 12/ct", unitPrice: 15.00, qty: 24, upc: "607192220232", amount: 360.00 },
    { cases: 2, item: "22-025", description: "S/S Tray 12/ct", unitPrice: 13.00, qty: 24, upc: "607192220256", amount: 312.00 },
    { cases: 2, item: "22-049", description: "Incense Burner 12/ct", unitPrice: 20.00, qty: 24, upc: "607192220492", amount: 480.00 },
    { cases: 2, item: "22-072", description: "S/S Tray 6/ct", unitPrice: 13.00, qty: 12, upc: "607192220720", amount: 156.00 },
    { cases: 2, item: "62-215", description: "Islamic Clock 10/ct", unitPrice: 18.00, qty: 15, upc: "607192622159", amount: 270.00 },
    { cases: 3, item: "62-225", description: "Wall Clock 5/ct", unitPrice: 35.00, qty: 12.5, upc: "607192622258", amount: 437.50 },
    { cases: 2, item: "68-070", description: "18\" 6 head Hydrangea 48/ct", unitPrice: 5.00, qty: 72, upc: "607192680708", amount: 360.00 },
    { cases: 2, item: "68-587", description: "Flowers 48/ct", unitPrice: 3.50, qty: 96, upc: "607192685871", amount: 336.00 },
    { cases: 2, item: "69-295", description: "18 head Bushes 36/ct", unitPrice: 3.75, qty: 54, upc: "607192692954", amount: 202.50 },
    { cases: 2, item: "85-498", description: "Quran Box 4/ct", unitPrice: 65.00, qty: 6, upc: "607192854987", amount: 390.00 }
  ],
  subtotal: 3937.00,
  allowance: 0,
  total: 3937.00
};

// Constants for pagination
const ITEMS_PER_PAGE = 13; // All items fit on one page as per the original

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
            <Text style={styles.subTitle}>{orderData.shipTo.name}</Text>
            <Text style={styles.subTitle}>{orderData.shipTo.address}</Text>
            <Text style={styles.subTitle}>{orderData.shipTo.cityStateZip}</Text>
            <Text style={styles.subTitle}>{orderData.shipTo.phone}</Text>
          </View>

          {/* Resale Certificate */}
          <View style={styles.infoTable}>
            <View style={styles.infoRow}>
              <Text style={[styles.infoCell, styles.bold]}>Resale Certificate #</Text>
              <Text style={styles.infoCell}>{orderData.resaleCertificate}</Text>
            </View>
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
const SalesOrder = () => {
  const [showPdf, setShowPdf] = React.useState(false);
  const pdfContainerRef = useRef(null);

  const handlePrint = async () => {
    const blob = await pdf(<SalesOrderDocument orderData={demoOrderData} />).toBlob();
    
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    
    // Open in new window for printing
    const printWindow = window.open(url);
    
    // Wait for the PDF to load then trigger print
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  const handleDownload = async () => {
    const blob = await pdf(<SalesOrderDocument orderData={demoOrderData} />).toBlob();
    saveAs(blob, `sales-order-${demoOrderData.orderNumber}.pdf`);
  };

  const handleShowPdf = () => {
    setShowPdf(true);
  };

  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Control buttons */}
      <div style={{ padding: "10px", backgroundColor: "#f5f5f5", borderBottom: "1px solid #ddd" }}>
        <button 
          onClick={handleShowPdf}
          style={{
            padding: "10px 20px",
            margin: "0 10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Show PDF
        </button>
        <button 
          onClick={handlePrint}
          style={{
            padding: "10px 20px",
            margin: "0 10px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Print PDF
        </button>
        <button 
          onClick={handleDownload}
          style={{
            padding: "10px 20px",
            margin: "0 10px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Download PDF
        </button>
      </div>

      {/* PDF Viewer */}
      {showPdf && (
        <div ref={pdfContainerRef} style={{ flex: 1 }}>
          <PDFViewer style={{ width: "100%", height: "100%" }}>
            <SalesOrderDocument orderData={demoOrderData} />
          </PDFViewer>
        </div>
      )}
    </div>
  );
};

// You can also export a version that accepts custom data
export const DynamicSalesOrder = ({ data }) => {
  // If custom data is provided, use it; otherwise use demo data
  const orderData = data || demoOrderData;
  
  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <SalesOrderDocument orderData={orderData} />
    </PDFViewer>
  );
};

export default SalesOrder;