import { ArrowLeftIconSvg } from "@/services";
import { Link } from "react-router-dom";

function BackToPrev({
  path = "/",
  title = "",
  wrapperClass = "",
  titleClass = "",
}) {
  return (
    <Link to={path} className={`flex items-center ${wrapperClass}`}>
      <ArrowLeftIconSvg />
    </Link>
  );
}

export default BackToPrev;
