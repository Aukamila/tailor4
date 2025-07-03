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
  {
    id: "cus_4",
    name: "Anna Kendrick",
    email: "anna.k@example.com",
    phone: "555-867-5309",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026706d",
  }
];

export const measurements = [
  {
    id: "mes_1",
    customerId: "cus_1",
    orderId: "ord_2",
    date: "2023-10-26",
    details: { 
      height: 68, neckWidth: 15.5, shoulder: 18, armholeCurve: 19, upperarmWidth: 13, chest: 40, underbust: 38, nippleToNipple: 8, waist: 32, hips: 40, waistToKneeLength: 22, waistToAnkle: 40, thighCirc: 24, ankleCirc: 10, shoulderToWaist: 19, shoulderToAnkle: 52, shoulderToWrist: 24, shoulderToElbow: 14, innerArmLength: 18, outseamLength: 42, inseamLength: 32, backRise: 15, frontRise: 11, singleShoulder: 7, frontDrop: 3, backDrop: 1.5, armholeCurveStraight: 18, neckBandWidth: 2, collarWidth: 3, collarPoint: 3.5, sleeveLength: 34, sleeveOpen: 9, cuffHeight: 2.5, waistBand: 1.5, legOpen: 8, seatLength: 25 
    },
  },
  {
    id: "mes_2",
    customerId: "cus_1",
    orderId: "ord_1",
    date: "2024-01-15",
    details: { 
      height: 68, neckWidth: 15.5, shoulder: 18.5, armholeCurve: 19.5, upperarmWidth: 13.5, chest: 40.5, underbust: 38.5, nippleToNipple: 8, waist: 32.5, hips: 40.5, waistToKneeLength: 22, waistToAnkle: 40, thighCirc: 24.5, ankleCirc: 10, shoulderToWaist: 19, shoulderToAnkle: 52, shoulderToWrist: 24.5, shoulderToElbow: 14.5, innerArmLength: 18, outseamLength: 42.5, inseamLength: 32, backRise: 15.5, frontRise: 11.5, singleShoulder: 7.5, frontDrop: 3, backDrop: 1.5, armholeCurveStraight: 18.5, neckBandWidth: 2, collarWidth: 3, collarPoint: 3.5, sleeveLength: 34.5, sleeveOpen: 9, cuffHeight: 2.5, waistBand: 1.5, legOpen: 8, seatLength: 25.5 
    },
  },
  {
    id: "mes_3",
    customerId: "cus_2",
    orderId: "ord_3",
    date: "2023-11-01",
    details: { 
      height: 65, neckWidth: 14, shoulder: 16, armholeCurve: 17, upperarmWidth: 11, chest: 36, underbust: 30, nippleToNipple: 7.5, waist: 28, hips: 38, waistToKneeLength: 20, waistToAnkle: 38, thighCirc: 22, ankleCirc: 9, shoulderToWaist: 17, shoulderToAnkle: 50, shoulderToWrist: 22, shoulderToElbow: 13, innerArmLength: 17, outseamLength: 40, inseamLength: 30, backRise: 14, frontRise: 10, singleShoulder: 6, frontDrop: 4, backDrop: 2, armholeCurveStraight: 16, neckBandWidth: 1.5, collarWidth: 2.5, collarPoint: 3, sleeveLength: 32, sleeveOpen: 8, cuffHeight: 2, waistBand: 1.5, legOpen: 7, seatLength: 24, dressLength: 42 
    },
  },
  {
    id: "mes_4",
    customerId: "cus_3",
    orderId: "ord_4",
    date: "2024-02-20",
    details: { 
      height: 70, neckWidth: 16, shoulder: 18, armholeCurve: 20, upperarmWidth: 14, chest: 42, underbust: 40, nippleToNipple: 8.5, waist: 34, hips: 42, waistToKneeLength: 23, waistToAnkle: 41, thighCirc: 25, ankleCirc: 11, shoulderToWaist: 20, shoulderToAnkle: 54, shoulderToWrist: 25, shoulderToElbow: 15, innerArmLength: 19, outseamLength: 43, inseamLength: 33, backRise: 16, frontRise: 12, singleShoulder: 7.5, frontDrop: 3.5, backDrop: 2, armholeCurveStraight: 19, neckBandWidth: 2, collarWidth: 3.5, collarPoint: 4, sleeveLength: 35, sleeveOpen: 9.5, cuffHeight: 2.5, waistBand: 2, legOpen: 8.5, seatLength: 26 
    },
  },
  {
    id: "mes_5",
    customerId: "cus_4",
    orderId: "ord_7",
    date: "2024-03-10",
    details: { 
      height: 66, neckWidth: 13.5, shoulder: 15.5, chest: 35, waist: 27, hips: 37, dressLength: 38 
    },
  },
];

export const orders = [
  {
    id: "ord_1",
    customerId: "cus_1",
    jobNumber: "J001",
    requestDate: "2024-01-15",
    item: "Custom Suit",
    status: "Stitching",
    paymentStatus: "Partial",
  },
  {
    id: "ord_2",
    customerId: "cus_1",
    jobNumber: "J002",
    requestDate: "2023-10-26",
    item: "Linen Shirt",
    status: "Completed",
    paymentStatus: "Paid",
  },
  {
    id: "ord_3",
    customerId: "cus_2",
    jobNumber: "J003",
    requestDate: "2023-11-01",
    item: "Evening Gown",
    status: "Ready for Pickup",
    paymentStatus: "Paid",
  },
  {
    id: "ord_4",
    customerId: "cus_3",
    jobNumber: "J004",
    requestDate: "2024-02-20",
    item: "Tweed Jacket",
    status: "Pending",
    paymentStatus: "Pending",
  },
  {
    id: "ord_5",
    customerId: "cus_2",
    jobNumber: "J005",
    requestDate: "2024-03-01",
    item: "Blouse",
    status: "Cutting",
    paymentStatus: "Paid",
  },
  {
    id: "ord_6",
    customerId: "cus_1",
    jobNumber: "J006",
    requestDate: "2024-03-05",
    item: "Trousers",
    status: "Finishing",
    paymentStatus: "Paid",
  },
  {
    id: "ord_7",
    customerId: "cus_4",
    jobNumber: "J007",
    requestDate: "2024-03-10",
    item: "Summer Dress",
    status: "Pending",
    paymentStatus: "Pending",
  },
];
