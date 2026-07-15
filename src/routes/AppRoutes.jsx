import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./PublicRoutes.jsx";
import AthleteRoutes from "./AthleteRoutes.jsx";
import CoachRoutes from "./CoachRoutes.jsx";
import AdminRoutes from "./AdminRoutes.jsx";
import NotFound from "../pages/public/NotFound.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      {PublicRoutes}
      {AthleteRoutes}
      {CoachRoutes}
      {AdminRoutes}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
