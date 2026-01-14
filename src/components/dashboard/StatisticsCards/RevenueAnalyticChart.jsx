import { useGetRevenueStatisticsQuery } from "@/features/dashboard/dashboardApi";
import { cn } from "@/lib/utils";
import React, { useMemo, useState } from "react";
import {
  Line,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import SelectInput from "@/components/shared/SelectInput";

function RevenueAnalyticChart({ data = [], wrapper = "" }) {
  const [filter, setFilter] = useState("last6months");
  const { data: apiData, isFetching } = useGetRevenueStatisticsQuery(filter);

  const chartData = useMemo(() => {
    return apiData?.data?.chart_data || [];
  }, [apiData]);

  const filterOptions = [
    { id: "last6months", timestamp: "Last 6 Months" },
    { id: "yearly", timestamp: "Yearly" },
  ];

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const formatYAxis = (value) => {
    if (value >= 1_000_000_000) {
      return `${(value / 1_000_000_000).toFixed(1)}B`;
    } else if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(1)}M`;
    } else if (value >= 1_000) {
      return `${(value / 1_000).toFixed(1)}K`;
    }
    return value;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
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
            {payload.map((entry, index) => (
              <p key={index} style={{ margin: 0 }}>
                Revenue: ${entry.value}
              </p>
            ))}
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
    <div
      className={cn(
        "w-full lg:w-[35%] rounded-2xl max-w-[772px]",
        wrapper
      )}
    >
      <div className="w-full bg-white p-4 sm:p-6 rounded-2xl flex flex-col justify-between gap-6 sm:gap-8 md:gap-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <h2 className="text-text-700 text-lg font-bold leading-normal">
              Revenue
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
              triggerClassName="w-26 !border-none p-1 font-semibold truncate !border-white"
            />
          </div>
        </div>

        <section className="flex items-center justify-center h-64 focus:outline-none">
          {/* overflow-x-auto overflow-y-hidden*/}
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart height={252} data={chartData} margin={0}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" axisLine={false} tickLine={true} />
              <YAxis
                tickFormatter={formatYAxis}
                allowDecimals={false}
                axisLine={true}
                tickLine={true}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="linear"
                dataKey="revenue"
                stroke="#EA3218"
                strokeWidth={1}
                dot={{ fill: "white", strokeWidth: 1, r: 3 }}
                activeDot={{ r: 6, stroke: "#EA3218", strokeWidth: 1 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </section>
      </div>
    </div>
  );
}

export default React.memo(RevenueAnalyticChart);
