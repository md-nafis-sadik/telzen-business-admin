import { cn } from "@/lib/utils";
import { OctagonAlert } from "lucide-react";

function ErrorUi({
  title = "Couldn't retrieve the data.",
  wrapper = "",
  description,
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        wrapper
      )}
    >
      <OctagonAlert size={54} className="text-red-400" />
      <div>
        <p className="text-2xl font-medium  text-text-600 mt-2">{title}</p>
      </div>
    </div>
  );
}

export default ErrorUi;
