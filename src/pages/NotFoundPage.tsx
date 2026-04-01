import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { Home, ArrowLeft } from "lucide-react";

function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
            <div className="text-center px-4">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-slate-200 dark:text-slate-700">404</h1>
                </div>
                <h2 className="text-3xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
                    页面未找到
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                    抱歉，您访问的页面不存在或已被移除
                </p>
                <div className="flex gap-4 justify-center">
                    <Button onClick={() => navigate(-1)} variant="outline">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        返回上一页
                    </Button>
                    <Button onClick={() => navigate("/")}>
                        <Home className="w-4 h-4 mr-2" />
                        返回首页
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default NotFoundPage;
