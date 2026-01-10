import SomethingWrong from "../shared/SomethingWrong";
import StaffDetailsSkeleton from "./StaffDetailsSkeleton";

function StaffDetailsHelper({
  isFetching = false,
  isError = false,
  error,
  children,
}) {
  if (isFetching) {
    return <StaffDetailsSkeleton />;
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

export default StaffDetailsHelper;
