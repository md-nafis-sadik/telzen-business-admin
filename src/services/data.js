const staffRole = [
  { id: "manager", label: "Manager" },
  { id: "customer_manager", label: "Customer Manager" },
];

const brickRole = [
  { id: "manager", label: "Manager" },
  { id: "customer_manager", label: "Customer Manager" },
];

export { staffRole, brickRole };

export const BRICK_TYPE_OPTIONS = [
  { id: "ek_no_et", label: "১ নং ইট" },
  { id: "dui_no_et", label: "২ নং ইট" },
  { id: "tin_no_et", label: "৩ নং ইট" },
  { id: "picket", label: "পিকেট" },
  { id: "adla", label: "আদলা" },
];

export const paymentStatusOptions = [
  { id: "paid", label: "Paid", value: "paid" },
  { id: "unpaid", label: "Unpaid", value: "unpaid" },
];

export const OrderStatusOptions = [
  {
    id: "pending",
    label: "Pending",
    sub_status: [
      { id: "unassign", label: "Unassign" },
      { id: "assign", label: "Assign" },
    ],
  },
  {
    id: "validation",
    label: "Validation",
    sub_status: [
      { id: "unpaid", label: "Unpaid" },
      { id: "paid", label: "Paid" },
    ],
  },
  {
    id: "processing",
    label: "Processing",
    sub_status: [
      { id: "delivery_processing", label: "Delivery Processing" },
      { id: "loading_vehicle", label: "Loading Vehicle" },
      { id: "delivery_ongoing", label: "Delivery Ongoing" },
    ],
  },
  {
    id: "completed",
    label: "Completed",
    sub_status: [{ id: "delivered", label: "Delivered" }],
  },
];
