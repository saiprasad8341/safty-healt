import { Tabs } from "antd";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { setUser } from "../redux/userSlice";

const Notifications = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const markAllAsSeen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/mark-all-notification-as-seen",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  const DeleteAll = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/delete-all-notifications",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <h1 className="page-title">Notifications</h1>
      <hr />
      <Tabs>
        <Tabs.TabPane tab="unseen" key={1}>
          <div className="d-flex justify-content-end">
            <h1 className="anchor" onClick={() => markAllAsSeen()}>
              Mark all as seen
            </h1>
          </div>
          {user?.unseenNotification.map((notification) => {
            // console.log(notification);
            return (
              <div
                className="card p-2 mt-2"
                onClick={() => {
                  navigate(notification.onClickPath);
                }}
              >
                <div className="card-text">{notification.message}</div>
              </div>
            );
          })}
        </Tabs.TabPane>
        <Tabs.TabPane tab="seen" key={2}>
          <div className="d-flex justify-content-end">
            <h1 className="anchor" onClick={() => DeleteAll()}>
              Delete all
            </h1>
          </div>
          {user?.seenNotifications.map((notification) => {
            // console.log(notification);
            return (
              <div
                className="card p-2 mt-2"
                onClick={() => {
                  navigate(notification.onClickPath);
                }}
              >
                <div className="card-text">{notification.message}</div>
              </div>
            );
          })}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default Notifications;
