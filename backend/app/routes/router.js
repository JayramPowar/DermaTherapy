import { Router } from "express";
import { PatientController } from "../controller/PatientController.js";
import { RecordSaveController } from "../controller/RecordSaveController.js";
import { RecordDataController } from "../controller/RecordDataController.js";

export const router = Router();

router.get("/", (req, res) => {
    res.send({ message: "Hello, World!" });
});

router.post("/patient", PatientController);

router.post("/records", RecordSaveController);

router.get("/records", RecordDataController);
