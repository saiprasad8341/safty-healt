import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../Layout.css";
import { Badge } from "antd";

const Layout = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-4-line",
    },
    {
      name: "Appointment",
      path: "/appointment",
      icon: "ri-file-list-line",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-4-line",
    },
    {
      name: "Users",
      path: "/admin/users-list",
      icon: "ri-user-line",
    },
    {
      name: "Doctors",
      path: "/admin/doctors-list",
      icon: "ri-user-star-line",
    },
  ];

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-4-line",
    },
    {
      name: "Appointment",
      path: "/doctor/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "ri-user-3-line",
    },
  ];

  const menuToBeRendered = (
    user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu
  ).map((menu) => {
    const isActive = location.pathname === menu.path;
    return (
      <div className={`d-flex menu-item ${isActive && "active-menu-item"}`}>
        <i className={menu.icon}></i>
        {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
      </div>
    );
  });

  const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";
  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="logo" onClick={() => navigate("/")}>
              SH
            </h1>
            <h1 className="role">{role}</h1>
            <div className="menu">
              {menuToBeRendered}
              <div className={`d-flex menu-item`}>
                <i className="ri-logout-circle-r-line"></i>
                {!collapsed && (
                  <Link to="/login" onClick={() => localStorage.clear()}>
                    Logout
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            <i
              className={`header-action-icon ${
                !collapsed ? "ri-close-fill" : "ri-menu-2-fill"
              }`}
              onClick={() => setCollapsed((prev) => !prev)}
            ></i>
            <div className="d-flex align-items-center px-3">
              <div className="px-3">
                <Badge
                  count={user?.unseenNotification.length}
                  overflowCount={99}
                  onClick={() => navigate("/notifications")}
                >
                  <i className="ri-notification-4-line header-action-icon px-2"></i>
                </Badge>
              </div>
              <Link to="/profile" className="anchor mx-2">
                {user?.name}
              </Link>
            </div>
          </div>
          <div className="body">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
