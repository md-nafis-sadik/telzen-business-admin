import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DownloadIconSvg } from "@/services";
import { useState } from "react";

function DocumentShow({ title = "Document.pdf", fileUrl = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const isPdf = fileUrl.toLowerCase().endsWith(".pdf");

  const shimmer = (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-pulse bg-gray-200 h-12 w-12 rounded-full" />
    </div>
  );

  return (
    <div className="flex gap-1 items-center">
      {/* <PdfIconSvg /> */}
      {/* <span className="justify-center text-black-300 text-lg font-normal leading-snug">
        {title}
      </span> */}

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
          setLoading(true); // reset loading on open
        }}
        className="flex items-center gap-2"
      >
        <DownloadIconSvg />
        <span className="text-sm text-gray-700 font-medium">
          Document Uploaded
        </span>
      </button>

      {/* Shadcn Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="p-0 gap-0 select-none rounded-2xl w-[90vw] max-w-4xl h-[80vh] flex flex-col">
          <DialogHeader className="border-b px-4 py-2 flex justify-between items-center">
            <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>

            {/* Download button */}
            {!isPdf && (
              <a
                href={fileUrl}
                download={title}
                className="ml-4 px-3 py-1 bg-blue-500 text-white rounded"
                target="_blank"
              >
                Download
              </a>
            )}
          </DialogHeader>

          {/* PDF or Image viewer */}
          <div className="flex-1 h-full overflow-hidden flex items-center justify-center p-2 relative">
            {loading && (
              <div className="absolute inset-0 flex flex-col items-center gap-4 justify-center bg-gray-200 rounded-2xl m-2">
                <p className="text-gray-300">Please Wait! Loading...</p>
                <div className="animate-pulse h-12 w-12 bg-gray-300 rounded-full" />
              </div>
            )}

            {isPdf ? (
              <iframe
                src={fileUrl}
                className="w-full h-full rounded-2xl"
                title="PDF Viewer"
                onLoad={() => setLoading(false)}
              />
            ) : (
              <img
                src={fileUrl}
                alt={title}
                className="max-w-full max-h-full object-contain rounded-2xl"
                onLoad={() => setLoading(false)}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DocumentShow;
