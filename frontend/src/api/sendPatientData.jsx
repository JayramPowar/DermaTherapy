import { api } from "@/api/api"

export const sendPatientData = async (data) => {
  try {
    // If there's at least one image, encode the first one
    if (data.images && data.images.length > 0) {
      const file = data.images[0].file;

      // Convert File → Base64
      const toBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            // strip "data:image/jpeg;base64," part
            resolve(reader.result.split(",")[1]);
          };
          reader.onerror = (err) => reject(err);
        });
      };

      const base64Image = await toBase64(file);

      // Replace images with just base64 string
      data = {
        ...data,
        image: base64Image, // 👈 single image as base64
      };

      // Optionally: remove original images array so backend doesn't choke
      delete data.images;
    }

    console.log("Payload to backend:", data);

    const response = await api.post("/patient", data);
    return response.data;
  } catch (error) {
    console.error("Error sending patient data:", error);
    return;
  }
};
