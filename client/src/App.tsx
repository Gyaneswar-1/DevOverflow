import { useSelector } from "react-redux";
import RouterHandler from "./routes/RouterHandler.route";
import { Toaster } from "@/components/ui/sonner";
import { Loader } from "lucide-react";
import type { RootState } from "./store/store";
import { ThemeProvider } from "./components/ui/ThemeProvider";

function App() {
  // const loading = useSelector((state: any) => state.loader.loading);
  const loading = useSelector(
    (state: RootState) => state.authReducer.isLoading
  );

  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        
          <>
            <RouterHandler />
            <Toaster />
          </>
      
      </ThemeProvider>
    </div>
  );
}

export default App;
