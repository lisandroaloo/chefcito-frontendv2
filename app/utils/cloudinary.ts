// utils/cloudinary.ts
import * as ImagePicker from "expo-image-picker";

const CLOUD_NAME = "dljyjtvnv";
const UPLOAD_PRESET = "chefcito";

export const pickImageAndUpload = async (): Promise<string | null> => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permissionResult.granted) {
    alert("Necesitamos permisos para acceder a la galería.");
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 0.7,
    base64: true,
  });

  if (!result.canceled && result.assets?.length > 0) {
    const image = result.assets[0];
    const base64Image = image.base64;

    if (!base64Image) {
      alert("No se pudo obtener la imagen en formato Base64.");
      return null;
    }

    const formData = new FormData();
    formData.append("file", `data:image/jpeg;base64,${base64Image}`);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
        // NO debes poner 'Content-Type', el navegador lo pondrá automáticamente para form-data
      });

      const data = await response.json();

      if (data.secure_url) {
        return data.secure_url;
      } else {
        console.error("Cloudinary upload error:", data);
        throw new Error(data.error?.message || "No se pudo subir la imagen a Cloudinary.");
      }
    } catch (err: any) {
      alert("Error al subir imagen: " + err.message);
      return null;
    }
  }

  return null;
};
