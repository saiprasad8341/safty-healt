import React from "react";
import { useNavigate } from "react-router-dom";

const Doctor = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <div
      className="card p-3 cursor-pointer"
      onClick={() => navigate(`/book-appointment/${doctor._id}`)}
    >
      <h1 className="card-title">
        {doctor.firstName} {doctor.lastName}
      </h1>
      <hr />
      <p className="card-text">
        <b>Specialization: </b>
        {doctor.specialization}
      </p>
      <p className="card-text">
        <b>Experience: </b>
        {doctor.experience}
      </p>
      <p className="card-text">
        <b>Phone Number: </b>
        {doctor.phone}
      </p>
      <p className="card-text">
        <b>Address: </b>
        {doctor.address}
      </p>
      <p className="card-text">
        <b>Timings: </b>
        {doctor.timings[0]} - {doctor.timings[1]}
      </p>
    </div>
  );
};

export default Doctor;
