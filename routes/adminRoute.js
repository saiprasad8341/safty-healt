import express from "express";
import User from "../Models/UserModel.js";
import Doctor from "../Models/DoctorModel.js";
import { authMiddleware } from "../middleware/middleware.js";

const router = express.Router();

router.get("/get-all-doctors", authMiddleware, async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).send({
      success: true,
      message: "Doctors Fetched Successfully",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error getting the doctors list",
      success: false,
      error,
    });
  }
});

router.get("/get-all-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      success: true,
      message: "Users Fetched Successfully",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error getting the Users list",
      success: false,
      error,
    });
  }
});

router.post("/change-doctor-status", authMiddleware, async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(doctorId, { status });

    const user = await User.findOne({ _id: doctor.userId });
    const unseenNotification = user.unseenNotification;
    unseenNotification.push({
      type: "doctor-account-request-changed",
      message: `${doctor.firstName} ${doctor.lastName} doctor account has been ${status}`,
      onClickPath: "/notifications",
    });
    user.isDoctor = status === "approved" ? true : false;
    await user.save();
    // await User.findByIdAndUpdate(user._id, { unseenNotification });
    res.status(200).send({
      message: "Doctor status updated successfully",
      success: true,
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Getting on updating status",
      success: false,
      error,
    });
  }
});

export default router;
