import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "@page/home";
import Login from "@page/login";
import { ThemeProvider } from "@/contexts/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
