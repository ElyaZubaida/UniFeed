export type DonorType = 'vendor' | 'club' | 'kolej' | 'ngo' | 'student';

export type Listing = {
  id: string;
  name: string;
  type: 'surplus' | 'free';
  price?: number;
  originalPrice?: number;
  donor: string;
  donorType: DonorType;
  verified: boolean;
  location: string;
  timePrepared: string;
  quantity: number;
  image: string;
  description: string;
};

export type Reservation = {
  id: string;
  listing: Listing;
  status: 'active' | 'claimed' | 'cancelled' | 'expired';
  reservedAt: string;
  pickupCode: string;
};

export const SURPLUS_LISTINGS: Listing[] = [
  {
    id: 's1',
    name: 'Nasi Lemak Set',
    type: 'surplus',
    price: 2.50,
    originalPrice: 5.00,
    donor: 'Warung Pak Din',
    donorType: 'vendor',
    verified: true,
    location: 'Kolej Delima Canteen',
    timePrepared: '11:30 AM',
    quantity: 8,
    image: 'https://images.unsplash.com/photo-1711633648854-50a30a6df74d?w=600&h=400&fit=crop&auto=format',
    description: 'Fresh nasi lemak with sambal, anchovies, cucumber, and half-boiled egg. Prepared this morning.',
  },
  {
    id: 's2',
    name: 'Mee Goreng Mamak',
    type: 'surplus',
    price: 3.00,
    originalPrice: 6.00,
    donor: 'Restoran Al-Salam',
    donorType: 'vendor',
    verified: true,
    location: 'Main Cafe, Blok A',
    timePrepared: '12:00 PM',
    quantity: 5,
    image: 'https://images.unsplash.com/photo-1761125064946-91354a5c65ac?w=600&h=400&fit=crop&auto=format',
    description: 'Stir-fried yellow noodles with egg, tofu, and spicy sambal sauce. Classic mamak style.',
  },
  {
    id: 's3',
    name: 'Ayam Masak Merah + Rice',
    type: 'surplus',
    price: 4.00,
    originalPrice: 8.00,
    donor: 'Kantin UiTM Cawangan',
    donorType: 'vendor',
    verified: true,
    location: 'Faculty of Business Cafe',
    timePrepared: '1:00 PM',
    quantity: 3,
    image: 'https://images.unsplash.com/photo-1542803417-f2be3270347d?w=600&h=400&fit=crop&auto=format',
    description: 'Tender chicken in rich red tomato gravy served with steamed white rice.',
  },
  {
    id: 's4',
    name: 'Bento Box Lunch Set',
    type: 'surplus',
    price: 3.50,
    originalPrice: 7.00,
    donor: 'Cafe Selera',
    donorType: 'vendor',
    verified: true,
    location: 'Student Plaza, Level 1',
    timePrepared: '12:30 PM',
    quantity: 6,
    image: 'https://images.unsplash.com/photo-1709111642708-8c1893dd2c66?w=600&h=400&fit=crop&auto=format',
    description: 'Balanced lunch box with rice, protein, and vegetable side dishes.',
  },
];

export const FREE_LISTINGS: Listing[] = [
  {
    id: 'f1',
    name: 'Kuih-Muih Assorted',
    type: 'free',
    donor: 'Kelab Seni Budaya UiTM',
    donorType: 'club',
    verified: true,
    location: 'Dewan Seri Budiman, Level 2',
    timePrepared: '2:00 PM',
    quantity: 30,
    image: 'https://images.unsplash.com/photo-1558689509-900d3d3cc727?w=600&h=400&fit=crop&auto=format',
    description: 'Assorted traditional Malay kuih leftover from our cultural event. Includes onde-onde, kuih lapis, and seri muka.',
  },
  {
    id: 'f2',
    name: 'Sandwich & Rolls',
    type: 'free',
    donor: 'English Language Society',
    donorType: 'club',
    verified: true,
    location: 'Faculty of Languages, Foyer',
    timePrepared: '3:00 PM',
    quantity: 20,
    image: 'https://images.unsplash.com/photo-1696677049263-cc38af1c7681?w=600&h=400&fit=crop&auto=format',
    description: 'Chicken and tuna sandwiches from our workshop. Freshly made, still good until 6PM.',
  },
  {
    id: 'f3',
    name: 'Nasi Briyani Pack',
    type: 'free',
    donor: 'Kolej Perindu',
    donorType: 'kolej',
    verified: true,
    location: 'Kolej Perindu Dewan Makan',
    timePrepared: '1:30 PM',
    quantity: 15,
    image: 'https://images.unsplash.com/photo-1648421778395-82d9881acf72?w=600&h=400&fit=crop&auto=format',
    description: 'Surplus nasi briyani from our monthly resident dinner. Come quick — packs going fast!',
  },
  {
    id: 'f4',
    name: 'Fruits & Bread Basket',
    type: 'free',
    donor: 'Ahmad Faris (Student)',
    donorType: 'student',
    verified: false,
    location: 'Library Block, Ground Floor',
    timePrepared: '4:00 PM',
    quantity: 10,
    image: 'https://images.unsplash.com/photo-1709111642691-ebc144470744?w=600&h=400&fit=crop&auto=format',
    description: 'Leftover fruits and bread from my group project presentation. Please help yourselves!',
  },
];

export const RESERVATIONS: Reservation[] = [
  {
    id: 'r1',
    listing: SURPLUS_LISTINGS[0],
    status: 'active',
    reservedAt: '2026-06-10T10:15:00',
    pickupCode: 'UF-4821',
  },
  {
    id: 'r2',
    listing: FREE_LISTINGS[2],
    status: 'active',
    reservedAt: '2026-06-10T11:30:00',
    pickupCode: 'UF-3367',
  },
  {
    id: 'r3',
    listing: SURPLUS_LISTINGS[1],
    status: 'claimed',
    reservedAt: '2026-06-09T09:00:00',
    pickupCode: 'UF-2290',
  },
  {
    id: 'r4',
    listing: FREE_LISTINGS[0],
    status: 'expired',
    reservedAt: '2026-06-08T14:00:00',
    pickupCode: 'UF-1155',
  },
  {
    id: 'r5',
    listing: SURPLUS_LISTINGS[2],
    status: 'cancelled',
    reservedAt: '2026-06-07T13:00:00',
    pickupCode: 'UF-0998',
  },
];
