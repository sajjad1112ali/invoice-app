import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import toast from "react-hot-toast";

import { DocumentDownloadIcon } from "@heroicons/react/outline";
import { ClientInfo, InvoiceItem } from "@/lib/customTypes";

type privateProps = {
  items: Array<InvoiceItem>;
  clientInfo: ClientInfo;
  resetForm: Function;
};
// Register the fonts with pdfmake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const InvoicePDF = ({ items, clientInfo, resetForm }: privateProps) => {
  let totalPrice = 0;
  let shippingPrice = 100;

  const isValidInput = (inputValue: string | number, name: string) => {
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
  const validateCustomerInformation = (obj: ClientInfo) => {
    return Object.values(obj).some((value) => value === '');

  };
  const validateAndGetPDFData = () => {
    // Define the document definition
    const foundUnsatisfiedItem = validateItems();
    const isClientInformationValid = validateCustomerInformation(clientInfo);
    if (foundUnsatisfiedItem || isClientInformationValid) {
      toast.error("Validation errors occurred for some items.");
      return false;
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
              text: clientInfo.name,
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
        { text: clientInfo.phoneNumber, style: "paragraphs" },
        { text: clientInfo.email, style: "paragraphs" },
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
      // images: {
      //   logoImage: "https://picsum.photos/100/50",
      // },
    };
    return documentDefinition;
  };
  const generatePDF = (pdfData, id: number) => {
    console.log(pdfData)
    pdfData.content[2].columns[1][0].stack[0].text = `Invoice No: ${id}`
    pdfMake.createPdf(pdfData).open();
  };

  const generateItemsTable = (items: Array<InvoiceItem>) => {
    let totalItemsAmount = 0;
    
    const tableBody = items.map((item) => {

      const sum = item.price * item.qty;
      totalItemsAmount += sum;
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
      getTotalTable(totalItemsAmount),
    ];
  };

  const getTotalTable = (subTotal: number) => {
    totalPrice = subTotal + shippingPrice;
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
              text: subTotal,
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
              text: shippingPrice,
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
              text: totalPrice,
              border: [false, false, false, false],
              alignment: "right",
            },
          ],
        ],
      },
    };
  };
  const saveInvoice = () => {
    const isValid = validateAndGetPDFData();
    if (isValid === false) return false;

    fetch("/api/invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 1,
        clientInformation: JSON.stringify(clientInfo),
        totalPrice: `${totalPrice}`,
        shippingPrice:`${shippingPrice}`,
        items: JSON.stringify(items),
      }),
    }).then(async (res) => {
      // setLoading(false);
      const data = await res.json();
      const {id} = data;
      if (res.status === 200) {
        toast.success("Saved...");
        generatePDF(isValid, id);
        resetForm()
      } else {
        const { error } = await res.json();
        toast.error(error);
      }
    });
  };

  return (
    <button
      onClick={saveInvoice}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 py-2 mx-3 rounded"
    >
      <DocumentDownloadIcon className="h-5 w-5" />
    </button>
  );
};
export default InvoicePDF;
