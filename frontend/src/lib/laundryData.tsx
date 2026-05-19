import React from 'react';
import { ServiceIcon } from '@/components/ui/ServiceIcon';

// Helper to create an icon component from service name
const ic = (name: string) => {
  const Comp = (props: React.SVGProps<SVGSVGElement>) => (
    <ServiceIcon name={name} className={(props.className as string) || 'w-7 h-7'} />
  );
  Comp.displayName = `Icon_${name}`;
  return Comp;
};

export const serviceCatalog = [
  { id: '1',  name: 'Delivery & Pickup Charge', icon: ic('Delivery & Pickup Charge'), type: 'addon' },
  { id: '2',  name: 'Sofa',                    icon: ic('Sofa'),                    type: 'service' },
  { id: '3',  name: 'Apron',                   icon: ic('Apron'),                   type: 'service' },
  { id: '4',  name: 'Heavy Express Service',   icon: ic('Heavy Express Service'),   type: 'service' },
  { id: '5',  name: 'Mask',                    icon: ic('Mask'),                    type: 'service' },
  { id: '6',  name: 'Half Pant',               icon: ic('Half Pant'),               type: 'service' },
  { id: '7',  name: 'Half Jacket',             icon: ic('Half Jacket'),             type: 'service' },
  { id: '8',  name: 'Due',                     icon: ic('Due'),                     type: 'addon' },
  { id: '9',  name: 'Pillow',                  icon: ic('Pillow'),                  type: 'service' },
  { id: '10', name: 'Petticoat',               icon: ic('Petticoat'),               type: 'service' },
  { id: '11', name: 'Teddy Bear',              icon: ic('Teddy Bear'),              type: 'service' },
  { id: '12', name: 'Mosquito Net',            icon: ic('Mosquito Net'),            type: 'service' },
  { id: '13', name: 'Cap',                     icon: ic('Cap'),                     type: 'service' },
  { id: '14', name: 'Cover',                   icon: ic('Cover'),                   type: 'service' },
  { id: '15', name: 'Sofa Cover',              icon: ic('Sofa Cover'),              type: 'service' },
  { id: '16', name: 'Riding Pant',             icon: ic('Riding Pant'),             type: 'service' },
  { id: '17', name: 'Riding Jacket',           icon: ic('Riding Jacket'),           type: 'service' },
  { id: '18', name: 'Lungi',                   icon: ic('Lungi'),                   type: 'service' },
  { id: '19', name: 'Tie',                     icon: ic('Tie'),                     type: 'service' },
  { id: '20', name: 'Underwear',               icon: ic('Underwear'),               type: 'service' },
  { id: '21', name: 'Quilt',                   icon: ic('Quilt'),                   type: 'service' },
  { id: '22', name: 'Blanket',                 icon: ic('Blanket'),                 type: 'service' },
  { id: '23', name: 'Shawl',                   icon: ic('Shawl'),                   type: 'service' },
  { id: '24', name: 'Lehenga',                 icon: ic('Lehenga'),                 type: 'service' },
  { id: '25', name: 'Dress',                   icon: ic('Dress'),                   type: 'service' },
  { id: '26', name: 'Saree',                   icon: ic('Saree'),                   type: 'service' },
  { id: '27', name: 'Salwaar',                 icon: ic('Salwaar'),                 type: 'service' },
  { id: '28', name: 'Kurta Heavy',             icon: ic('Kurta Heavy'),             type: 'service' },
  { id: '29', name: 'Jacket Hood',             icon: ic('Jacket Hood'),             type: 'service' },
  { id: '30', name: 'Jacket',                  icon: ic('Jacket'),                  type: 'service' },
  { id: '31', name: 'Jeans',                   icon: ic('Jeans'),                   type: 'service' },
  { id: '32', name: 'Kurta Women',             icon: ic('Kurta Women'),             type: 'service' },
  { id: '33', name: 'Kurta Men',               icon: ic('Kurta Men'),               type: 'service' },
  { id: '34', name: 'T-Shirt',                 icon: ic('T-Shirt'),                 type: 'service' },
  { id: '35', name: 'Suit 3 pcs',              icon: ic('Coat'),                    type: 'service' },
  { id: '36', name: 'Suit 2 pcs',              icon: ic('Jacket'),                  type: 'service' },
  { id: '37', name: 'Coat',                    icon: ic('Coat'),                    type: 'service' },
  { id: '38', name: 'Shirt',                   icon: ic('Shirt'),                   type: 'service' },
  { id: '39', name: 'Pant',                    icon: ic('Pant'),                    type: 'service' },
  { id: '40', name: 'Pajama',                  icon: ic('Pajama'),                  type: 'service' },
  { id: '41', name: 'Palazzo Pants',           icon: ic('Palazzo Pants'),           type: 'service' },
  { id: '42', name: 'Dupatta',                 icon: ic('Dupatta'),                 type: 'service' },
  { id: '43', name: 'Blouse',                  icon: ic('Blouse'),                  type: 'service' },
  { id: '44', name: 'Shoes',                   icon: ic('Shoes'),                   type: 'service' },
  { id: '45', name: 'Bedsheet',                icon: ic('Bedsheet'),                type: 'service' },
  { id: '46', name: 'Towel',                   icon: ic('Towel'),                   type: 'service' },
  { id: '47', name: 'Carpet',                  icon: ic('Carpet'),                  type: 'service' },
  { id: '48', name: 'Bag',                     icon: ic('Bag'),                     type: 'service' },
  { id: '49', name: 'Sandal',                  icon: ic('Sandal'),                  type: 'service' },
  { id: '50', name: 'Leather Jacket',          icon: ic('Leather Jacket'),          type: 'service' },
  { id: '51', name: 'Mufflers',                icon: ic('Mufflers'),                type: 'service' },
  { id: '52', name: 'Gloves',                  icon: ic('Gloves'),                  type: 'service' },
  { id: '53', name: 'Woolen Cap',              icon: ic('Woolen Cap'),              type: 'service' },
  { id: '54', name: 'Socks',                   icon: ic('Socks'),                   type: 'service' },
  { id: '55', name: 'Roomal',                  icon: ic('Roomal'),                  type: 'service' },
  { id: '56', name: 'Sweater',                 icon: ic('Sweater'),                 type: 'service' },
  { id: '57', name: 'Long Sweater Women',      icon: ic('Long Sweater Women'),      type: 'service' },
  { id: '58', name: 'Hoodie',                  icon: ic('Hoodie'),                  type: 'service' },
  { id: '59', name: 'Half Coat',               icon: ic('Half Coat'),               type: 'service' },
  { id: '60', name: 'Dhoti',                   icon: ic('Dhoti'),                   type: 'service' },
  { id: '61', name: 'Sweat Shirt',             icon: ic('Sweat Shirt'),             type: 'service' },
  { id: '62', name: 'Pillow Cover',            icon: ic('Pillow Cover'),            type: 'service' },
  { id: '63', name: 'Skirt',                   icon: ic('Skirt'),                   type: 'service' },
  { id: '64', name: 'Curtain',                 icon: ic('Curtain'),                 type: 'service' },
  { id: '65', name: 'Vest',                    icon: ic('Vest'),                    type: 'service' },
  { id: '66', name: 'Express Service',         icon: ic('Express Service'),         type: 'service' },
  { id: '67', name: 'Long Coat',               icon: ic('Long Coat'),               type: 'service' },
  { id: '68', name: 'Sherwani',                icon: ic('Sherwani'),                type: 'service' },
  { id: '69', name: 'Woolen T-Shirt',          icon: ic('Woolen T-Shirt'),          type: 'service' },
  { id: '70', name: 'Waist Coat',              icon: ic('Waist Coat'),              type: 'service' },
];

export const serviceTypes = [
  'Laundry', 'Dry Clean', 'Steam Iron', 'Colour', 'Polish', 
  'Express Services', 'Heavy Express Service', 'Laundry Heavy', 
  'Dry Clean Heavy', 'Dry Clean V-Heavy', 'Steam Iron Heavy', 
  'Lehenga Blouse', 'Pickup & Delivery Charge', 'Due'
];

export const addonsList = [
  { id: 'a1', name: 'Pickup & Delivery Charge', price: 50 },
  { id: 'a2', name: 'Due', price: 20 },
  { id: 'a3', name: 'Starch', price: 100 },
  { id: 'a4', name: 'Deep Clean', price: 40 },
];
