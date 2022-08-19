import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import moment from "moment";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "/api/user/get-appointments-by-user-id",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setAppointments(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getAppointmentsData();
  }, []);

  const columns = [
    {
      title: "id",
      dataIndex: "_id",
    },
    {
      title: "Doctor",
      dataIndex: "name",
      render: (text, record) => (
        <h1 className="normal-text">
          <span>
            {record.doctorInfo.firstName} {record.doctorInfo.lastName}
          </span>
        </h1>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (text, record) => (
        <h1 className="normal-text">
          <span>{record.doctorInfo.phone}</span>
        </h1>
      ),
    },
    {
      title: "Date & time",
      dataIndex: "createdAt",
      render: (text, record) => (
        <h1 className="normal-text">
          <span>
            {moment(record.date).format("DD-MM-YYYY")}{" "}
            {moment(record.time).format("HH:mm")}
          </span>
        </h1>
      ),
    },
    {
      title: "status",
      dataIndex: "status",
    },
  ];
  return (
    <Layout>
      <h1 className="page-title">Appointments</h1>
      <hr />
      <Table columns={columns} dataSource={appointments} re />
    </Layout>
  );
};

export default Appointments;
