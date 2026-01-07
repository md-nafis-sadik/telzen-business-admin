import * as XLSX from "xlsx";

export const exportToExcel = (data, filename = "export", headers = null) => {
  try {
    if (!data || data.length === 0) {
      console.warn("No data to export");
      return;
    }

    let exportData = data;

    if (headers && headers.length > 0) {
      exportData = data.map((item) => {
        const transformedItem = {};
        headers.forEach((header) => {
          transformedItem[header.label] = item[header.key] || "";
        });
        return transformedItem;
      });
    }

    const ws = XLSX.utils.json_to_sheet(exportData);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    const timestamp = new Date().toISOString().slice(0, 10);
    const finalFilename = `${filename}_${timestamp}.xlsx`;

    XLSX.writeFile(wb, finalFilename);
  } catch (error) {
    console.error("Error exporting to Excel:", error);
    throw new Error("Failed to export data to Excel");
  }
};

export const exportCustomersToExcel = (customers, type = "active") => {
  const headers = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "address", label: "Address" },
    { key: "division", label: "Division" },
    { key: "district", label: "District" },
    { key: "upazila", label: "Upazila" },
    { key: "status", label: "Status" },
    { key: "created_at", label: "Created Date" },
  ];

  const filename = `customers_${type}`;
  exportToExcel(customers, filename, headers);
};
