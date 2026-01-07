import { cn, SpinnerAnimatedIcon } from "@/services";

function DashboardCard({
  title,
  amount,
  icon,
  wrapper,
  children,
  isFetching,
  className,
  animateClass,
}) {
  return (
    <section
      className={cn(`bg-white rounded-2xl px-6 py-7`, wrapper, className)}
    >
      <div className="flex flex-col items-start gap-6">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col gap-6 overflow-hidden truncate">
            {isFetching ? (
              <>
                <p className="self-stretch justify-start text-text-700 text-base font-normal leading-tight">
                  {title}
                </p>
                <SpinnerAnimatedIcon
                  className={cn("text-natural-700", animateClass)}
                />
              </>
            ) : (
              <>
                <p className="self-stretch justify-start text-text-700 text-base font-normal leading-tight">
                  {title}
                </p>
                <h2 className="self-stretch justify-start text-text-900 text-2xl font-bold leading-tight">
                  {amount}
                </h2>
              </>
            )}
          </div>

          {children}
        </div>
      </div>
    </section>
  );
}

export default DashboardCard;
