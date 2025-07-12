import * as pdfjs from "pdfjs-dist";

// Set PDF.js worker source
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export class PdfService {
  static async extractTextFromPdf(file) {
    try {
      // Load the PDF file
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

      // Extract text from all pages
      const maxPages = pdf.numPages;
      let fullText = "";

      for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        fullText += pageText + "\n";
      }

      return fullText;
    } catch (error) {
      console.error("Failed to extract text from PDF:", error);
      throw new Error("Failed to extract text from PDF");
    }
  }
}
