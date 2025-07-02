export const customers = [
  {
    id: "cus_1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  },
  {
    id: "cus_2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "987-654-3210",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    id: "cus_3",
    name: "Sam Wilson",
    email: "sam.wilson@example.com",
    phone: "555-123-4567",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
  },
];

export const measurements = [
  {
    id: "mes_1",
    customerId: "cus_1",
    date: "2023-10-26",
    details: { neck: 15.5, chest: 40, waist: 32, sleeve: 34, inseam: 32 },
  },
  {
    id: "mes_2",
    customerId: "cus_1",
    date: "2024-01-15",
    details: { neck: 15.5, chest: 40.5, waist: 32.5, sleeve: 34, inseam: 32 },
  },
  {
    id: "mes_3",
    customerId: "cus_2",
    date: "2023-11-01",
    details: { bust: 36, waist: 28, hips: 38, dressLength: 42 },
  },
  {
    id: "mes_4",
    customerId: "cus_3",
    date: "2024-02-20",
    details: { chest: 42, waist: 34, inseam: 33, shoulder: 18 },
  },
];

export const orders = [
  {
    id: "ord_1",
    customerId: "cus_1",
    date: "2024-01-15",
    item: "Custom Suit",
    status: "In Progress",
  },
  {
    id: "ord_2",
    customerId: "cus_1",
    date: "2023-10-26",
    item: "Linen Shirt",
    status: "Completed",
  },
  {
    id: "ord_3",
    customerId: "cus_2",
    date: "2023-11-01",
    item: "Evening Gown",
    status: "Ready for Pickup",
  },
  {
    id: "ord_4",
    customerId: "cus_3",
    date: "2024-02-20",
    item: "Tweed Jacket",
    status: "Pending",
  },
];
