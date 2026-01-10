import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { BRICK_TYPE_OPTIONS } from "../data";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatNumberIN(num) {
  if (num === null || num === undefined) return "";
  return new Intl.NumberFormat("en-IN").format(num);
}

export const getBrickTypeLabel = (id) => {
  return BRICK_TYPE_OPTIONS.find((option) => option.id === id)?.label || id;
};

export function formatStatusText(input = "") {
  return input
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const getBrickTypeArrayLabels = (types = []) => {
  if (!Array.isArray(types) || types.length === 0) return [];

  return types
    .map((type) => BRICK_TYPE_OPTIONS.find((opt) => opt.id === type)?.label)
    .filter(Boolean);
};

export const generateInvoicePDF = async (
  invoiceData,
  images,
  companyInfo = {},
  errorCallback = null
) => {
  try {
    const defaultCompanyInfo = {
      name: "Kloud Apps LLC",
      address1: "254 Chapman Rd, Suite 101-B, Newark,",
      address2: "DE 19702",
      email: "support@telzen.net",
      businessName: "Business Name",
      businessEmail: "Business Email",
      ...companyInfo,
    };

    const invoiceHTML = generateInvoiceHTML(
      invoiceData,
      images,
      defaultCompanyInfo
    );

    const tempDiv = createTempContainer(invoiceHTML);
    document.body.appendChild(tempDiv);

    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      logging: false,
      useCORS: true,
    });

    const pdf = createPDFFromCanvas(canvas);

    document.body.removeChild(tempDiv);

    pdf.save(`invoice_${invoiceData.invoiceNumber}.pdf`);

    return { success: true };
  } catch (error) {
    console.error("Error generating invoice:", error);
    if (errorCallback) {
      errorCallback("Failed to generate invoice");
    }
    return { success: false, error };
  }
};

const createTempContainer = (innerHTML) => {
  const tempDiv = document.createElement("div");
  tempDiv.id = "pdf-content";
  tempDiv.style.position = "absolute";
  tempDiv.style.left = "-9999px";
  tempDiv.style.width = "595px";
  tempDiv.style.padding = "20px";
  tempDiv.style.fontFamily = "Helvetica, Arial, sans-serif";
  tempDiv.style.height = "842px";
  tempDiv.style.boxSizing = "border-box";
  tempDiv.innerHTML = innerHTML;
  return tempDiv;
};

const generateInvoiceHTML = (data, images, company) => {
  return `
    <div id="pdf-content" style="padding: 20px; width: 100%; max-width: 595px;
      height: 100%; font-family: 'Inter', sans-serif; color: #000; font-size: 10px; display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 70px;">
            <img src="${images.LoginLogo}" alt="Logo" style="height: 32px;" />
            <div style="font-size: 10px; line-height: 1.5;">
                <div style="color: #1A1C21; font-size: 10px; font-style: normal; font-weight: 600; line-height: 120%; margin-bottom: 4px;">${company.name}</div>
                <div style="color: #888; font-size: 10px; font-weight: 400; line-height: 130%; margin-bottom: 3px;">${company.address1}</div>
                <div style="color: #888; font-size: 10px; font-weight: 400; line-height: 130%; margin-bottom: 3px;">${company.address2}</div>
                <div style="color: #888; font-size: 10px; font-weight: 400; line-height: 130%;">${company.email}</div>
            </div>
        </div>

        <!-- Billing & Invoice Info -->
        <div style="display: flex; justify-content: space-between; margin-bottom: 50px;">
            <div>
                <div style="color: #888; font-size: 10px; font-weight: 400; line-height: 130%; margin-bottom: 4px;">Billed to</div>
                <div style="color: #191919; font-size: 12px; font-style: normal; font-weight: 600; line-height: 120%; margin-bottom: 4px;">${data.userName}</div>
            </div>
            <div>
                <div style="color: #888; font-size: 10px; font-weight: 400; line-height: 130%; margin-bottom: 4px;">eSIM number</div>
                <div style="color: #191919; font-size: 12px; font-style: normal; font-weight: 600; line-height: 120%;">${data.invoiceNumber}</div>
            </div>
            <div>
                <div style="color: #888; font-size: 10px; font-weight: 400; line-height: 130%; margin-bottom: 4px;">Invoice date</div>
                <div style="color: #191919; font-size: 12px; font-style: normal; font-weight: 600; line-height: 120%;">${data.invoiceDate}</div>
            </div>
        </div>

        <!-- Table -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 10px;">
            <thead>
                <tr style="text-align: left; border-top: 1px solid #D7DAE0; border-bottom: 1px solid #D7DAE0;">
                    <td style="padding-bottom:15px; padding-top:5px; color: #191919; font-size: 8px; font-style: normal; font-weight: 400; line-height: 100%; text-transform: uppercase;">ITEM DETAIL</td>
                    <td style="padding-bottom:15px; padding-top:5px; color: #191919; font-size: 8px; font-style: normal; font-weight: 400; line-height: 100%; width: 90px; text-transform: uppercase;">QTY</td>
                    <td style="padding-bottom:15px; padding-top:5px; color: #191919; font-size: 8px; font-style: normal; font-weight: 400; line-height: 100%; width: 90px; text-transform: uppercase;">RATE</td>
                    <td style="padding-bottom:15px; padding-top:5px; color: #191919; font-size: 8px; font-style: normal; font-weight: 400; line-height: 100%; text-align: right; width: 60px; text-transform: uppercase;">AMOUNT</td>
                </tr>
            </thead>
            <tbody>
                <tr style="border-bottom: 1px solid #D7DAE0;">
                    <td style="padding: 12px 0;">
                        <div style="color: #191919; font-size: 12px; font-style: normal; font-weight: 600; line-height: 120%; margin-bottom: 4px;">${data.packageName}</div>
                        <div style="color: #888; font-size: 10px; font-style: normal; font-weight: 400; line-height: 130%;">${data.iccid}</div>
                    </td>
                    <td style="color: #191919; font-size: 10px; font-style: normal; font-weight: 400; line-height: 130%;">${data.quantity}</td>
                    <td style="color: #191919; font-size: 10px; font-style: normal; font-weight: 400; line-height: 130%;">${data.rate}</td>
                    <td style="color: #191919; font-size: 10px; font-style: normal; font-weight: 400; text-align: right; line-height: 130%;">${data.amount}</td>
                </tr>
            </tbody>
        </table>

        <!-- Totals -->
        <div style="display: flex; justify-content: flex-end; margin-bottom: 60px;">
            <div style="width: 240px; font-size: 12px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                    <span style="color: #191919; font-size: 10px; font-style: normal; font-weight: 600; line-height: 120%;">Subtotal</span>
                    <span style="color: #191919; font-size: 10px; font-style: normal; font-weight: 600; line-height: 120%;">${data.amount}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                    <span style="color: #191919; font-size: 10px; font-style: normal; font-weight: 600; line-height: 120%;">Tax</span>
                    <span style="color: #191919; font-size: 10px; font-style: normal; font-weight: 600; line-height: 120%;">${data.tax}</span>
                </div>
                <div style="height:1px; border-bottom: 1px solid #D7DAE0; padding-top: 6px;"></div>
                <div style="display: flex; justify-content: space-between; margin-top: 6px;">
                    <span style="color: #191919; font-size: 10px; font-style: normal; font-weight: 600; line-height: 120%;">Total</span>
                    <span style="color: #191919; font-size: 10px; font-style: normal; font-weight: 600; line-height: 120%;">${data.total}</span>
                </div>
            </div>
        </div>
      </div>

      <!-- Footer -->
      <div style="display: flex; justify-content: space-between; align-items: flex-end; height: 180px;">
        <div style="display: flex; flex-direction: column; justify-content: flex-end;">
          <p style="color:#888; font-size:10px; font-weight:400; line-height:120%; margin-bottom:4px;">Presented by</p>
          <p style="color:#1A1C21; font-size:12px; font-weight:600; line-height:120%; margin-bottom:2px;">${company.businessName}</p>
          <p style="color:#1A1C21; font-size:10px; font-weight:600; line-height:120%; margin-bottom:25px;">${company.businessEmail}</p>
          <p style="color:#888; font-size:10px; font-weight:400; line-height:130%; margin-bottom:4px;">Terms & Conditions Applied</p>
          <p style="color:#1A1C21; font-size:10px; font-weight:400; line-height:130%;">Please reach our customer support for any queries.</p>
        </div>

        <div style="display: flex; flex-direction: column; justify-content: flex-end; align-items: center;">
          <img src="${images.qrCode}" alt="QR Code" style="width:122px; height:122px; padding:11px;" />
          <p style="color:#00C896; font-size:11px; text-align:center; max-width:106px;">Scan the code for installing eSIM.</p>
        </div>
      </div>
    </div>
  `;
};

const createPDFFromCanvas = (canvas) => {
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "pt", "a4");
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  return pdf;
};

export const formatInvoiceData = (userDetails) => {
  return {
    userName: userDetails?.user?.name || "User",
    userPhone: userDetails?.user?.phone || "N/A",
    invoiceNumber: userDetails?.invoiceNumber || "INV-0001",
    invoiceDate: new Date(
      userDetails?.order?.created_at * 1000
    ).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    isPercentage: userDetails?.evaluated_tax?.tax_rate_type === "percentage",
    quantity: 1,
    packageName: userDetails?.package?.name || "Package Name",
    rate: userDetails?.package?.rate || "N/A",
    amount: userDetails?.amount || "N/A",
    tax: userDetails?.tax || "N/A",
    total: userDetails?.total || 0,
    iccid: userDetails?.iccid || "ICCID",
  };
};
