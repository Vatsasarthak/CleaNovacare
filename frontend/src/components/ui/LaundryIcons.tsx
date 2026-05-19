import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

const defaultProps: IconProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

// 1. Delivery Truck
export const DeliveryTruckIcon = (props: IconProps) => (
  <svg {...defaultProps} {...props}>
    <rect x="3" y="8" width="12" height="10" rx="1" />
    <path d="M15 10h4l3 3v5h-7" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
    <path d="M1 10h2" />
    <path d="M1 14h2" />
  </svg>
);

// 2. Sofa
export const SofaIcon = (props: IconProps) => (
  <svg {...defaultProps} {...props}>
    <path d="M4 11V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
    <path d="M2 13h20v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4Z" />
    <path d="M4 19v2" />
    <path d="M20 19v2" />
    <path d="M2 11h20v2H2z" />
  </svg>
);

// 3. Apron
export const ApronIcon = (props: IconProps) => (
  <svg {...defaultProps} {...props}>
    <path d="M8 4h8l2 6h3" />
    <path d="M3 10h3l2-6" />
    <path d="M6 10v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10" />
    <path d="M9 14h6" />
    <path d="M9 17h6" />
  </svg>
);

// 4. Express Wind / Heavy Express
export const ExpressWindIcon = (props: IconProps) => (
  <svg {...defaultProps} {...props}>
    <path d="M12 4h4a2 2 0 0 1 0 4h-2" />
    <path d="M4 10h12a3 3 0 0 1 0 6h-4" />
    <path d="M8 20h6a2 2 0 0 0 0-4h-2" />
    <path d="M2 10h2" />
    <path d="M2 16h4" />
  </svg>
);

// 5. Face Mask
export const MaskIcon = (props: IconProps) => (
  <svg {...defaultProps} {...props}>
    <rect x="5" y="8" width="14" height="8" rx="2" />
    <path d="M5 10C3 9 2 10 2 12s1 3 3 2" />
    <path d="M19 10c2-1 3 0 3 2s-1 3-3 2" />
    <path d="M9 12h6" />
  </svg>
);

// 6. Shorts (Half Pant)
export const ShortsIcon = (props: IconProps) => (
  <svg {...defaultProps} {...props}>
    <path d="M6 4h12l2 12h-6l-2-6-2 6H4L6 4Z" />
    <path d="M6 4c0 1 3 2 6 2s6-1 6-2" />
    <path d="M12 6v6" />
  </svg>
);

// 7. Half Jacket
export const HalfJacketIcon = (props: IconProps) => (
  <svg {...defaultProps} {...props}>
    <path d="M8 4h8l3 5v11H5V9l3-5Z" />
    <path d="M12 4v16" />
    <path d="M8 4l4 4 4-4" />
  </svg>
);

// 8. Billing / Due
export const BillingIcon = (props: IconProps) => (
  <svg {...defaultProps} {...props}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M8 10h8" />
    <path d="M8 14h4" />
    <path d="M12 4v16" />
    <circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.1" />
  </svg>
);

// 9. Pillow
export const PillowIcon = (props: IconProps) => (
  <svg {...defaultProps} {...props}>
    <rect x="3" y="6" width="18" height="12" rx="3" />
    <path d="M7 12h10" />
    <path d="M5 6a2 2 0 0 0 2 2" />
    <path d="M19 6a2 2 0 0 1-2 2" />
    <path d="M5 18a2 2 0 0 1 2-2" />
    <path d="M19 18a2 2 0 0 0-2-2" />
  </svg>
);

// 10. Dress / Petticoat
export const DressIcon = (props: IconProps) => (
  <svg {...defaultProps} {...props}>
    <path d="M9 4h6l2 4-2 2v10H9V10L7 8l2-4Z" />
    <path d="M9 10h6" />
  </svg>
);

// 11. Teddy Bear
export const TeddyBearIcon = (props: IconProps) => (
  <svg {...defaultProps} {...props}>
    <circle cx="12" cy="10" r="4" />
    <circle cx="7" cy="7" r="2" />
    <circle cx="17" cy="7" r="2" />
    <path d="M10 14h4l2 6H8l2-6Z" />
    <circle cx="6" cy="16" r="2" />
    <circle cx="18" cy="16" r="2" />
    <path d="M11 10h2" />
  </svg>
);

// 12. Mosquito Net
export const NetIcon = (props: IconProps) => (
  <svg {...defaultProps} {...props}>
    <path d="M12 3L4 9v12h16V9l-8-6Z" />
    <path d="M12 3v18" />
    <path d="M4 15h16" />
    <path d="M8 6v15" />
    <path d="M16 6v15" />
  </svg>
);

// 13. Cap
export const CapIcon = (props: IconProps) => (
  <svg {...defaultProps} {...props}>
    <path d="M5 14a7 7 0 0 1 14 0" />
    <path d="M3 14h18a2 2 0 0 1 0 4H3a2 2 0 0 1 0-4Z" />
    <circle cx="12" cy="7" r="1" />
  </svg>
);

// 14. Cover (Fabric)
export const CoverIcon = (props: IconProps) => (
  <svg {...defaultProps} {...props}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M4 10l8 4 8-4" />
    <path d="M12 14v6" />
  </svg>
);

// 15. Cushion (Sofa Cover)
export const CushionIcon = (props: IconProps) => (
  <svg {...defaultProps} {...props}>
    <rect x="5" y="5" width="14" height="14" rx="3" />
    <circle cx="12" cy="12" r="2" />
    <path d="M5 5l4 4" />
    <path d="M19 5l-4 4" />
    <path d="M5 19l4-4" />
    <path d="M19 19l-4-4" />
  </svg>
);

// 16. Riding Pants
export const RidingPantsIcon = (props: IconProps) => (
  <svg {...defaultProps} {...props}>
    <path d="M7 4h10l2 16h-4l-3-8-3 8H5L7 4Z" />
    <path d="M7 10h2" />
    <path d="M15 10h2" />
    <path d="M7 14h2" />
    <path d="M15 14h2" />
  </svg>
);

// 17. Biker Jacket
export const BikerJacketIcon = (props: IconProps) => (
  <svg {...defaultProps} {...props}>
    <path d="M8 4h8l4 6v10H4V10l4-6Z" />
    <path d="M10 4l-2 16" />
    <path d="M14 14h4" />
    <circle cx="16" cy="10" r="1" />
  </svg>
);

// 18. Lungi (Folded cloth)
export const LungiIcon = (props: IconProps) => (
  <svg {...defaultProps} {...props}>
    <path d="M4 6h16v12H4z" />
    <path d="M4 10h16" />
    <path d="M4 14h16" />
    <path d="M10 6v12" />
    <path d="M14 6v12" />
  </svg>
);

// 19. Tie
export const TieIcon = (props: IconProps) => (
  <svg {...defaultProps} {...props}>
    <path d="M10 4h4l-1 3 2 11-3 4-3-4 2-11-1-3Z" />
    <path d="M9 7h6" />
  </svg>
);

// 20. Underwear
export const UnderwearIcon = (props: IconProps) => (
  <svg {...defaultProps} {...props}>
    <path d="M4 8h16l-2 10H6L4 8Z" />
    <path d="M4 8c2 4 5 5 8 5s6-1 8-5" />
    <path d="M12 13v5" />
  </svg>
);

// Also re-export some base lucide icons that are perfectly fine to be used globally
import { 
  Shirt, Briefcase, Truck, CreditCard, Droplet, 
  Wind, Shield, Layers, Package, Scissors, Sparkles, Watch
} from 'lucide-react';

export const StandardShirtIcon = Shirt;
export const SuitcaseIcon = Briefcase;
export const RegularTruckIcon = Truck;
export const DropIcon = Droplet;
export const WindIcon = Wind;
export const ShieldIcon = Shield;
export const LayersIcon = Layers;
export const PackageIcon = Package;
export const ScissorsIcon = Scissors;
export const SparklesIcon = Sparkles;
export const WatchIcon = Watch;
