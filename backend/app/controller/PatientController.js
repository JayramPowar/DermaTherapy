import { AgentController } from "./AgentController.js"

export const PatientController = async (req, res) => {
    const data = req.body;
    
    try {
        const response = await AgentController(data);
        res.send({ message: response });
    } catch (error) {
        console.error(error);
        res.send({ error: error.message || error })
    }
}