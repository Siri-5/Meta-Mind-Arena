'use client'
import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import "pdfjs-dist/build/pdf.worker";

const PdfUploader = ({ onPdfTextExtracted }) => {
  const [error, setError] = useState("");

  const handlePdfUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const typedArray = new Uint8Array(e.target.result);
          const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;

          let extractedText = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
              .map((item) => item.str)
              .join(" ");
            extractedText += pageText + " ";
          }

          onPdfTextExtracted(extractedText);
        };
        reader.readAsArrayBuffer(file);
      } catch (error) {
        setError("Error extracting text from PDF. Please try another file.");
      }
    } else {
      setError("Please upload a valid PDF file.");
    }
  };

  return (
    <div className="text-center">
      <input
        type="file"
        accept="application/pdf"
        onChange={handlePdfUpload}
        className="hidden"
        id="pdfUpload"
      />
      <label
        htmlFor="pdfUpload"
        className="cursor-pointer bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all"
      >
        Upload PDF 📄
      </label>
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
};

export default PdfUploader;


// import React, { useState } from "react";

// const PdfUploader = ({ onPdfTextExtracted, className }) => {
//   const [file, setFile] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files?.[0];
//     setError(null);

//     if (!selectedFile) {
//       return;
//     }

//     if (!selectedFile.type.includes("pdf")) {
//       setError("Please select a PDF file");
//       return;
//     }

//     setFile(selectedFile);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setError("Please select a PDF file first");
//       return;
//     }

//     try {
//       setIsLoading(true);
//       setError(null);

//       // Dynamically import PdfService to avoid loading it until needed
//       const { PdfService } = await import("./services/PdfService");
//       const extractedText = await PdfService.extractTextFromPdf(file);

//       onPdfTextExtracted(extractedText);
//     } catch (err) {
//       console.error("Error processing PDF:", err);
//       setError("Failed to process PDF. Please try another file.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className={`flex flex-col space-y-4 ${className}`}>
//       {/* PDF Upload Input */}
//       <div className="flex items-center space-x-2">
//         <label
//           className="border-2 border-gray-300 px-3 py-2 cursor-pointer flex-1 text-center rounded-md hover:bg-gray-100"
//         >
//           {file ? file.name : "Choose PDF file"}
//           <input
//             type="file"
//             accept=".pdf"
//             onChange={handleFileChange}
//             className="hidden"
//           />
//         </label>

//         {/* Upload Button */}
//         <button
//           onClick={handleUpload}
//           disabled={!file || isLoading}
//           className={`px-4 py-2 rounded-md text-white ${
//             !file || isLoading
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-blue-600 hover:bg-blue-700"
//           }`}
//         >
//           {isLoading ? "Processing..." : "Upload"}
//         </button>
//       </div>

//       {/* Error Message */}
//       {error && <p className="text-red-500 text-sm">{error}</p>}

//       {/* File Details */}
//       {file && !error && (
//         <p className="text-sm text-gray-600">
//           Selected: {file.name} ({Math.round(file.size / 1024)} KB)
//         </p>
//       )}
//     </div>
//   );
// };

// export default PdfUploader;
