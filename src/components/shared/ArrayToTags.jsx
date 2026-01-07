const ArrayToTags = ({ arr = [] }) => {
  if (!Array.isArray(arr) && arr.length === 0) return "-";

  const colors = [
    "bg-green-100 text-white",
    "bg-red-300 text-white",
    "bg-blue-200 text-white",
    "bg-yellow-100 text-white",
  ];

  return (
    <div className="flex flex-wrap gap-0.5">
      {arr.filter(Boolean).map((item, index) => (
        <span
          key={index}
          className={`inline-block px-2 gap-2 py-1 text-xs font-light rounded-3xl ${
            colors[index % colors.length]
          } `}
        >
          {item}
        </span>
      ))}
    </div>
  );
};

export default ArrayToTags;
