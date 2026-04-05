import { LanguageTransition } from "@/components/ui/language-transition";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, Globe } from "lucide-react";
import { useState } from "react";
import { languages } from "@/i18n";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";

function ComponentsDocsPage() {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const { i18n } = useTranslation();

  const currentLanguage = languages.find((lang) => lang.code === i18n.language);

  const copyToClipboard = (code: string, index: string) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const componentDocs = [
    {
      id: "button",
      name: "Button",
      description: "用于触发操作的主要交互元素，支持多种变体和尺寸。",
      importCode: `import { Button } from "@/components/ui/button";`,
      props: [
        { name: "variant", type: '"default" | "secondary" | "outline" | "ghost" | "destructive" | "link"', default: '"default"', description: "按钮的视觉样式" },
        { name: "size", type: '"xs" | "sm" | "default" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"', default: '"default"', description: "按钮的尺寸大小" },
        { name: "disabled", type: "boolean", default: "false", description: "是否禁用按钮" },
        { name: "onClick", type: "() => void", default: "-", description: "点击事件处理函数" },
        { name: "children", type: "ReactNode", default: "-", description: "按钮内容" },
      ],
      examples: [
        {
          title: "基础用法",
          code: `<Button>点击我</Button>`,
        },
        {
          title: "不同变体",
          code: `<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>`,
        },
        {
          title: "带图标",
          code: `<Button>
  <Plus className="w-4 h-4" data-icon="inline-start" />
  新建
</Button>`,
        },
      ],
    },
    {
      id: "input",
      name: "Input",
      description: "文本输入框组件，用于收集用户输入的单行文本。",
      importCode: `import { Input } from "@/components/ui/input";`,
      props: [
        { name: "type", type: '"text" | "email" | "password" | "number" | ...', default: '"text"', description: "输入框类型" },
        { name: "placeholder", type: "string", default: "-", description: "占位提示文本" },
        { name: "value", type: "string", default: "-", description: "输入框的值（受控）" },
        { name: "onChange", type: "(e: ChangeEvent) => void", default: "-", description: "值变化事件处理" },
        { name: "disabled", type: "boolean", default: "false", description: "是否禁用" },
      ],
      examples: [
        {
          title: "基础用法",
          code: `<Input placeholder="请输入..." />`,
        },
        {
          title: "受控输入",
          code: `const [value, setValue] = useState("");

<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="受控输入框"
/>`,
        },
        {
          title: "禁用状态",
          code: `<Input disabled placeholder="禁用输入框" />`,
        },
      ],
    },
    {
      id: "textarea",
      name: "Textarea",
      description: "多行文本输入组件，用于收集用户的多行文本输入。",
      importCode: `import { Textarea } from "@/components/ui/textarea";`,
      props: [
        { name: "placeholder", type: "string", default: "-", description: "占位提示文本" },
        { name: "value", type: "string", default: "-", description: "文本域的值（受控）" },
        { name: "onChange", type: "(e: ChangeEvent) => void", default: "-", description: "值变化事件处理" },
        { name: "rows", type: "number", default: "3", description: "显示的行数" },
        { name: "disabled", type: "boolean", default: "false", description: "是否禁用" },
      ],
      examples: [
        {
          title: "基础用法",
          code: `<Textarea placeholder="请输入多行文本..." />`,
        },
        {
          title: "指定行数",
          code: `<Textarea rows={5} placeholder="5行文本域" />`,
        },
      ],
    },
    {
      id: "input-group",
      name: "InputGroup",
      description: "带标签和图标的输入框组合组件，提供更好的输入体验。",
      importCode: `import { InputGroup } from "@/components/ui/input-group";`,
      props: [
        { name: "label", type: "string", default: "-", description: "输入框标签" },
        { name: "placeholder", type: "string", default: "-", description: "占位提示文本" },
        { name: "type", type: "string", default: '"text"', description: "输入框类型" },
        { name: "leftIcon", type: "ReactNode", default: "-", description: "左侧图标" },
        { name: "rightIcon", type: "ReactNode", default: "-", description: "右侧图标" },
        { name: "error", type: "string", default: "-", description: "错误提示文本" },
        { name: "helperText", type: "string", default: "-", description: "辅助说明文本" },
      ],
      examples: [
        {
          title: "带标签",
          code: `<InputGroup
  label="用户名"
  placeholder="请输入用户名"
/>`,
        },
        {
          title: "带图标",
          code: `import { Search } from "lucide-react";

<InputGroup
  leftIcon={<Search className="w-4 h-4" />}
  placeholder="搜索..."
/>`,
        },
        {
          title: "错误状态",
          code: `<InputGroup
  label="邮箱"
  type="email"
  error="请输入有效的邮箱地址"
/>`,
        },
      ],
    },
    {
      id: "dialog",
      name: "Dialog",
      description: "模态对话框组件，用于需要用户交互的弹出内容。",
      importCode: `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";`,
      props: [
        { name: "open", type: "boolean", default: "false", description: "对话框是否打开" },
        { name: "onOpenChange", type: "(open: boolean) => void", default: "-", description: "打开状态变化回调" },
        { name: "children", type: "ReactNode", default: "-", description: "对话框内容" },
      ],
      subComponents: [
        { name: "DialogTrigger", description: "触发对话框打开的元素，使用 asChild 传入子元素" },
        { name: "DialogContent", description: "对话框的主要内容区域" },
        { name: "DialogHeader", description: "对话框头部区域" },
        { name: "DialogTitle", description: "对话框标题" },
        { name: "DialogDescription", description: "对话框描述文本" },
        { name: "DialogFooter", description: "对话框底部区域，通常放操作按钮" },
      ],
      examples: [
        {
          title: "基础对话框",
          code: `<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button>打开</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>标题</DialogTitle>
      <DialogDescription>描述内容</DialogDescription>
    </DialogHeader>
    <DialogFooter showCloseButton>
      <Button onClick={() => setOpen(false)}>取消</Button>
      <Button>确认</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
        },
      ],
    },
    {
      id: "select",
      name: "Select",
      description: "下拉选择器组件，用于从预定义选项中选择单个值。",
      importCode: `import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";`,
      props: [
        { name: "value", type: "string", default: "-", description: "当前选中的值（受控）" },
        { name: "onValueChange", type: "(value: string) => void", default: "-", description: "选中值变化回调" },
        { name: "children", type: "ReactNode", default: "-", description: "选择器内容" },
      ],
      subComponents: [
        { name: "SelectTrigger", description: "选择器的触发按钮" },
        { name: "SelectContent", description: "下拉选项内容区域" },
        { name: "SelectGroup", description: "选项分组容器" },
        { name: "SelectLabel", description: "分组标签" },
        { name: "SelectItem", description: "单个选项，使用 value 属性指定值" },
        { name: "SelectValue", description: "显示选中值的占位元素" },
      ],
      examples: [
        {
          title: "基础用法",
          code: `<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="选择..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">选项 1</SelectItem>
    <SelectItem value="option2">选项 2</SelectItem>
    <SelectItem value="option3">选项 3</SelectItem>
  </SelectContent>
</Select>`,
        },
        {
          title: "分组选择",
          code: `<Select>
  <SelectTrigger>
    <SelectValue placeholder="选择框架" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>前端</SelectLabel>
      <SelectItem value="react">React</SelectItem>
      <SelectItem value="vue">Vue</SelectItem>
    </SelectGroup>
    <SelectGroup>
      <SelectLabel>后端</SelectLabel>
      <SelectItem value="node">Node.js</SelectItem>
      <SelectItem value="python">Python</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`,
        },
      ],
    },
    {
      id: "combobox",
      name: "Combobox",
      description: "可搜索的下拉选择器，支持输入过滤和自定义渲染。",
      importCode: `import { Combobox, ComboboxItem } from "@/components/ui/combobox";`,
      props: [
        { name: "items", type: "ComboboxItem[]", default: "[]", description: "选项列表" },
        { name: "value", type: "string", default: "-", description: "当前选中的值" },
        { name: "onValueChange", type: "(value: string) => void", default: "-", description: "选中值变化回调" },
        { name: "placeholder", type: "string", default: "-", description: "占位提示文本" },
      ],
      types: [
        { name: "ComboboxItem", properties: "value: string, label: string, description?: string" },
      ],
      examples: [
        {
          title: "基础用法",
          code: `const items: ComboboxItem[] = [
  { value: "react", label: "React", description: "JavaScript 库" },
  { value: "vue", label: "Vue", description: "渐进式框架" },
];

<Combobox
  items={items}
  value={value}
  onValueChange={setValue}
  placeholder="搜索框架..."
/>`,
        },
      ],
    },
    {
      id: "tabs",
      name: "Tabs",
      description: "选项卡组件，用于在不同的内容面板之间切换。",
      importCode: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";`,
      props: [
        { name: "defaultValue", type: "string", default: "-", description: "默认选中的标签页" },
        { name: "value", type: "string", default: "-", description: "当前选中的标签页（受控）" },
        { name: "onValueChange", type: "(value: string) => void", default: "-", description: "选中标签变化回调" },
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "标签页方向" },
        { name: "children", type: "ReactNode", default: "-", description: "标签页内容" },
      ],
      subComponents: [
        { name: "TabsList", description: "标签列表容器" },
        { name: "TabsTrigger", description: "单个标签触发器，使用 value 属性指定关联的 panel" },
        { name: "TabsContent", description: "标签对应的内容面板，使用 value 属性指定关联的 trigger" },
      ],
      examples: [
        {
          title: "基础用法",
          code: `<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">标签 1</TabsTrigger>
    <TabsTrigger value="tab2">标签 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">内容 1</TabsContent>
  <TabsContent value="tab2">内容 2</TabsContent>
</Tabs>`,
        },
      ],
    },
    {
      id: "switch",
      name: "Switch",
      description: "开关组件，用于切换布尔值状态。",
      importCode: `import { Switch } from "@/components/ui/switch";`,
      props: [
        { name: "checked", type: "boolean", default: "false", description: "开关状态（受控）" },
        { name: "onCheckedChange", type: "(checked: boolean) => void", default: "-", description: "状态变化回调" },
        { name: "disabled", type: "boolean", default: "false", description: "是否禁用" },
        { name: "id", type: "string", default: "-", description: "关联的 label id" },
      ],
      examples: [
        {
          title: "基础用法",
          code: `<Switch checked={checked} onCheckedChange={setChecked} />`,
        },
        {
          title: "配合 label 使用",
          code: `<div className="flex items-center gap-3">
  <Switch id="notifications" />
  <label htmlFor="notifications">接收通知</label>
</div>`,
        },
      ],
    },
    {
      id: "separator",
      name: "Separator",
      description: "分隔线组件，用于视觉上分隔内容。",
      importCode: `import { Separator } from "@/components/ui/separator";`,
      props: [
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "分隔线方向" },
        { name: "className", type: "string", default: "-", description: "自定义样式类" },
      ],
      examples: [
        {
          title: "水平分隔",
          code: `<div>
  <p>上方内容</p>
  <Separator />
  <p>下方内容</p>
</div>`,
        },
        {
          title: "垂直分隔",
          code: `<div className="flex gap-4">
  <span>选项 1</span>
  <Separator orientation="vertical" className="h-6" />
  <span>选项 2</span>
</div>`,
        },
      ],
    },
    {
      id: "skeleton",
      name: "Skeleton",
      description: "骨架屏组件，用于内容加载时的占位显示。",
      importCode: `import { Skeleton } from "@/components/ui/skeleton";`,
      props: [
        { name: "className", type: "string", default: "-", description: "自定义样式类，控制宽高等" },
      ],
      examples: [
        {
          title: "卡片骨架",
          code: `<div className="space-y-4">
  <div className="flex items-center gap-4">
    <Skeleton className="h-12 w-12 rounded-full" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-24" />
    </div>
  </div>
  <Skeleton className="h-32 w-full rounded-lg" />
</div>`,
        },
      ],
    },
    {
      id: "tooltip",
      name: "Tooltip",
      description: "工具提示组件，用于展示额外信息的悬浮提示。",
      importCode: `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";`,
      props: [
        { name: "children", type: "ReactNode", default: "-", description: "触发提示的元素" },
        { name: "content", type: "ReactNode", default: "-", description: "提示内容" },
        { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"top"', description: "提示显示位置" },
      ],
      examples: [
        {
          title: "基础用法",
          code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button>悬停</Button>
    </TooltipTrigger>
    <TooltipContent>
      这是提示内容
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
        },
      ],
    },
    {
      id: "context-menu",
      name: "ContextMenu",
      description: "右键上下文菜单组件，用于提供上下文相关的操作选项。",
      importCode: `import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";`,
      subComponents: [
        { name: "ContextMenuTrigger", description: "触发右键菜单的元素" },
        { name: "ContextMenuContent", description: "菜单内容容器" },
        { name: "ContextMenuItem", description: "单个菜单项" },
        { name: "ContextMenuSeparator", description: "菜单分隔线" },
        { name: "ContextMenuSub", description: "子菜单容器" },
        { name: "ContextMenuSubTrigger", description: "子菜单触发器" },
        { name: "ContextMenuSubContent", description: "子菜单内容" },
      ],
      examples: [
        {
          title: "基础用法",
          code: `<ContextMenu>
  <ContextMenuTrigger>
    <div>右键点击此处</div>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>编辑</ContextMenuItem>
    <ContextMenuItem>复制</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem variant="destructive">删除</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
        },
      ],
    },
  ];

  return (
    <LanguageTransition className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
              组件文档
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              完整的组件 API 参考和使用指南
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <Button variant="outline" size="sm" className="gap-2">
                <Globe className="size-4" />
                <span className="hidden sm:inline">{currentLanguage?.nativeName}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[160px]">
              {languages.map((lang) => {
                const isSelected = i18n.language === lang.code;
                return (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => i18n.changeLanguage(lang.code)}
                    className={cn(
                      "flex items-center justify-between gap-4 cursor-pointer",
                      isSelected && "bg-accent/50"
                    )}
                  >
                    <span className="flex flex-col">
                      <span className="text-sm">{lang.nativeName}</span>
                      <span className="text-xs text-muted-foreground">
                        {lang.name}
                      </span>
                    </span>
                    {isSelected && (
                      <Check className="size-4 text-primary flex-shrink-0" />
                    )}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <Tabs defaultValue="button" className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4">
            <TabsList className="w-full flex flex-wrap h-auto">
              {componentDocs.map((doc) => (
                <TabsTrigger key={doc.id} value={doc.id}>
                  {doc.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {componentDocs.map((doc) => (
            <TabsContent key={doc.id} value={doc.id} className="space-y-6">
              <section className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                    {doc.name}
                  </h2>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  {doc.description}
                </p>

                {/* 导入代码 */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-100">
                    导入
                  </h3>
                  <div className="relative bg-slate-900 dark:bg-slate-950 rounded-lg p-4">
                    <button
                      onClick={() => copyToClipboard(doc.importCode, `import-${doc.id}`)}
                      className="absolute top-2 right-2 p-2 text-slate-400 hover:text-white transition-colors"
                    >
                      {copiedIndex === `import-${doc.id}` ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <pre className="text-sm text-slate-300 overflow-x-auto">
                      <code>{doc.importCode}</code>
                    </pre>
                  </div>
                </div>

                {/* Props */}
                {doc.props && doc.props.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-100">
                      Props
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-700">
                            <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-200">
                              属性
                            </th>
                            <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-200">
                              类型
                            </th>
                            <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-200">
                              默认值
                            </th>
                            <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-200">
                              说明
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {doc.props.map((prop, index) => (
                            <tr
                              key={index}
                              className="border-b border-slate-100 dark:border-slate-800"
                            >
                              <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">
                                {prop.name}
                              </td>
                              <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-400">
                                {prop.type}
                              </td>
                              <td className="py-3 px-4 font-mono text-slate-500">
                                {prop.default}
                              </td>
                              <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                                {prop.description}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Sub Components */}
                {doc.subComponents && doc.subComponents.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-100">
                      子组件
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {doc.subComponents.map((sub, index) => (
                        <div
                          key={index}
                          className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3"
                        >
                          <code className="text-blue-600 dark:text-blue-400 font-semibold">
                            {sub.name}
                          </code>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            {sub.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Types */}
                {doc.types && doc.types.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-100">
                      类型定义
                    </h3>
                    {doc.types.map((type, index) => (
                      <div
                        key={index}
                        className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4"
                      >
                        <code className="text-blue-600 dark:text-blue-400 font-semibold">
                          {type.name}
                        </code>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 font-mono">
                          {type.properties}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Examples */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                    使用示例
                  </h3>
                  {doc.examples.map((example, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {example.title}
                      </h4>
                      <div className="relative bg-slate-900 dark:bg-slate-950 rounded-lg p-4">
                        <button
                          onClick={() => copyToClipboard(example.code, `${doc.id}-${index}`)}
                          className="absolute top-2 right-2 p-2 text-slate-400 hover:text-white transition-colors"
                        >
                          {copiedIndex === `${doc.id}-${index}` ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                        <pre className="text-sm text-slate-300 overflow-x-auto">
                          <code>{example.code}</code>
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </TabsContent>
          ))}
        </Tabs>

        <footer className="text-center mt-12 text-slate-500 dark:text-slate-400">
          <p className="mb-2">组件文档</p>
          <p className="text-sm">
            查看组件交互效果：
            <a href="/components" className="text-primary hover:underline ml-1">
              组件示例
            </a>
          </p>
        </footer>
      </div>
    </LanguageTransition>
  );
}

export default ComponentsDocsPage;
