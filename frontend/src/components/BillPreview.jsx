import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';  // Import the autoTable plugin

const BillPreview = ({ bill }) => {
  console.log(bill);
  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const headingText = 'SG Store';
  
    // Center-align the heading
    doc.setFontSize(18);
    const headingWidth = doc.getTextWidth(headingText);
    const headingX = (pageWidth - headingWidth) / 2;
    doc.text(headingText, headingX, 10);
  
    // Center-align address and phone number
    doc.setFontSize(15);
    const addressText = 'Address: Rajveer Colony Gharoli Extn Kondli';
    const phoneNumberText = 'Phone Number: 8684894051';
  
    const addressWidth = doc.getTextWidth(addressText);
    const phoneNumberWidth = doc.getTextWidth(phoneNumberText);
  
    doc.text(addressText, (pageWidth - addressWidth) / 2, 20);
    doc.text(phoneNumberText, (pageWidth - phoneNumberWidth) / 2, 30);
  
    // Add a line separator
    doc.setDrawColor(200, 200, 200);  // Light gray color for the line
    doc.line(10, 35, pageWidth - 10, 35);  // Line from (x1, y1) to (x2, y2)
  
    // Add Bill Details
    doc.setFontSize(14);
    doc.text('Invoice', headingX, 50);
    doc.setFontSize(12);
    doc.text(`Customer Name: ${bill.customerName}`, 10, 60);
    doc.text(`Phone Number: ${bill.phoneNumber}`, 10, 70);
    doc.text(`Address: ${bill.address || 'N/A'}`, 10, 80);
    doc.text(`Created At: ${new Date(bill.createdAt).toLocaleString()}`, 10, 100);
    doc.text(`Total Amount: Rs. ${bill.totalAmount || 0}`, 10, 110);
  
    // Add a line separator
    doc.setDrawColor(200, 200, 200);  // Light gray color for the line
    doc.line(10, 115, pageWidth - 10, 115);  // Line from (x1, y1) to (x2, y2)
  
    // Add Products Table Header
    doc.setFontSize(12);
    doc.text('Products:', 10, 130);
    doc.autoTable({
      startY: 135,
      head: [['Product ', 'Quantity', 'Price']],
      body: bill.products.map(product => [product.productname, product.quantity, `Rs. ${product.price || 0}`]),
      theme: 'striped',
      fillColor: [0, 82, 204], 
      textColor: [255, 255, 255], 
      styles: { fontSize: 12, cellPadding: 5, halign: 'center' },  // Center-align text in cells
      margin: { horizontal: 10 },
    });
  
    // Add Total Amount
    doc.setFontSize(15);
  const totalAmountText = `Total : Rs. ${bill.totalAmount || 0}`;
  const totalAmountWidth = doc.getTextWidth(totalAmountText);
  const xPosition = pageWidth - totalAmountWidth; // 10 units from the right edge
  doc.text(totalAmountText, xPosition, doc.autoTable.previous.finalY + 20, { align: 'right' });

    // Save the PDF
    doc.save('bill.pdf');
  };
  

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">SG Store</h1>
        <p className="text-gray-600">Address: Your Store Address</p>
        <p className="text-gray-600">Phone Number: Your Store Phone Number</p>
      </div>
      <div className="mb-6 border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold mb-4">Bill Preview</h2>
        <p className="text-gray-700"><strong>Customer Name:</strong> {bill.customerName}</p>
        <p className="text-gray-700"><strong>Phone Number:</strong> {bill.phoneNumber}</p>
        <p className="text-gray-700"><strong>Address:</strong> {bill.address || 'N/A'}</p>
        <p className="text-gray-700"><strong>Transaction ID:</strong> {bill._id}</p>
        <p className="text-gray-700"><strong>Created At:</strong> {new Date(bill.createdAt).toLocaleString()}</p>
        <p className="text-gray-700"><strong>Total Amount:</strong> Rs. {bill.totalAmount || 0}</p>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Products</h3>
        <table className="w-full border border-gray-300 border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border-b border-gray-300">Product Name</th>
              <th className="p-2 border-b border-gray-300">Quantity</th>
              <th className="p-2 border-b border-gray-300">Price</th>
            </tr>
          </thead>
          <tbody>
            {bill.products.map((product, index) => (
              <tr key={index}>
                <td className="p-2 border-b border-gray-300">{product.productname}</td>
                <td className="p-2 border-b border-gray-300">{product.quantity}</td>
                <td className="p-2 border-b border-gray-300">Rs. {product.price || 0}</td>
              </tr>
            ))}
            <tr>
              <th className="p-2 border-b border-gray-300 text-right" colSpan="2">Total Amount</th>
              <td className="p-2 border-b border-gray-300">Rs. {bill.totalAmount || 0}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        onClick={generatePDF}
        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Download PDF
      </button>
    </div>
  );
};

export default BillPreview;
