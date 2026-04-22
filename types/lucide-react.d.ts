// Ambient module declaration for lucide-react.
// The installed version of lucide-react ships without TypeScript declarations,
// which makes `next build`'s type-check fail. This shim covers every icon
// actually imported in the project.

declare module "lucide-react" {
  import * as React from "react";

  export interface LucideProps extends React.SVGAttributes<SVGElement> {
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
    absoluteStrokeWidth?: boolean;
  }

  export type LucideIcon = React.ForwardRefExoticComponent<
    LucideProps & React.RefAttributes<SVGSVGElement>
  >;

  export const ArrowLeft: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const ArrowUpRight: LucideIcon;
  export const Banknote: LucideIcon;
  export const BarChart3: LucideIcon;
  export const Bath: LucideIcon;
  export const Bed: LucideIcon;
  export const Bot: LucideIcon;
  export const Briefcase: LucideIcon;
  export const Building2: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const DollarSign: LucideIcon;
  export const Globe: LucideIcon;
  export const Headphones: LucideIcon;
  export const Home: LucideIcon;
  export const KeyRound: LucideIcon;
  export const Landmark: LucideIcon;
  export const Layout: LucideIcon;
  export const LineChart: LucideIcon;
  export const Loader2: LucideIcon;
  export const Lock: LucideIcon;
  export const LogIn: LucideIcon;
  export const LogOut: LucideIcon;
  export const Mail: LucideIcon;
  export const MapPin: LucideIcon;
  export const Menu: LucideIcon;
  export const MessageCircle: LucideIcon;
  export const MessageSquare: LucideIcon;
  export const MessagesSquare: LucideIcon;
  export const PieChart: LucideIcon;
  export const Phone: LucideIcon;
  export const Plus: LucideIcon;
  export const Repeat: LucideIcon;
  export const Search: LucideIcon;
  export const Send: LucideIcon;
  export const Shield: LucideIcon;
  export const ShieldCheck: LucideIcon;
  export const Sparkles: LucideIcon;
  export const Star: LucideIcon;
  export const Target: LucideIcon;
  export const TrendingUp: LucideIcon;
  export const User: LucideIcon;
  export const UserCheck: LucideIcon;
  export const UserPlus: LucideIcon;
  export const Users: LucideIcon;
  export const Wallet: LucideIcon;
  export const Workflow: LucideIcon;
  export const Wrench: LucideIcon;
  export const X: LucideIcon;
}
