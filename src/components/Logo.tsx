import { TrendingUp } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full"></div>
        <div className="relative bg-gradient-primary p-2 rounded-lg">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
      </div>
      <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
        BizHealth AI
      </span>
    </div>
  );
};

export default Logo;
