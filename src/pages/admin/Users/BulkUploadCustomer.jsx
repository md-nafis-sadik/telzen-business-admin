import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBulkCreateCustomersMutation } from "@/features/inventory/customerApi";
import { errorNotify, successNotify, adminRouteLinks } from "@/services";
import * as XLSX from "xlsx";
import { Upload } from "lucide-react";

function BulkUploadCustomer() {
  const navigate = useNavigate();
  const [bulkCreateCustomers, { isLoading }] = useBulkCreateCustomersMutation();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleBack = () => {
    navigate(adminRouteLinks.usersActive.path);
  };

  const handleDownloadSample = () => {
    // Create sample data
    const sampleData = [
      {
        Name: "John Doe",
        Email: "john.doe@example.com",
        "Country Code": "US",
        "Country Name": "United States",
        Group: "Group Name (Optional)",
      },
      {
        Name: "Jane Smith",
        Email: "jane.smith@example.com",
        "Country Code": "AU",
        "Country Name": "Australia",
        Group: "",
      },
    ];

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(sampleData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Customers");

    // Download file
    XLSX.writeFile(wb, "customer_sample.xlsx");
  };

  const parseExcelFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);

          // Transform data to match API format
          const customers = jsonData.map((row) => ({
            name: row.Name || row.name,
            email: row.Email || row.email,
            country: {
              code: (
                row["Country Code"] ||
                row.country_code ||
                "US"
              ).toUpperCase(),
              name: row["Country Name"] || row.country_name || "United States",
            },
            ...(row.Group || row.group
              ? { group: row.Group || row.group }
              : {}),
          }));

          resolve(customers);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  const handleFileSelect = async (file) => {
    if (!file) return;

    const validTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];

    if (
      !validTypes.includes(file.type) &&
      !file.name.match(/\.(xlsx|xls|csv)$/i)
    ) {
      errorNotify("Please upload a valid CSV or Excel file");
      return;
    }

    setSelectedFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreedToTerms) {
      errorNotify("Please agree to Terms & Conditions");
      return;
    }

    if (!selectedFile) {
      errorNotify("Please select a file to upload");
      return;
    }

    try {
      const customers = await parseExcelFile(selectedFile);

      if (customers.length === 0) {
        errorNotify("No valid customer data found in file");
        return;
      }

      const result = await bulkCreateCustomers({
        customer: customers,
      }).unwrap();

      if (result.success) {
        successNotify(
          result.message ||
            `${customers.length} customers uploaded successfully!`,
        );
        navigate(adminRouteLinks.usersActive.path);
      }
    } catch (error) {
      console.error("Failed to upload customers:", error);
      const errorMsg =
        error?.data?.message ||
        error?.error?.data?.message ||
        "Failed to upload customers";
      errorNotify(errorMsg);
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col gap-6">
      {/* Main Content Card */}
      <div className="w-full bg-white rounded-3xl px-6 py-8">
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-[32px] font-[900] font-barlowCondensed">
                BULK UPLOAD
              </h2>
              <p className="text-text-700 text-base">
                Upload more customers easily
              </p>
            </div>
            <button
              type="button"
              onClick={handleDownloadSample}
              className="text-[#2D8EFF] font-semibold hover:underline"
            >
              Download Sample File
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* File Upload Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-lg px-4 transition-colors ${
                isDragging
                  ? "border-main-700 bg-[#EAFFF7]"
                  : "border-main-700 bg-main-50/30 hover:bg-main-50/50"
              }`}
            >
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col gap-3 justify-center items-center min-h-[84px]">
                {selectedFile ? (
                  <div className="w-full">
                    <p className="text-lg font-semibold">{selectedFile.name}</p>
                    <p className="text-sm text-[#0A0A0A] mt-1">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                    <p className="text-sm text-[#0A0A0A] mt-2">
                      Click to change file
                    </p>
                  </div>
                ) : (
                  <div className="text-start w-full">
                    <p className="text-base text-[#0A0A0A] font-medium">
                      UPLOAD DOCUMENT (CSV, Excel File)
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                id="terms-checkbox-bulk"
                className="mt-1 w-4 h-4 text-main-700 border-gray-300 rounded focus:ring-main-700"
              />
              <label htmlFor="terms-checkbox-bulk" className="text-sm">
                By creating an account, you agree to our{" "}
                <span className="text-main-700 cursor-pointer">
                  Terms & Conditions
                </span>{" "}
                and{" "}
                <span className="text-main-700 cursor-pointer">
                  Privacy Policy
                </span>
              </label>
            </div>

            <div className="flex gap-4 max-w-[548px]">
              <button
                type="button"
                onClick={handleBack}
                disabled={isLoading}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-full hover:bg-gray-50 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading || !agreedToTerms || !selectedFile}
                className="flex-1 px-6 py-3 bg-main-700 text-white rounded-full hover:bg-main-600 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Uploading..." : "Confirm"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BulkUploadCustomer;
