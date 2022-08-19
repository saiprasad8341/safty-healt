import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { Col, Row } from "antd";
import Doctor from "../components/Doctor";

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(showLoading());
      // axios formate like URL, payload, header
      const response = await axios.get("/api/user/get-all-approved-doctors", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.data.success) {
        dispatch(hideLoading());
        setDoctors(response.data.data);
      }
      // console.log(response.data);
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout>
      <h1 className="page-title">Home page</h1>
      <hr />
      <Row gutter={20}>
        {doctors.map((doctor) => (
          <Col span={8} xs={24} sm={24} lg={8}>
            <Doctor doctor={doctor} />
          </Col>
        ))}
      </Row>
    </Layout>
  );
};

export default Home;
