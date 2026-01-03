import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { api } from "../api/api.js";

async function predictFromImage({ workspaceName, workflowId, apiKey, imageBase64 }) {
    if (!workspaceName || !workflowId || !apiKey) {
        throw new Error("Missing required parameters for API call.");
    }

    const payload = {
        api_key: apiKey,
        inputs: {
            image: {
                type: "base64",
                value: imageBase64
            }
        },
        use_cache: true
    };

    try {
        const response = await api.post(`${workspaceName}/${workflowId}`, payload);
        return response.data?.outputs?.[0]?.predictions ?? [];
    } catch (error) {
        throw new Error(
            typeof error.response?.data === "object"
                ? JSON.stringify(error.response?.data, null, 2)
                : error.response?.data || error.message
        );
    }
}


const subClassConfig = {
    acne:       { api_key: "lGuDxZ2LeV6f8SZcwHS9", workspace_name: "eczema-veixh", workflow_id: "custom-workflow-29" },
    eczema:     { api_key: "PWPI0pRFEhoK1qVt2Aag", workspace_name: "eczema-dataset", workflow_id: "custom-workflow-35" },
    melasma:    { api_key: "lGuDxZ2LeV6f8SZcwHS9", workspace_name: "eczema-veixh", workflow_id: "custom-workflow-30" },
    tinea:      { api_key: "lGuDxZ2LeV6f8SZcwHS9", workspace_name: "eczema-veixh", workflow_id: "custom-workflow-31" },
    psoriasis:  { api_key: "lGuDxZ2LeV6f8SZcwHS9", workspace_name: "eczema-veixh", workflow_id: "custom-workflow-32" }
};


/**
 * Tool: Predict Base Class
 */
export const predictBaseClass = tool(
    async ({ imageBase64 }) => {
        return await predictFromImage({
            workspaceName: process.env.BASE_WORKSPACE_NAME,
            workflowId: process.env.BASE_WORKFLOW_ID,
            apiKey: process.env.BASE_API_KEY,
            imageBase64
        });
    },
    {
        name: "predict_base_class",
        description: "Predict base classes from a Base64-encoded image. If you have an image path instead, use 'encode' first to get base64.",
        schema: z.object({
            imageBase64: z.string().min(10, "Base64 string is too short"),
        }),
    }
);


/**
 * Tool: Predict Sub Class
 */
export const predictSubClass = tool(
    async ({ imageBase64, baseClass }) => {
        const key = baseClass.trim().toLowerCase();
        const cfg = subClassConfig[key];
        if (!cfg) throw new Error(`No configuration found for base class "${baseClass}"`);

        return await predictFromImage({
            workspaceName: cfg.workspace_name,
            workflowId: cfg.workflow_id,
            apiKey: cfg.api_key,
            imageBase64
        });
    },
    {
        name: "predict_sub_class",
        description: "Predict sub classes from a Base64-encoded image. If you have an image path instead, use 'encode' first to get base64.",
        schema: z.object({
            imageBase64: z.string().min(10, "Base64 string is too short"),
            baseClass: z.string().min(1, "Base class is required"),
        }),
    }
);
