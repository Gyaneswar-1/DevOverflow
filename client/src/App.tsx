import { useSelector } from "react-redux";
import RouterHandler from "./routes/RouterHandler.route";
import { Toaster } from "@/components/ui/sonner";
import { Loader } from "lucide-react";
import type { RootState } from "./store/store";

function App() {
  // const loading = useSelector((state: any) => state.loader.loading);
    const loading = useSelector((state: RootState) => state.loadingReducer.loading);
  

  if (loading) {
    <Loader />;
  }

  return (
    <div>
      <RouterHandler />
      <Toaster />
    </div>
  );
}

export default App;
