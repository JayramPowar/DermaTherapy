import { Record } from "../db/models/recordModel.js";

export const RecordDataController = async (req, res) => {
  try {
    const patientEmail = req.query.email; // email passed as query param
    if (!patientEmail) {
      return res.status(400).json({
        success: false,
        message: "Email query parameter is required",
      });
    }

    // Filter by patientEmail
    const records = await Record.find({ patientEmail });

    if (!records || records.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No records found for this email",
      });
    }

    return res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    console.error("Error fetching records:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching records",
      error: error.message,
    });
  }
};
