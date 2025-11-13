import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { DocumentDownloadIcon } from "@heroicons/react/outline";
import { ClientInfo, InvoiceItem } from "@/lib/customTypes";
import { formateDate, RRTechLogo } from "@/lib/functions";

type privateProps = {
  items: Array<InvoiceItem>;
  clientInfo: ClientInfo;
  resetForm?: Function;
  downloadTriggeredFromModal?: number;
  shipping?: number;
  id?: number;
  isEditMode: boolean;
  invoiceDetails?: any;
};
// Register the fonts with pdfmake
pdfMake.vfs = pdfFonts?.pdfMake?.vfs;

const InvoicePDF = ({
  items,
  clientInfo,
  resetForm,
  downloadTriggeredFromModal,
  isEditMode,
  id,
  shipping,
  invoiceDetails,
}: privateProps) => {
  let totalPrice = 0;
  let shippingPrice = shipping;
  const router = useRouter();
  const primaryColor = "#10b981";
  const secondaryColor = "#111827";
  const whiteColor = "#FFFFFF";

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
    return Object.values(obj).some((value) => value === "");
  };
  const validateAndGetPDFData = () => {
    const foundUnsatisfiedItem = validateItems();
    const isClientInformationValid = validateCustomerInformation(clientInfo);
    if (
      (foundUnsatisfiedItem || isClientInformationValid) &&
      !downloadTriggeredFromModal
    ) {
      toast.error("Validation errors occurred for some items.");
      return false;
    }
  };
  const getPDFData = (data) => {
    const { clientInformation, createdAt, id, items: billItems } = data;
    const documentDefinition: any = {
      content: [
        {
          absolutePosition: { x: 480, y: 45 },
          image: "logoImage",
          width: 80,
        },

        { text: "INVOICE", style: "header", color: secondaryColor },
        {
          canvas: [
            {
              type: "line",
              x1: 0,
              y1: 5,
              x2: 520,
              y2: 0,
              lineWidth: 2,
              lineColor: primaryColor,
            },
          ],
          margin: [0, 5, 0, 20],
        },

        {
          table: {
            widths: ["*", "*"],
            body: [
              [
                {
                  text: clientInformation.name,
                  style: ["subheader", "fontBold", "colorSecondary"],
                  border: [false, false, false, false],
                  fillColor: whiteColor,
                },
                {
                  text: `Invoice No: ${id}`,
                  style: ["subheader", "fontBold", "colorPrimary"],
                  border: [false, false, false, false],
                  alignment: "right",
                  fillColor: whiteColor,
                },
              ],
              [
                {
                  text: clientInformation.phoneNumber,
                  style: "paragraphs",
                  border: [false, false, false, false],
                },
                {
                  text: `Issue Date: ${formateDate(createdAt)}`,
                  style: "paragraphs",
                  border: [false, false, false, false],
                  alignment: "right",
                },
              ],
              [
                {
                  text: clientInformation.email,
                  style: "paragraphs",
                  border: [false, false, false, false],
                },
                {
                  text: `Due Date: ${formateDate(clientInformation.dueDate)}`,
                  style: ["paragraphs", "fontBold"],
                  border: [false, false, false, false],
                  alignment: "right",
                },
              ],
            ],
          },
          layout: "noBorders",
          margin: [0, 0, 0, 20],
        },
        {
          text: "ITEMS BREAKDOWN",
          style: "subheader",
          color: primaryColor,
          margin: [0, 20, 0, 5],
        },
        generateItemsTable(billItems),
      ],
      styles: {
        header: { fontSize: 28, bold: true },
        subheader: { fontSize: 14, color: secondaryColor },
        colorPrimary: { color: primaryColor },
        colorSecondary: { color: secondaryColor },
        fontBold: { bold: true },
        paragraphs: { fontSize: 12, color: secondaryColor },
        tableHeader: {
          fillColor: primaryColor,
          color: whiteColor,
          bold: true,
          alignment: "center",
          fontSize: 12,
          paddingLeft: 5,
          paddingRight: 5,
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
      images: {
        logoImage: RRTechLogo,
      },
      defaultStyle: {
        color: secondaryColor,
      },
    };
    return documentDefinition;
  };

  const generatePDF = (pdfData: any, id: number) => {
    pdfMake.createPdf(pdfData).open();
  };

  const generateItemsTable = (items) => {
    let totalItemsAmount = 0;
    const itemTableWidths = [200, "*", "*", "*"];
    const tableBody = items.map((item) => {
      const sum = item.price * item.qty;
      totalItemsAmount += sum;
      return [
        {
          text: item.name,
          border: [false, false, false, false],
          paddingLeft: 5,
        },
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
        {
          text: sum,
          border: [false, false, false, false],
          alignment: "right",
          paddingRight: 5,
        },
      ];
    });

    const tableHeader = [
      {
        text: "ITEM NAME",
        style: "tableHeader",
        border: [false, false, false, false],
        alignment: "left",
        paddingLeft: 5,
      },
      {
        text: "PRICE ($)",
        style: "tableHeader",
        border: [false, false, false, false],
      },
      {
        text: "QTY",
        style: "tableHeader",
        border: [false, false, false, false],
      },
      {
        text: "TOTAL ($)",
        style: "tableHeader",
        border: [false, false, false, false],
        alignment: "right",
        paddingRight: 5,
      },
    ];

    return [
      {
        margin: [0, 10, 0, 30],
        table: {
          widths: itemTableWidths,
          headerRows: 1,
          body: [tableHeader, ...tableBody],
          layout: {
            // Custom layout to add a bottom line to the header
            hLineWidth: function (i, node) {
              return i === 0 || i === node.table.body.length ? 0 : 0.5;
            },
            vLineWidth: function (i) {
              return 0;
            },
            hLineColor: function () {
              return primaryColor;
            },
            paddingTop: function (i, node) {
              return 8;
            },
            paddingBottom: function (i, node) {
              return 8;
            },
          },
        },
      },
      getTotalTable(totalItemsAmount),
    ];
  };

  const getTotalTable = (subTotal: number) => {
    totalPrice = subTotal + shippingPrice;
    return {
      margin: [0, 10, 0, 0],
      table: {
        widths: ["*", 100],
        body: [
          [
            {
              text: "SUB TOTAL",
              style: ["subheader", "fontBold", "colorSecondary"],
              border: [false, false, false, false],
              alignment: "right",
            },
            {
              text: subTotal,
              style: ["paragraphs"],
              border: [false, false, false, false],
              alignment: "right",
            },
          ],
          [
            {
              text: "SHIPPING",
              style: ["subheader", "fontBold", "colorSecondary"],
              border: [false, false, false, false],
              alignment: "right",
            },
            {
              text: shippingPrice,
              style: ["paragraphs"],
              border: [false, false, false, false],
              alignment: "right",
            },
          ],
          [
            {
              text: "TOTAL AMOUNT DUE",
              style: ["subheader", "fontBold", "colorPrimary"],
              border: [false, true, false, false],
              alignment: "right",
              fillColor: "#f0fdf4",
              paddingTop: 8,
              paddingBottom: 8,
            },
            {
              text: totalPrice,
              style: ["subheader", "fontBold", "colorPrimary"],
              border: [false, true, false, false],
              alignment: "right",
              fillColor: "#f0fdf4",
              paddingTop: 8,
              paddingBottom: 8,
            },
          ],
        ],
      },
      layout: {
        hLineWidth: function (i, node) {
          return i === node.table.body.length ? 0 : 0;
        },
        vLineWidth: function () {
          return 0;
        },
        hLineColor: function () {
          return primaryColor;
        },
      },
    };
  };
  const saveInvoice = () => {
    const isValid = validateAndGetPDFData();

    if (isValid === false) return false;
    if (downloadTriggeredFromModal) {
      const editPdfData = getPDFData(invoiceDetails);
      generatePDF(editPdfData, downloadTriggeredFromModal);
      return;
    }
    const requestMethod = isEditMode ? "PUT" : "POST";
    fetch("/api/invoice", {
      method: requestMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientInformation: clientInfo,
        totalPrice: totalPrice,
        shippingPrice: shippingPrice,
        dueDate: clientInfo.dueDate,
        items: items,
        id,
      }),
    }).then(async (res) => {
      const data = await res.json();
      const { id } = data;
      if (res.status === 200) {
        const statusMessage = isEditMode
          ? "Invoice saved successfully"
          : "Invoice updated successfully";
        toast.success(statusMessage);
        const createdPDFData = getPDFData(data);
        generatePDF(createdPDFData, id);
        if (isEditMode) {
          router.refresh();
          router.push("/dashboard");
        } else {
          resetForm();
        }
      } else {
        const { error } = data;
        toast.error(error);
      }
    });
  };

  return (
    <button
      onClick={saveInvoice}
      className="inline-flex items-center justify-center px-3 py-3 border border-transparent text-base font-bold rounded-md shadow-xl text-white bg-blue-500 hover:bg-blue-400 transition duration-300 transform hover:scale-105"
    >
      {isEditMode ? "Update" : <DocumentDownloadIcon className="h-5 w-5" />}
    </button>
  );
};
export default InvoicePDF;
