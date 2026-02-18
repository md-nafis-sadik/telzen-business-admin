import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { BRICK_TYPE_OPTIONS } from "../data";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { qrCode } from "../images";
import moment from "moment";

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

// Currncy helper
let currentCurrency = "USD";

const CURRENCY_SYMBOLS = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  BDT: "৳",
};

// Setter for currency
export const setCurrency = (currencyCode) => {
  if (CURRENCY_SYMBOLS[currencyCode]) {
    currentCurrency = currencyCode;
  } else {
    console.warn(`Unsupported currency: ${currencyCode}`);
  }
};

// Get current symbol
export const getSymbol = (currencyCode) =>
  CURRENCY_SYMBOLS[currencyCode || currentCurrency] ||
  currencyCode ||
  currentCurrency;

// Format amount with current currency
export const format = (amount) => `${getSymbol()}${amount.toFixed(2)}`;

// Export current currency (read-only)
export const currency = () => currentCurrency;

export const formatDate = (unixTimestamp, formatStr = "DD-MM-YYYY") => {
  if (!unixTimestamp) return "-";
  return moment.unix(unixTimestamp).format(formatStr);
};

// Helper function to convert image URL to base64 using multiple proxy attempts
const imageUrlToBase64 = async (url) => {
  // List of CORS proxies to try in order
  const proxies = [
    `https://corsproxy.io/?${encodeURIComponent(url)}`,
    `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
    url,
  ];

  // Try each proxy
  for (let i = 0; i < proxies.length; i++) {
    try {
      const response = await fetch(proxies[i], {
        mode: "cors",
        cache: "no-cache",
      });

      if (!response.ok) {
        continue;
      }

      const blob = await response.blob();

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.log(`Attempt ${i + 1} error:`, error.message);
      if (i === proxies.length - 1) {
        return new Promise((resolve) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => {
            try {
              const canvas = document.createElement("canvas");
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0);
              const base64 = canvas.toDataURL("image/png");
              console.log("Image element method succeeded");
              resolve(base64);
            } catch (err) {
              console.error("Canvas conversion failed:", err);
              resolve(null);
            }
          };
          img.onerror = () => {
            console.error("All methods failed to load QR code");
            resolve(null);
          };
          img.src = url;
        });
      }
    }
  }

  return null;
};

// Helper function to wait for all images to load
const waitForImagesToLoad = (container) => {
  const images = container.getElementsByTagName("img");
  const promises = Array.from(images).map((img) => {
    if (img.complete) return Promise.resolve();
    return new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = resolve;
    });
  });
  return Promise.all(promises);
};

export const generateInvoicePDF = async (
  invoiceData,
  images,
  companyInfo = {},
  errorCallback = null,
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

    // Download QR code separately to avoid canvas taint
    let qrCodeBase64 = null;
    const qrCodeUrl = invoiceData.qrCodeUrl;

    if (qrCodeUrl && qrCodeUrl.startsWith("http")) {
      try {
        qrCodeBase64 = await imageUrlToBase64(qrCodeUrl);
      } catch (error) {
        console.error("Failed to fetch QR code:", error);
      }
    }

    const invoiceHTML = generateInvoiceHTML(
      { ...invoiceData, qrCodeUrl: null },
      images,
      defaultCompanyInfo,
    );

    const tempDiv = createTempContainer(invoiceHTML);
    document.body.appendChild(tempDiv);

    await waitForImagesToLoad(tempDiv);
    await new Promise((resolve) => setTimeout(resolve, 300));

    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      logging: true,
      useCORS: true,
      allowTaint: false,
      backgroundColor: "#ffffff",
      imageTimeout: 15000,
    });

    const pdf = createPDFFromCanvas(canvas);

    if (qrCodeBase64 && qrCodeBase64.startsWith("data:image")) {
      try {
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        // Position QR code in bottom right to match the HTML layout
        const qrSize = 105; // Size in PDF units (matching HTML: 105px)
        const xPos = pdfWidth - qrSize - 48; // 48 units from right edge
        const yPos = pdfHeight - qrSize - 75; // Position above bottom edge
        pdf.addImage(qrCodeBase64, "PNG", xPos, yPos, qrSize, qrSize);
      } catch (error) {
        console.error("Failed to add QR code to PDF:", error);
      }
    }

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
                <div style="color: #888; font-size: 10px; font-weight: 400; line-height: 130%; margin-bottom: 4px;">Invoice number</div>
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
                    <td style="color: #191919; font-size: 10px; font-style: normal; font-weight: 400; line-height: 130%;">${data.currency}${data.rate}</td>
                    <td style="color: #191919; font-size: 10px; font-style: normal; font-weight: 400; text-align: right; line-height: 130%;">${data.currency}${data.amount}</td>
                </tr>
            </tbody>
        </table>

        <!-- Totals -->
        <div style="display: flex; justify-content: flex-end; margin-bottom: 60px;">
            <div style="width: 240px; font-size: 12px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                    <span style="color: #191919; font-size: 10px; font-style: normal; font-weight: 600; line-height: 120%;">Subtotal</span>
                    <span style="color: #191919; font-size: 10px; font-style: normal; font-weight: 600; line-height: 120%;">${data.currency}${data.amount}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                    <span style="color: #191919; font-size: 10px; font-style: normal; font-weight: 600; line-height: 120%;">Tax</span>
                    <span style="color: #191919; font-size: 10px; font-style: normal; font-weight: 600; line-height: 120%;">${data.currency}${data.tax}</span>
                </div>
                <div style="height:1px; border-bottom: 1px solid #D7DAE0; padding-top: 6px;"></div>
                <div style="display: flex; justify-content: space-between; margin-top: 6px;">
                    <span style="color: #191919; font-size: 10px; font-style: normal; font-weight: 600; line-height: 120%;">Total</span>
                    <span style="color: #191919; font-size: 10px; font-style: normal; font-weight: 600; line-height: 120%;">${data.currency}${data.total}</span>
                </div>
            </div>
        </div>
      </div>

      <!-- Footer -->
      <div style="display: flex; justify-content: space-between; align-items: flex-end; height: 180px;">
        <div style="display: flex; flex-direction: column; justify-content: flex-end;">
          <p style="color:#888; font-size:10px; font-weight:400; line-height:120%; margin-bottom:4px;">Presented by</p>
          <p style="color:#1A1C21; font-size:12px; font-weight:600; line-height:120%; margin-bottom:2px;">${company.businessName}</p>
          <p style="color:#1A1C21; font-size:10px; font-weight:400; line-height:120%; margin-bottom:25px;">${company.businessEmail}</p>
          <p style="color:#888; font-size:10px; font-weight:400; line-height:130%; margin-bottom:4px;">Terms & Conditions Applied</p>
          <p style="color:#1A1C21; font-size:10px; font-weight:400; line-height:130%;">Please reach our customer support for any queries.</p>
        </div>

        <div style="display: flex; flex-direction: column; justify-content: flex-end; align-items: center;">
          ${data.qrCodeUrl ? `<img src="${data.qrCodeUrl}" alt="QR Code" style="width:122px; height:122px; padding:11px; object-fit: contain; display: block;" />` : '<div style="width:122px; height:122px;"></div>'}
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
    userName: userDetails?.customer?.name || "User",
    userPhone: userDetails?.customer?.phone || "N/A",
    userEmail: userDetails?.customer?.email || "N/A",
    invoiceNumber: userDetails?.evaluated_tax?.order_uid || "INV-0001",
    invoiceDate:
      moment
        .unix(userDetails?.evaluated_tax?.order_created_at)
        .format("DD MMM, YYYY") ||
      moment.unix(userDetails?.created_at).format("DD MMM, YYYY"),
    isPercentage: userDetails?.evaluated_tax?.tax_rate_type === "percentage",
    quantity: 1,
    packageName: userDetails?.package?.name || "Package Name",
    rate: userDetails?.evaluated_tax?.payment_amount_without_tax || "N/A",
    amount: userDetails?.evaluated_tax?.payment_amount_without_tax || "N/A",
    tax: userDetails?.evaluated_tax?.tax_amount || 0,
    total: userDetails?.evaluated_tax?.payment_amount_with_tax || 0,
    iccid: userDetails?.iccid || "ICCID",
    qrCodeUrl: userDetails?.qr_code_url,
    currency: getSymbol(),
  };
};

export const formatData = (mb) =>
  mb >= 1024 ? `${(mb / 1024).toFixed(2)}GB` : `${mb}MB`;
