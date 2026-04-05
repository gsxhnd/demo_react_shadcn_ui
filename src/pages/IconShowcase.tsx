import { useState } from "react";
import {
  Search,
  Bell,
  Settings,
  User,
  Home,
  Mail,
  Heart,
  Star,
  Download,
  Upload,
  Trash2,
  Edit,
  Plus,
  Check,
  X,
  Loader2,
  ChevronRight,
  ChevronDown,
  Menu,
  Moon,
  Sun,
  ShoppingCart,
  CreditCard,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Filter,
  SortAsc,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Globe,
  Cloud,
  Database,
  Server,
  Bug,
  Code,
  Terminal,
  Cpu,
  HardDrive,
  Wifi,
  Battery,
  Camera,
  Image,
  FileText,
  Folder,
  Archive,
  Share2,
  Copy,
  Clipboard,
  Link,
  ExternalLink,
  Send,
  MessageSquare,
  type LucideProps,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * 图标分类
 */
type IconCategory =
  | "navigation"
  | "actions"
  | "status"
  | "social"
  | "devices"
  | "files"
  | "communication";

/**
 * 图标项接口
 */
interface IconItem {
  name: string;
  icon: React.ForwardRefExoticComponent<
    LucideProps & React.RefAttributes<SVGSVGElement>
  >;
}

/**
 * 图标数据
 */
const iconData: Record<IconCategory, IconItem[]> = {
  navigation: [
    { name: "Home", icon: Home },
    { name: "Search", icon: Search },
    { name: "Settings", icon: Settings },
    { name: "Menu", icon: Menu },
    { name: "ChevronRight", icon: ChevronRight },
    { name: "ChevronDown", icon: ChevronDown },
    { name: "MapPin", icon: MapPin },
    { name: "Globe", icon: Globe },
  ],
  actions: [
    { name: "Plus", icon: Plus },
    { name: "Edit", icon: Edit },
    { name: "Trash2", icon: Trash2 },
    { name: "Download", icon: Download },
    { name: "Upload", icon: Upload },
    { name: "Copy", icon: Copy },
    { name: "Link", icon: Link },
    { name: "Share2", icon: Share2 },
  ],
  status: [
    { name: "Check", icon: Check },
    { name: "X", icon: X },
    { name: "Lock", icon: Lock },
    { name: "Unlock", icon: Unlock },
    { name: "Eye", icon: Eye },
    { name: "EyeOff", icon: EyeOff },
    { name: "Filter", icon: Filter },
    { name: "SortAsc", icon: SortAsc },
  ],
  social: [
    { name: "User", icon: User },
    { name: "Bell", icon: Bell },
    { name: "Heart", icon: Heart },
    { name: "Star", icon: Star },
    { name: "Mail", icon: Mail },
    { name: "MessageSquare", icon: MessageSquare },
    { name: "Send", icon: Send },
    { name: "Clipboard", icon: Clipboard },
  ],
  devices: [
    { name: "Camera", icon: Camera },
    { name: "Cpu", icon: Cpu },
    { name: "Server", icon: Server },
    { name: "HardDrive", icon: HardDrive },
    { name: "Wifi", icon: Wifi },
    { name: "Battery", icon: Battery },
    { name: "Cloud", icon: Cloud },
    { name: "Database", icon: Database },
  ],
  files: [
    { name: "FileText", icon: FileText },
    { name: "Folder", icon: Folder },
    { name: "Archive", icon: Archive },
    { name: "Image", icon: Image },
    { name: "ExternalLink", icon: ExternalLink },
    { name: "Code", icon: Code },
    { name: "Terminal", icon: Terminal },
    { name: "Bug", icon: Bug },
  ],
  communication: [
    { name: "Phone", icon: Phone },
    { name: "Mail", icon: Mail },
    { name: "Calendar", icon: Calendar },
    { name: "Clock", icon: Clock },
    { name: "ShoppingCart", icon: ShoppingCart },
    { name: "CreditCard", icon: CreditCard },
    { name: "Moon", icon: Moon },
    { name: "Sun", icon: Sun },
  ],
};

const categoryLabels: Record<IconCategory, string> = {
  navigation: "导航图标",
  actions: "操作图标",
  status: "状态图标",
  social: "社交图标",
  devices: "设备图标",
  files: "文件图标",
  communication: "通讯图标",
};

/**
 * 单个图标展示组件
 */
function IconShowcaseItem({
  icon: Icon,
  name,
}: {
  icon: React.ForwardRefExoticComponent<
    LucideProps & React.RefAttributes<SVGSVGElement>
  >;
  name: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const importPath = `import { ${name} } from "lucide-react";`;
    await navigator.clipboard.writeText(importPath);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 p-4 rounded-lg border transition-colors",
        "hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer",
        "border-slate-200 dark:border-slate-700"
      )}
      onClick={handleCopy}
    >
      <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-800">
        <Icon className="w-6 h-6 text-slate-700 dark:text-slate-300" />
      </div>
      <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">
        {name}
      </span>
      {copied && (
        <span className="text-xs text-green-600 dark:text-green-400">
          已复制!
        </span>
      )}
    </div>
  );
}

/**
 * 图标尺寸示例
 */
function IconSizesDemo() {
  const sizes = [12, 16, 20, 24, 32, 48, 64];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">尺寸示例</h3>
      <div className="flex items-center gap-6 flex-wrap">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <Home className="text-slate-700 dark:text-slate-300" style={{ width: size, height: size }} />
            <span className="text-xs text-slate-500">{size}px</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 图标颜色示例
 */
function IconColorsDemo() {
  const colors = [
    { name: "Default", className: "text-slate-700 dark:text-slate-300" },
    { name: "Primary", className: "text-blue-600" },
    { name: "Success", className: "text-green-600" },
    { name: "Warning", className: "text-yellow-600" },
    { name: "Error", className: "text-red-600" },
    { name: "Purple", className: "text-purple-600" },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">颜色示例</h3>
      <div className="flex items-center gap-6 flex-wrap">
        {colors.map(({ name, className }) => (
          <div key={name} className="flex flex-col items-center gap-2">
            <Search className={cn("w-6 h-6", className)} />
            <span className="text-xs text-slate-500">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 图标在按钮中的使用示例
 */
function IconInButtonsDemo() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">按钮中使用</h3>
      <div className="flex flex-wrap gap-3">
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          新建
        </Button>
        <Button variant="outline">
          <Edit className="w-4 h-4 mr-2" />
          编辑
        </Button>
        <Button variant="destructive">
          <Trash2 className="w-4 h-4 mr-2" />
          删除
        </Button>
        <Button variant="secondary">
          <Download className="w-4 h-4 mr-2" />
          下载
        </Button>
        <Button variant="ghost">
          <Settings className="w-4 h-4 mr-2" />
          设置
        </Button>
      </div>
    </div>
  );
}

/**
 * 带图标的加载状态示例
 */
function IconLoadingDemo() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">加载状态</h3>
      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm">旋转加载</span>
        </div>
        <div className="flex items-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
          <span className="text-sm text-blue-600">蓝色加载</span>
        </div>
      </div>
    </div>
  );
}

/**
 * 实际应用场景示例
 */
function IconRealWorldDemo() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">实际应用场景</h3>
      <div className="space-y-3">
        {/* 导航菜单项 */}
        <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
          <Home className="w-5 h-5 text-blue-600" />
          <span className="flex-1">首页</span>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        {/* 通知项 */}
        <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
          <Bell className="w-5 h-5 text-yellow-500" />
          <span className="flex-1">您有 3 条新消息</span>
          <span className="px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
            3
          </span>
        </div>

        {/* 用户信息项 */}
        <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
          <User className="w-5 h-5 text-green-500" />
          <span className="flex-1">张三</span>
          <span className="text-sm text-slate-500">在线</span>
          <span className="w-2 h-2 bg-green-500 rounded-full" />
        </div>

        {/* 操作列表 */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
          <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded">
            <Star className="w-4 h-4 text-yellow-500" />
          </button>
          <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded">
            <Heart className="w-4 h-4 text-red-500" />
          </button>
          <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded">
            <Share2 className="w-4 h-4 text-blue-500" />
          </button>
          <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded">
            <Download className="w-4 h-4 text-green-500" />
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * 图标展示主组件
 */
export function IconShowcase() {
  const [activeCategory, setActiveCategory] =
    useState<IconCategory>("navigation");

  return (
    <div className="space-y-6">
      {/* 标题 */}
      <div>
        <h2 className="text-2xl font-bold">Lucide React 图标示例</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          点击图标可复制导入语句。Lucide React 提供 1000+ 精美图标。
        </p>
      </div>

      {/* 分类切换 */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(categoryLabels) as IconCategory[]).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-3 py-1.5 text-sm rounded-full transition-colors",
              activeCategory === category
                ? "bg-blue-600 text-white"
                : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
            )}
          >
            {categoryLabels[category]}
          </button>
        ))}
      </div>

      {/* 图标网格 */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
        {iconData[activeCategory].map(({ name, icon }) => (
          <IconShowcaseItem key={name} name={name} icon={icon} />
        ))}
      </div>

      {/* 分隔线 */}
      <hr className="border-slate-200 dark:border-slate-700" />

      {/* 其他示例 */}
      <div className="space-y-8">
        <IconSizesDemo />
        <IconColorsDemo />
        <IconInButtonsDemo />
        <IconLoadingDemo />
        <IconRealWorldDemo />
      </div>
    </div>
  );
}

export default IconShowcase;
