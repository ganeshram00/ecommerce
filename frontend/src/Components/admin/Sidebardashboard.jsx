import React, { useState } from "react";
import { Sidebar as FlowbiteSidebar } from "flowbite-react";
import {
  HiMenu,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiUser,
  HiClipboardList,
  HiStar,
  HiArrowSmRight,
} from "react-icons/hi";
import { Link } from "react-router-dom";

export function Sidebardashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      {/* Mobile Menu Button */}
      <button
        className="p-2 text-gray-100 bg-gray-700 rounded-md lg:hidden fixed top-[100px] right-4 z-[200000]"
        onClick={toggleSidebar}
      >
        <HiMenu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-40 bg-white shadow-md transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:translate-x-0`}
      >
        <FlowbiteSidebar
          aria-label="Sidebar with multi-level dropdown example"
          className="h-full bg-white shadow-md text-gray-800"
        >
          <div className="p-4 text-center">
            <Link to={"/"}>
              <h1 className="text-2xl font-[cursive] text-gray-500">
                Ecommerce
              </h1>
            </Link>
          </div>
          <FlowbiteSidebar.Items>
            <FlowbiteSidebar.ItemGroup>
              {/* Dashboard */}
              <FlowbiteSidebar.Item
                icon={HiChartPie}
                href="/admin/dashboard"
              >
                <Link
                  to="/admin/dashboard"
                  className="hover:text-indigo-500 text-gray-400"
                >
                  Dashboard
                </Link>
              </FlowbiteSidebar.Item>

              {/* Products */}
              <FlowbiteSidebar.Collapse
                icon={HiShoppingBag}
                label={
                  <span className="text-gray-400 pl-2 flex items-center gap-2">
                    Products
                  </span>
                }
                className="hover:bg-gray-100 text-gray-400"
              >
                <FlowbiteSidebar.Item icon={HiClipboardList}>
                  <Link
                    to="/admin/products"
                    className="hover:text-indigo-500 text-gray-400"
                  >
                    All
                  </Link>
                </FlowbiteSidebar.Item>
                <FlowbiteSidebar.Item icon={HiArrowSmRight}>
                  <Link
                    to="/admin/products/create"
                    className="hover:text-indigo-500 text-gray-400"
                  >
                    Create
                  </Link>
                </FlowbiteSidebar.Item>
              </FlowbiteSidebar.Collapse>

              {/* Orders */}
              <FlowbiteSidebar.Item
                icon={HiInbox}
                href="/admin/orders"
              >
                <Link
                  to="/admin/orders"
                  className="hover:text-indigo-500 text-gray-400"
                >
                  Orders
                </Link>
              </FlowbiteSidebar.Item>

              {/* Users */}
              <FlowbiteSidebar.Item
                icon={HiUser}
                href="/admin/users"
              >
                <Link
                  to="/admin/users"
                  className="hover:text-indigo-500 text-gray-400"
                >
                  Users
                </Link>
              </FlowbiteSidebar.Item>

              {/* Reviews */}
              <FlowbiteSidebar.Item
                icon={HiStar}
                href="/admin/reviews"
              >
                <Link
                  to="/admin/reviews"
                  className="hover:text-indigo-500 text-gray-400"
                >
                  Reviews
                </Link>
              </FlowbiteSidebar.Item>
            </FlowbiteSidebar.ItemGroup>
          </FlowbiteSidebar.Items>
        </FlowbiteSidebar>
      </div>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}
