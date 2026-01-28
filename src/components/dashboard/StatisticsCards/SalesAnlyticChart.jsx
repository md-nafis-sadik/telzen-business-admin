import { useGetOrderStatisticsQuery } from "@/features/dashboard/dashboardApi";
import { cn } from "@/lib/utils";
import React, { useMemo, useState } from "react";
import {
  CartesianGrid,
  ComposedChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import SelectInput from "@/components/shared/SelectInput";
import { getSymbol } from "@/services";

function SalesAnlyticChart({ data = [], wrapper = "" }) {
  const [filter, setFilter] = useState("6_months");
  const { data: apiData, isFetching } = useGetOrderStatisticsQuery(filter);

  const chartData = useMemo(() => {
    return apiData?.data || [];
  }, [apiData]);

  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;

  const filterOptions = [
    { id: "today", timestamp: "Today" },
    { id: "this_week", timestamp: "This Week" },
    { id: "this_month", timestamp: "This Month" },
    { id: "last_month", timestamp: "Last Month" },
    { id: "6_months", timestamp: "Last 6 Months" },
    { id: String(currentYear), timestamp: String(currentYear) },
    { id: String(lastYear), timestamp: String(lastYear) },
  ];

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const formatXAxis = (value) => {
    if (typeof value === "number") {
      return value;
    }
    if (typeof value === "string") {
      return value.substring(0, 3);
    }
    return value;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0]?.payload;
      return (
        <div className="relative">
          <div
            style={{
              backgroundColor: "#FFB94A",
              border: "none",
              borderRadius: "4px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              color: "white",
              fontSize: "13px",
              padding: "6px 12px",
              fontWeight: "500",
            }}
          >
            {/* <p style={{ margin: 0 }}>
              {data?.name} {data?.year && `(${data.year})`}
            </p> */}
            <p style={{ margin: 0 }}>
              Total Sales: {getSymbol(data?.currency) || "$"}
              {payload[0].value}
            </p>
          </div>
          {/* Triangle pointer */}
          <div
            style={{
              position: "absolute",
              bottom: "-5px",
              left: "15%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid #FFB94A",
            }}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className={cn("w-full lg:w-[60%] rounded-2xl", wrapper)}>
      <div className="w-full  bg-white p-4 sm:p-6 rounded-2xl flex flex-col justify-between gap-6 sm:gap-8 md:gap-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <h2 className="text-text-700 text-lg font-bold leading-normal">
              Sales
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-text-500 text-sm">Showing: </div>
            <SelectInput
              data={filterOptions}
              value={filter}
              onValueChange={handleFilterChange}
              placeHolder="Filter by status"
              labelKey="timestamp"
              selector="id"
              triggerClassName="w-26 !border-none p-1 font-semibold truncate !border-white text-sm"
            />
          </div>
        </div>

        <section className="flex items-center justify-center h-64 w-full focus-visible:outline-none">
          {/* overflow-x-auto overflow-y-hidden*/}
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              height={252}
              data={chartData}
              margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="name"
                axisLine={true}
                tickLine={true}
                tickFormatter={formatXAxis}
                angle={0}
                textAnchor="middle"
              />
              <YAxis
                tickFormatter={(value) => `${value}`}
                allowDecimals={false}
                axisLine={true}
                tickLine={true}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill="#00C896" radius={[0, 0, 0, 0]} />
            </ComposedChart>
          </ResponsiveContainer>
        </section>
      </div>
    </div>
  );
}

export default React.memo(SalesAnlyticChart);
