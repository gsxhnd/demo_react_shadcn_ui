import { useState } from "react";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { LanguageTransition } from "@/components/ui/language-transition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuTrigger, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger } from "@/components/ui/context-menu";
import { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem, ComboboxGroup, ComboboxLabel } from "@/components/ui/combobox";
import {
  Home,
  Settings,
  User,
  Bell,
  Search,
  Plus,
  Trash2,
  Copy,
  Edit,
  Download,
  Share2,
  Star,
  Heart,
  AlertCircle,
  CheckCircle,
  Info,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

function ComponentsPage() {
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [selectValue, setSelectValue] = useState<string | null>("");
  const [switchChecked, setSwitchChecked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleNotify = (type: "success" | "error" | "info" | "warning") => {
    const messages = {
      success: "操作成功！",
      error: "操作失败，请重试。",
      info: "这是一条信息提示。",
      warning: "警告：请注意此操作。",
    };
    const icons = {
      success: <CheckCircle className="w-5 h-5" />,
      error: <XCircle className="w-5 h-5" />,
      info: <Info className="w-5 h-5" />,
      warning: <AlertCircle className="w-5 h-5" />,
    };
    toast(messages[type], { icon: icons[type] });
  };

  const frameworks = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue.js" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "nextjs", label: "Next.js" },
  ];

  const buildTools = [
    { value: "vite", label: "Vite" },
    { value: "webpack", label: "Webpack" },
    { value: "rollup", label: "Rollup" },
    { value: "esbuild", label: "esbuild" },
  ];

  return (
    <LanguageTransition className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
              UI 组件示例
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              展示项目中集成的所有 shadcn/ui 组件
            </p>
          </div>
          <LanguageSwitcher />
        </header>

        <Tabs defaultValue="buttons" className="space-y-6">
          <TabsList>
            <TabsTrigger value="buttons">按钮</TabsTrigger>
            <TabsTrigger value="inputs">输入框</TabsTrigger>
            <TabsTrigger value="dialogs">对话框</TabsTrigger>
            <TabsTrigger value="selects">选择器</TabsTrigger>
            <TabsTrigger value="layout">布局组件</TabsTrigger>
            <TabsTrigger value="feedback">反馈组件</TabsTrigger>
            <TabsTrigger value="navigation">导航组件</TabsTrigger>
          </TabsList>

          {/* 按钮示例 */}
          <TabsContent value="buttons" className="space-y-6">
            <section className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
                按钮组件 (Button)
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                按钮组件支持多种变体和尺寸，用于触发操作。
              </p>

              <div className="space-y-6">
                {/* 按钮变体 */}
                <div>
                  <h3 className="text-lg font-medium mb-3 text-slate-700 dark:text-slate-200">
                    按钮变体 (Variants)
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="default">Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </div>

                <Separator />

                {/* 按钮尺寸 */}
                <div>
                  <h3 className="text-lg font-medium mb-3 text-slate-700 dark:text-slate-200">
                    按钮尺寸 (Sizes)
                  </h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="xs">Extra Small</Button>
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon-xs">
                      <Star className="w-3 h-3" />
                    </Button>
                    <Button size="icon-sm">
                      <Star className="w-3.5 h-3.5" />
                    </Button>
                    <Button size="icon">
                      <Star className="w-4 h-4" />
                    </Button>
                    <Button size="icon-lg">
                      <Star className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* 带图标的按钮 */}
                <div>
                  <h3 className="text-lg font-medium mb-3 text-slate-700 dark:text-slate-200">
                    带图标的按钮
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <Button>
                      <Plus className="w-4 h-4" data-icon="inline-start" />
                      新建
                    </Button>
                    <Button variant="secondary">
                      <Download className="w-4 h-4" data-icon="inline-start" />
                      下载
                    </Button>
                    <Button variant="outline">
                      <Share2 className="w-4 h-4" data-icon="inline-start" />
                      分享
                    </Button>
                    <Button variant="ghost">
                      <Heart className="w-4 h-4" data-icon="inline-start" />
                      收藏
                    </Button>
                    <Button variant="destructive">
                      <Trash2 className="w-4 h-4" data-icon="inline-start" />
                      删除
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* 禁用状态 */}
                <div>
                  <h3 className="text-lg font-medium mb-3 text-slate-700 dark:text-slate-200">
                    禁用状态
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <Button disabled>Default Disabled</Button>
                    <Button variant="secondary" disabled>Secondary Disabled</Button>
                    <Button variant="outline" disabled>Outline Disabled</Button>
                    <Button variant="destructive" disabled>Destructive Disabled</Button>
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>

          {/* 输入框示例 */}
          <TabsContent value="inputs" className="space-y-6">
            <section className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
                输入框组件 (Input)
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                文本输入组件，用于收集用户输入。
              </p>

              <div className="space-y-6">
                {/* 基本输入框 */}
                <div>
                  <h3 className="text-lg font-medium mb-3 text-slate-700 dark:text-slate-200">
                    基本输入框
                  </h3>
                  <Input
                    type="text"
                    placeholder="请输入文本..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  {inputValue && (
                    <p className="mt-2 text-sm text-slate-500">输入的值: {inputValue}</p>
                  )}
                </div>

                <Separator />

                {/* 带图标的输入框 */}
                <div>
                  <h3 className="text-lg font-medium mb-3 text-slate-700 dark:text-slate-200">
                    带图标的输入框
                  </h3>
                  <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input className="pl-9" placeholder="搜索..." />
                  </div>
                </div>

                <Separator />

                {/* 文本域 */}
                <div>
                  <h3 className="text-lg font-medium mb-3 text-slate-700 dark:text-slate-200">
                    文本域 (Textarea)
                  </h3>
                  <Textarea
                    placeholder="请输入多行文本..."
                    value={textareaValue}
                    onChange={(e) => setTextareaValue(e.target.value)}
                    rows={4}
                  />
                </div>

                <Separator />

                {/* 不同类型的输入框 */}
                <div>
                  <h3 className="text-lg font-medium mb-3 text-slate-700 dark:text-slate-200">
                    不同类型的输入框
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input type="email" placeholder="邮箱地址" />
                    <Input type="password" placeholder="密码" />
                    <Input type="number" placeholder="数字" />
                    <Input type="search" placeholder="搜索" />
                    <Input type="url" placeholder="网址" />
                    <Input type="tel" placeholder="电话号码" />
                  </div>
                </div>

                <Separator />

                {/* 禁用状态 */}
                <div>
                  <h3 className="text-lg font-medium mb-3 text-slate-700 dark:text-slate-200">
                    禁用状态
                  </h3>
                  <Input disabled placeholder="禁用输入框" />
                </div>
              </div>
            </section>
          </TabsContent>

          {/* 对话框示例 */}
          <TabsContent value="dialogs" className="space-y-6">
            <section className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
                对话框组件 (Dialog)
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                用于显示模态对话框，需要用户进行交互。
              </p>

              <div className="space-y-6">
                {/* 基本对话框 */}
                <div>
                  <h3 className="text-lg font-medium mb-3 text-slate-700 dark:text-slate-200">
                    基本对话框
                  </h3>
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger>
                      <Button>打开对话框</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>对话框标题</DialogTitle>
                        <DialogDescription>
                          这是一个对话框描述，解释对话框的用途和内容。
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <p className="text-slate-600 dark:text-slate-400">
                          在这里可以放置表单、信息或其他内容。
                        </p>
                      </div>
                      <DialogFooter showCloseButton>
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>
                          取消
                        </Button>
                        <Button onClick={() => setDialogOpen(false)}>确认</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <Separator />

                {/* 表单对话框 */}
                <div>
                  <h3 className="text-lg font-medium mb-3 text-slate-700 dark:text-slate-200">
                    表单对话框
                  </h3>
                  <Dialog>
                    <DialogTrigger>
                      <Button variant="secondary">编辑用户信息</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>编辑用户</DialogTitle>
                        <DialogDescription>
                          修改用户的基本信息
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">用户名</label>
                          <Input placeholder="请输入用户名" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">邮箱</label>
                          <Input type="email" placeholder="请输入邮箱" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">个人简介</label>
                          <Textarea placeholder="请输入简介" />
                        </div>
                      </div>
                      <DialogFooter showCloseButton>
                        <Button variant="outline">取消</Button>
                        <Button>保存</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <Separator />

                {/* 确认对话框 */}
                <div>
                  <h3 className="text-lg font-medium mb-3 text-slate-700 dark:text-slate-200">
                    确认对话框
                  </h3>
                  <Dialog>
                    <DialogTrigger>
                      <Button variant="destructive">删除项目</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>确认删除</DialogTitle>
                        <DialogDescription>
                          此操作不可撤销。确定要删除此项目吗？
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          删除后，所有相关数据将被永久移除。
                        </p>
                      </div>
                      <DialogFooter showCloseButton>
                        <Button variant="outline">取消</Button>
                        <Button variant="destructive">确认删除</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </section>
          </TabsContent>

          {/* 选择器示例 */}
          <TabsContent value="selects" className="space-y-6">
            <section className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
                选择器组件 (Select & Combobox)
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                用于从预定义选项中选择单个或多个值。
              </p>

              <div className="space-y-6">
                {/* 基本选择器 */}
                <div>
                  <h3 className="text-lg font-medium mb-3 text-slate-700 dark:text-slate-200">
                    基本选择器 (Select)
                  </h3>
                  <Select value={selectValue || undefined} onValueChange={setSelectValue}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="选择一个选项" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>前端框架</SelectLabel>
                        <SelectItem value="react">React</SelectItem>
                        <SelectItem value="vue">Vue.js</SelectItem>
                        <SelectItem value="angular">Angular</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>后端框架</SelectLabel>
                        <SelectItem value="node">Node.js</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="go">Go</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {selectValue && (
                    <p className="mt-2 text-sm text-slate-500">选择的值: {selectValue}</p>
                  )}
                </div>

                <Separator />

                {/* Combobox */}
                <div>
                  <h3 className="text-lg font-medium mb-3 text-slate-700 dark:text-slate-200">
                    可搜索选择器 (Combobox)
                  </h3>
                  <Combobox>
                    <ComboboxInput placeholder="搜索框架..." />
                    <ComboboxContent>
                      <ComboboxList>
                        {frameworks.map((framework) => (
                          <ComboboxItem key={framework.value} value={framework.value}>
                            {framework.label}
                          </ComboboxItem>
                        ))}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </div>

                <Separator />

                {/* 分组 Combobox */}
                <div>
                  <h3 className="text-lg font-medium mb-3 text-slate-700 dark:text-slate-200">
                    分组 Combobox 示例
                  </h3>
                  <Combobox>
                    <ComboboxInput placeholder="搜索构建工具..." />
                    <ComboboxContent>
                      <ComboboxList>
                        <ComboboxGroup>
                          <ComboboxLabel>构建工具</ComboboxLabel>
                          {buildTools.map((tool) => (
                            <ComboboxItem key={tool.value} value={tool.value}>
                              {tool.label}
                            </ComboboxItem>
                          ))}
                        </ComboboxGroup>
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </div>
              </div>
            </section>
          </TabsContent>

          {/* 布局组件示例 */}
          <TabsContent value="layout" className="space-y-6">
            <section className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
                布局组件 (Separator & Skeleton)
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                用于分隔内容和加载占位的组件。
              </p>

              <div className="space-y-6">
                {/* 分隔线 */}
                <div>
                  <h3 className="text-lg font-medium mb-3 text-slate-700 dark:text-slate-200">
                    分隔线 (Separator)
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span>选项 1</span>
                      <Separator orientation="vertical" className="h-6" />
                      <span>选项 2</span>
                      <Separator orientation="vertical" className="h-6" />
                      <span>选项 3</span>
                    </div>
                    <Separator />
                    <p>水平分隔线下方</p>
                    <Separator orientation="horizontal" />
                    <p>水平分隔线上方</p>
                  </div>
                </div>

                <Separator />

                {/* 骨架屏 */}
                <div>
                  <h3 className="text-lg font-medium mb-3 text-slate-700 dark:text-slate-200">
                    骨架屏 (Skeleton)
                  </h3>
                  <div className="space-y-4 max-w-md">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                    <Skeleton className="h-32 w-full rounded-lg" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>

          {/* 反馈组件示例 */}
          <TabsContent value="feedback" className="space-y-6">
            <section className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
                反馈组件 (Switch & Toast)
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                用于用户操作反馈和状态切换的组件。
              </p>

              <div className="space-y-6">
                {/* 开关 */}
                <div>
                  <h3 className="text-lg font-medium mb-3 text-slate-700 dark:text-slate-200">
                    开关 (Switch)
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Switch
                        id="notifications"
                        checked={switchChecked}
                        onCheckedChange={setSwitchChecked}
                      />
                      <label htmlFor="notifications" className="text-sm cursor-pointer">
                        接收通知
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch id="dark-mode" />
                      <label htmlFor="dark-mode" className="text-sm cursor-pointer">
                        深色模式
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch id="auto-save" defaultChecked />
                      <label htmlFor="auto-save" className="text-sm cursor-pointer">
                        自动保存
                      </label>
                    </div>
                    <p className="text-sm text-slate-500">
                      当前通知状态: {switchChecked ? "开启" : "关闭"}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Toast 通知 */}
                <div>
                  <h3 className="text-lg font-medium mb-3 text-slate-700 dark:text-slate-200">
                    Toast 通知 (Sonner)
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={() => handleNotify("success")}>
                      <CheckCircle className="w-4 h-4" data-icon="inline-start" />
                      成功提示
                    </Button>
                    <Button variant="secondary" onClick={() => handleNotify("error")}>
                      <XCircle className="w-4 h-4" data-icon="inline-start" />
                      错误提示
                    </Button>
                    <Button variant="outline" onClick={() => handleNotify("info")}>
                      <Info className="w-4 h-4" data-icon="inline-start" />
                      信息提示
                    </Button>
                    <Button variant="destructive" onClick={() => handleNotify("warning")}>
                      <AlertCircle className="w-4 h-4" data-icon="inline-start" />
                      警告提示
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Tooltip */}
                <div>
                  <h3 className="text-lg font-medium mb-3 text-slate-700 dark:text-slate-200">
                    工具提示 (Tooltip)
                  </h3>
                  <TooltipProvider>
                    <div className="flex gap-4">
                      <Tooltip>
                        <TooltipTrigger>
                          <Button variant="outline">悬停查看</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          这是一个工具提示
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button variant="outline">
                            <Star className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          收藏此项目
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button variant="outline">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          打开设置
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                </div>
              </div>
            </section>
          </TabsContent>

          {/* 导航组件示例 */}
          <TabsContent value="navigation" className="space-y-6">
            <section className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
                导航组件 (Context Menu)
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                右键点击按钮查看上下文菜单。
              </p>

              <div className="space-y-6">
                {/* 右键菜单 */}
                <div>
                  <h3 className="text-lg font-medium mb-3 text-slate-700 dark:text-slate-200">
                    右键上下文菜单
                  </h3>
                  <ContextMenu>
                    <ContextMenuTrigger>
                      <div className="flex items-center justify-center h-40 bg-muted rounded-lg border-2 border-dashed">
                        <p className="text-slate-500">右键点击此处</p>
                      </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem>
                        <User className="w-4 h-4" data-icon="inline-start" />
                        个人资料
                      </ContextMenuItem>
                      <ContextMenuItem>
                        <Edit className="w-4 h-4" data-icon="inline-start" />
                        编辑
                      </ContextMenuItem>
                      <ContextMenuItem>
                        <Copy className="w-4 h-4" data-icon="inline-start" />
                        复制
                      </ContextMenuItem>
                      <ContextMenuSeparator />
                      <ContextMenuItem>
                        <Star className="w-4 h-4" data-icon="inline-start" />
                        收藏
                      </ContextMenuItem>
                      <ContextMenuSub>
                        <ContextMenuSubTrigger>
                          <Share2 className="w-4 h-4" data-icon="inline-start" />
                          分享到
                        </ContextMenuSubTrigger>
                        <ContextMenuSubContent>
                          <ContextMenuItem>微信</ContextMenuItem>
                          <ContextMenuItem>微博</ContextMenuItem>
                          <ContextMenuItem>邮箱</ContextMenuItem>
                        </ContextMenuSubContent>
                      </ContextMenuSub>
                      <ContextMenuSeparator />
                      <ContextMenuItem variant="destructive">
                        <Trash2 className="w-4 h-4" data-icon="inline-start" />
                        删除
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                </div>

                <Separator />

                {/* 嵌套菜单 */}
                <div>
                  <h3 className="text-lg font-medium mb-3 text-slate-700 dark:text-slate-200">
                    多级嵌套菜单
                  </h3>
                  <ContextMenu>
                    <ContextMenuTrigger>
                      <Button variant="secondary">右键打开多级菜单</Button>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem>
                        <Home className="w-4 h-4" data-icon="inline-start" />
                        首页
                      </ContextMenuItem>
                      <ContextMenuItem>
                        <Bell className="w-4 h-4" data-icon="inline-start" />
                        通知
                      </ContextMenuItem>
                      <ContextMenuSeparator />
                      <ContextMenuSub>
                        <ContextMenuSubTrigger>
                          <Settings className="w-4 h-4" data-icon="inline-start" />
                          设置
                        </ContextMenuSubTrigger>
                        <ContextMenuSubContent>
                          <ContextMenuLabel>账户设置</ContextMenuLabel>
                          <ContextMenuItem>基本信息</ContextMenuItem>
                          <ContextMenuItem>安全设置</ContextMenuItem>
                          <ContextMenuSeparator />
                          <ContextMenuLabel>应用设置</ContextMenuLabel>
                          <ContextMenuItem>主题设置</ContextMenuItem>
                          <ContextMenuItem>通知设置</ContextMenuItem>
                          <ContextMenuSub>
                            <ContextMenuSubTrigger>语言设置</ContextMenuSubTrigger>
                            <ContextMenuSubContent>
                              <ContextMenuItem>中文</ContextMenuItem>
                              <ContextMenuItem>English</ContextMenuItem>
                              <ContextMenuItem>日本語</ContextMenuItem>
                              <ContextMenuItem>한국어</ContextMenuItem>
                            </ContextMenuSubContent>
                          </ContextMenuSub>
                        </ContextMenuSubContent>
                      </ContextMenuSub>
                    </ContextMenuContent>
                  </ContextMenu>
                </div>
              </div>
            </section>
          </TabsContent>
        </Tabs>

        <footer className="text-center mt-12 text-slate-500 dark:text-slate-400">
          <p>UI 组件库示例 - v0.5.0</p>
        </footer>
      </div>
    </LanguageTransition>
  );
}

export default ComponentsPage;
