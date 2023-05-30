import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import toast from "react-hot-toast";

import { DocumentDownloadIcon } from "@heroicons/react/outline";
import { InvoiceItem } from "@/lib/customTypes";

type privateProps = {
  items: Array<InvoiceItem>;
}
// Register the fonts with pdfmake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const InvoicePDF = ({ items }: privateProps) => {
  const topMargin = 20;
  const defaultMargin = { margin: [0, 10, 0, 0] };

  const isValidInput = (inputValue: string | number, name: string) => {
    console.log(inputValue);
    if (name === "name") return inputValue !== "";
    return inputValue > 0;
  };
  const validateItems = () => {
    return items.some((elem: InvoiceItem) => {
      if (
        !isValidInput(elem.name, "name") ||
        !isValidInput(elem.qty, "count") ||
        !isValidInput(elem.price, "count")
      ) {
        return true;
      } else {
        return false;
      }
    });
  };
  const generatePDF = () => {
    // Define the document definition
    const foundUnsatisfiedItem = validateItems();
    if (foundUnsatisfiedItem) {
      toast.error("Validation errors occurred for some items.");
      return true;
    }
    const documentDefinition = {
      content: [
        { text: "Invoice", style: "header" },
        {
          canvas: [
            {
              type: "line",
              x1: 0,
              y1: 5,
              x2: 520,
              y2: 0,
              lineWidth: 2,
              lineColor: "#eaa352",
            },
          ],
        },
        {
          columns: [
            {
              width: "*",
              text: "Mr. Usman Sherazi",
              style: ["subheader", "fontBold"],
              margin: [0, 30, 0, 0],
            },
            [
              {
                width: "*",
                alignment: "right",
                margin: [0, 30, 0, 0],
                stack: [
                  {
                    text: "Invoice No: 1001",
                  },
                  {
                    text: new Date().toDateString(),
                  },
                ],
              },
            ],
          ],
        },
        { text: "+903472514178", style: "paragraphs" },
        { text: "john@yopmail.com", style: "paragraphs" },
        { text: "Items", style: "subheader", margin: [0, 20, 0, 5] },
        generateItemsTable(items),
        // {
        //   absolutePosition: { x: 456, y: 20 },
        //   image: "logoImage",
        // },
      ],
      styles: {
        header: { fontSize: 28, bold: true },
        subheader: { fontSize: 14 },
        colorOrange: { color: "#eaa352" },
        fontBold: { bold: true },
        paragraphs: { fontSize: 12 },
        tableHeader: {
          fillColor: "#eaa352",
          color: "#FFFFFF",
          bold: true,
          alignment: "center",
          fontSize: 14,
        },
      },
      images: {
        logoImage: "https://picsum.photos/100/50",
      },
    };

    // Generate the PDF
    pdfMake.createPdf(documentDefinition).open();
  };

  const generateItemsTable = (items: Array<InvoiceItem>) => {
    let totalBillingAmount = 0;
    const tableBody = items.map((item) => {
      const sum = item.price * item.qty;
      totalBillingAmount += sum;
      return [
        { text: item.name, border: [false, false, false, false] },
        {
          text: item.price,
          border: [true, false, false, false],
          alignment: "center",
        },
        {
          text: item.qty,
          border: [false, false, false, false],
          alignment: "center",
        },
        { text: sum, border: [true, false, false, false], alignment: "right" },
      ];
    });
    const tableHeader = [
      {
        text: "NAME",
        style: "tableHeader",
        border: [false, false, false, false],
      },
      {
        text: "PRICE",
        style: "tableHeader",
        border: [true, false, false, false],
      },
      {
        text: "QTY",
        style: "tableHeader",
        border: [false, false, false, false],
      },
      {
        text: "TOTAL",
        style: "tableHeader",
        border: [true, false, false, false],
      },
    ];

    return [
      {
        margin: [0, 10, 0, 30],
        table: {
          widths: [150, "*", "*", "*"],
          headerRows: 1,
          body: [tableHeader, ...tableBody],
        },
      },
      getTotalTable(totalBillingAmount),
    ];
  };

  const getTotalTable = (billingAmount: number) => {
    let shippingAmount = 100;
    let totalBillingAmount = billingAmount + shippingAmount;
    return {
      table: {
        widths: ["*", 120], // Specify the widths of the columns
        body: [
          [
            {
              text: "SUB TOTAL",
              style: ["subheader", "fontBold"],
              border: [false, false, false, false],
              alignment: "right",
            },
            {
              text: billingAmount,
              border: [false, false, false, false],
              alignment: "right",
            },
          ],
          [
            {
              text: "SHIPPING",
              style: ["subheader", "fontBold"],
              border: [false, false, false, false],
              alignment: "right",
            },
            {
              text: shippingAmount,
              border: [false, false, false, false],
              alignment: "right",
            },
          ],
          [
            {
              text: "TOTAL",
              style: ["subheader", "fontBold"],
              border: [false, false, false, false],
              alignment: "right",
            },
            {
              text: totalBillingAmount,
              border: [false, false, false, false],
              alignment: "right",
            },
          ],
        ],
      },
    };
  };

  return (
    <button
      onClick={generatePDF}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 py-2 mx-3 rounded"
    >
      <DocumentDownloadIcon className="h-5 w-5" />
    </button>
  );
};
export default InvoicePDF;
