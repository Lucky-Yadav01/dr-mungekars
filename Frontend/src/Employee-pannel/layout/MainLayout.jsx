import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import adminRoutes from "../routes";
import Navbar from "../Components/Navbar";

const sidebarLinks = adminRoutes.filter((route) => route.label && route.showInSidebar !== false);

const normalizePath = (pathname) => {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "") || "/";
};

const MainLayout = ({ children }) => {
  const location = useLocation();
  const normalizedPath = normalizePath(location.pathname);
  const activeRoute =
    sidebarLinks.find((route) => route.to === normalizedPath) ??
    sidebarLinks.find((route) => route.index);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-700">
      <Navbar
        pageTitle={activeRoute?.pageTitle ?? "Admin Console"}
        navLinks={sidebarLinks}
      />

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-amber-50/50">
        <div className="max-w-[1440px] mx-auto w-full">
          {children ?? <Outlet />}
        </div>
      </main>

      <footer className="py-3 px-6 text-center text-xs text-gray-400 border-t border-gray-200 bg-white">
        © {new Date().getFullYear()} Dr. Mungekar&apos;s Clinic
      </footer>
    </div>
  );
};

export default MainLayout;
