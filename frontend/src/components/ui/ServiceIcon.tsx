'use client';
import React from 'react';

interface ServiceIconProps {
  name: string;
  className?: string;
  size?: number;
}

const paths: Record<string, React.ReactNode> = {
  // Garments - Tops
  'Shirt': <><path d="M8 4L4 7v3h2v9h12V10h2V7l-4-3"/><path d="M8 4c0 2 1 3 4 3s4-1 4-3"/></>,
  'T-Shirt': <><path d="M8 3L4 7l2 1v11h12V8l2-1-4-4"/><path d="M8 3c0 2 1.5 3 4 3s4-1 4-3"/></>,
  'Kurta Men': <><path d="M8 3L4 7v2h2v12h12V9h2V7l-4-4"/><path d="M8 3c0 2.5 1 4 4 4s4-1.5 4-4"/><path d="M10 13h4"/></>,
  'Kurta Women': <><path d="M8 3L4 7v2h2v12h12V9h2V7l-4-4"/><path d="M8 3c0 2.5 1 4 4 4s4-1.5 4-4"/><path d="M12 13v6m-2 0h4"/></>,
  'Kurta Heavy': <><path d="M7 3L3 7v2h2v12h14V9h2V7l-4-4"/><path d="M7 3c0 3 1.5 4.5 5 4.5S17 6 17 3"/><path d="M10 13h4m-2-2v4"/></>,
  'Sweater': <><path d="M8 4L4 8v2h2v10h12V10h2V8l-4-4"/><path d="M8 4c0 2 1 3.5 4 3.5s4-1.5 4-3.5"/><path d="M4 12h2m12 0h2"/></>,
  'Sweat Shirt': <><path d="M7 4L3 8v2h2v10h14V10h2V8l-4-4"/><path d="M7 4c0 2.5 1.5 4 5 4s5-1.5 5-4"/><path d="M3 11h3m12 0h3"/></>,
  'Hoodie': <><path d="M8 4c-2 1-4 3-4 5v2h2v9h12v-9h2V9c0-2-2-4-4-5"/><path d="M8 4c0 2.5 1 4 4 4s4-1.5 4-4"/><path d="M7 4c-1 2-1 3-1 4h10c0-1 0-2-1-4"/></>,
  'Blouse': <><path d="M9 5L5 8v2h2v9h10v-9h2V8l-4-3"/><path d="M9 5c0 1.5 1 2.5 3 2.5s3-1 3-2.5"/><path d="M5 13h3m6 0h3"/></>,
  'Vest': <><path d="M8 4h8v16H8z"/><path d="M8 4c0 3-2 5-2 8h2m8-8c0 3 2 5 2 8h-2"/><path d="M10 4v2m4-2v2"/></>,
  'Waist Coat': <><path d="M8 4h8l1 4v12H7V8z"/><path d="M8 4L7 8m9-4l1 4"/><path d="M12 8v8m-2-4h4"/></>,

  // Jackets & Coats
  'Jacket': <><path d="M7 4L3 8v2h2v10h14V10h2V8l-4-4"/><path d="M7 4l1 5m9-5l-1 5"/><path d="M3 12h3m12 0h3"/></>,
  'Half Jacket': <><path d="M7 4L3 8v2h2v7h14v-7h2V8l-4-4"/><path d="M7 4l1 4m9-4l-1 4"/></>,
  'Jacket Hood': <><path d="M8 5c-1 1-3 2-3 4v2h2v9h14v-9h2V9c0-2-2-3-3-4"/><path d="M8 5c0 2 1 3.5 4 3.5s4-1.5 4-3.5"/><path d="M9 5c-1-1-2-1-3 0"/></>,
  'Coat': <><path d="M7 3L3 8v2h3v11h12V10h3V8l-4-5"/><path d="M7 3l2 4m8-4l-2 4"/><path d="M12 10v11"/></>,
  'Long Coat': <><path d="M7 3L3 8v2h3v13h12V10h3V8l-4-5"/><path d="M7 3l2 5m8-5l-2 5"/><path d="M12 10v13"/></>,
  'Half Coat': <><path d="M7 4L3 8v2h3v8h12v-8h3V8l-4-4"/><path d="M7 4l1 4m9-4l-1 4"/></>,
  'Leather Jacket': <><path d="M7 4L3 8v2h2v10h14V10h2V8l-4-4"/><path d="M7 4l1 4m9-4l-1 4"/><path d="M10 8l2 2 2-2m-2 2v8"/></>,
  'Riding Jacket': <><path d="M7 4L3 8v2h2v10h14V10h2V8l-4-4"/><path d="M7 4l1 4m9-4l-1 4"/><path d="M5 12h2m10 0h2m-9-2l2 2 2-2"/></>,
  'Sherwani': <><path d="M8 3L4 7v2h2v15h12V9h2V7l-4-4"/><path d="M8 3c0 2.5 1 4 4 4s4-1.5 4-4"/><path d="M12 9v11m-2-5h4m-2 5v2"/></>,

  // Bottoms
  'Pant': <><path d="M6 4h12v8l-3 8H9L6 12z"/><path d="M12 12v8"/><path d="M6 8h12"/></>,
  'Jeans': <><path d="M6 4h12v8l-3 8H9L6 12z"/><path d="M12 12v8"/><path d="M7 6h3m4 0h3"/></>,
  'Half Pant': <><path d="M6 4h12v5l-2 6H8L6 9z"/><path d="M12 9v6"/><path d="M6 7h12"/></>,
  'Pajama': <><path d="M6 4h12v8l-2 9H8L6 12z"/><path d="M12 12v9"/><path d="M6 7h12m-6 0v2"/></>,
  'Riding Pant': <><path d="M6 4h12v9l-3 8H9L6 13z"/><path d="M12 13v8"/><path d="M6 9c1 0 2 2 2 4m8-4c-1 0-2 2-2 4"/></>,
  'Palazzo Pants': <><path d="M7 4h10l2 8-3 9H8L5 12z"/><path d="M12 12v9"/><path d="M5 10h14"/></>,
  'Skirt': <><path d="M8 4h8l3 9-3 7H8l-3-7z"/><path d="M6 10h12"/></>,
  'Lungi': <><rect x="4" y="6" width="16" height="13" rx="1"/><path d="M4 10h16m-8-4v13"/><path d="M4 14h7m1 0h8"/></>,
  'Dhoti': <><path d="M4 6h16v7l-4 7H8L4 13z"/><path d="M4 10h16m-8 0v10"/></>,
  'Underwear': <><path d="M5 6h14l-1 7c-1 3-3 5-6 5s-5-2-6-5z"/><path d="M5 6c2 4 4 6 7 6s5-2 7-6"/></>,
  'Socks': <><path d="M9 4v11l-4 3a2 2 0 0 0 2 2h8a2 2 0 0 0 1-4l-3-1V4"/><path d="M9 4h6"/></>,

  // Dresses
  'Dress': <><path d="M9 3h6l2 5-3 2v11H10V10L7 8z"/><path d="M12 10v11"/></>,
  'Petticoat': <><path d="M9 3h6v5H9z"/><path d="M7 8h10l2 13H5z"/><path d="M7 14h10"/></>,
  'Lehenga': <><path d="M9 3h6v4H9z"/><path d="M7 7h10l3 14H4z"/><path d="M6 13h12"/></>,
  'Salwaar': <><path d="M8 3h8l1 6H7z"/><path d="M7 9v12m10-12v12"/><path d="M7 15l5 6 5-6"/></>,
  'Saree': <><path d="M5 5h3v16H5z"/><path d="M8 5h11v16H8z"/><path d="M8 9h11m0 4H8"/><path d="M14 5v16"/></>,
  'Dupatta': <><path d="M3 8h18v8H3z"/><path d="M3 8l2-4m16 4l-2-4"/><path d="M3 16l2 3m16-3l-2 3"/></>,
  'Long Sweater Women': <><path d="M8 3L4 8v2h2v13h12V10h2V8l-4-5"/><path d="M8 3c0 3 1 5 4 5s4-2 4-5"/><path d="M12 15v6"/></>,

  // Household
  'Sofa': <><path d="M3 13h2V9a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v4h2v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M6 13v-2m12 2v-2m-12 6v2m12-2v2"/></>,
  'Pillow': <><rect x="3" y="7" width="18" height="11" rx="3"/><path d="M6 7a2 2 0 0 0 2 2m8-2a2 2 0 0 1-2 2m-6 7a2 2 0 0 1 2-2m4 2a2 2 0 0 0-2-2"/></>,
  'Pillow Cover': <><rect x="3" y="7" width="18" height="11" rx="3" strokeDasharray="2 1"/><path d="M12 7v11"/><path d="M3 12h9"/></>,
  'Sofa Cover': <><path d="M3 13h2V9a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v4h2v4H3z"/><path d="M2 10c5 3 15 3 20 0"/></>,
  'Bedsheet': <><rect x="3" y="6" width="18" height="13" rx="1"/><path d="M3 10h18"/><path d="M7 6v4m10-4v4"/></>,
  'Towel': <><path d="M6 4h12v4H6z"/><path d="M5 8h14v12H5z"/><path d="M5 13h14"/></>,
  'Curtain': <><path d="M4 3h7v18l-3-4-4 4"/><path d="M20 3h-7v18l3-4 4 4"/><path d="M4 3h16"/></>,
  'Carpet': <><rect x="4" y="8" width="16" height="10" rx="1"/><path d="M4 8l-1-5h18l-1 5"/><path d="M6 11h12m-12 4h12"/></>,
  'Blanket': <><rect x="4" y="7" width="16" height="12" rx="2"/><path d="M4 10h16m-16 3h16m-16 3h16"/></>,
  'Quilt': <><rect x="4" y="6" width="16" height="13" rx="2"/><path d="M4 10h16m-16 4h16"/><path d="M9 6v13m6-13v13"/></>,
  'Mosquito Net': <><path d="M12 3L4 8v14h16V8z"/><path d="M4 8h16"/><path d="M8 8v14m8-14v14m-8-7h8"/></>,

  // Accessories
  'Cap': <><path d="M5 14a7 7 0 0 1 14 0"/><rect x="3" y="14" width="18" height="4" rx="2"/><path d="M12 7v7"/></>,
  'Woolen Cap': <><path d="M7 12a5 5 0 0 1 10 0"/><rect x="5" y="12" width="14" height="5" rx="2"/><path d="M7 8l2-5h6l2 5"/></>,
  'Mufflers': <><path d="M5 8c0-2 3-3 7-3s7 1 7 3v4c0 2-3 3-7 3s-7-1-7-3z"/><path d="M5 10l-2 6h4m14-6l2 6h-4"/></>,
  'Gloves': <><path d="M8 6v8m2-10v10m2-11v10m2-8v10"/><path d="M6 12c0 1.5 0 6 6 6s6-4.5 6-6V8"/></>,
  'Tie': <><path d="M10 3h4l1 5-3 14-3-14z"/><path d="M9 7h6"/></>,
  'Shawl': <><path d="M4 8h16v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M4 8l4-5h8l4 5"/></>,
  'Roomal': <><rect x="5" y="5" width="14" height="14" rx="2"/><path d="M5 5l4 4m6 6l4 4M19 5l-4 4M9 15l-4 4"/></>,

  // Footwear
  'Shoes': <><path d="M3 15h12l5-2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M3 15l5-8h3l1 8"/><path d="M8 10h5"/></>,
  'Sandal': <><path d="M5 16h14v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z"/><path d="M7 16l1-4m8 4l-1-4"/><path d="M6 13h12"/><path d="M9 13l1-3m4 3l-1-3"/></>,

  // Bags
  'Bag': <><path d="M6 7h12l1 13H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/><path d="M9 12h6"/></>,

  // Special Services
  'Delivery & Pickup Charge': <><rect x="2" y="8" width="12" height="10" rx="1"/><path d="M14 10h4l3 3v5h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></>,
  'Express Service': <><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/><path d="M2 12h3m14 0h3"/></>,
  'Heavy Express Service': <><path d="M8 5h8l3 14H5z"/><path d="M8 5L5 3m11 2l3-2"/><path d="M9 13h6m-3-4v8"/></>,
  'Due': <><rect x="4" y="4" width="16" height="18" rx="2"/><path d="M8 9h8m-8 4h8m-8 4h4"/><path d="M12 4v2"/></>,
  'Mask': <><rect x="4" y="8" width="16" height="10" rx="3"/><path d="M4 11c-1 0-2 1-2 2s1 2 2 2m16-4c1 0 2 1 2 2s-1 2-2 2"/><path d="M8 13h8"/></>,

  // Apron
  'Apron': <><path d="M8 3h8l1 4H7z"/><path d="M5 7l1 4v8a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-8l1-4"/><path d="M9 12h6m-6 4h6"/></>,
  
  // Teddy Bear
  'Teddy Bear': <><circle cx="12" cy="9" r="4"/><circle cx="7" cy="6" r="2.5"/><circle cx="17" cy="6" r="2.5"/><path d="M9 13l-1 6a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2l-1-6"/><circle cx="5.5" cy="17" r="2"/><circle cx="18.5" cy="17" r="2"/></>,

  // Cover
  'Cover': <><rect x="3" y="5" width="18" height="15" rx="2"/><path d="M3 9h18"/><path d="M9 5v4m6-4v4"/></>,

  // Woolen T-Shirt
  'Woolen T-Shirt': <><path d="M8 4L4 8l2 1v10h12V9l2-1-4-4"/><path d="M8 4c0 2 1.5 3 4 3s4-1 4-3"/><path d="M7 11h10m-10 3h10m-10 3h6"/></>,
};

const defaultIcon = (
  <><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 8h6m-6 4h6m-6 4h4"/></>
);

export const ServiceIcon: React.FC<ServiceIconProps> = ({ name, className = 'w-7 h-7', size }) => {
  const icon = paths[name] ?? defaultIcon;
  const sizeProps = size ? { width: size, height: size } : {};

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...sizeProps}
    >
      {icon}
    </svg>
  );
};

export default ServiceIcon;
