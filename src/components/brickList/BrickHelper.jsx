import SomethingWrong from "../shared/SomethingWrong";
import BrickSkeleton from "./BrickSkeleton";

function BrickHelper({
  isFetching = false,
  isError = false,
  error,
  children,
}) {
  if (isFetching) {
    return <BrickSkeleton />;
  } else if (isError) {
    return (
      <div className="h-full text-center text-lg font-medium flex items-center flex-1 justify-center text-error-100">
        <SomethingWrong />
      </div>
    );
  } else {
    return children;
  }
}

export default BrickHelper;