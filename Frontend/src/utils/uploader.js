import axios from "axios";
import fetcher from "./fetcher";

const cloud_name = "dljep9qgw";
const cloud_api_key = "485977825684594";

const uploader = async (file, type, uniqueId) => {
  try {
    const sign = await getSignature();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: false,
    };

    if (Array.isArray(file)) {
      // Bulk upload
      const urls = [];

      for (const f of file) {
        const body = getFormData(f, sign);

        const cloudinaryResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`,
          body,
          config
        );
        console.log("bulk image upload done", cloudinaryResponse);
        urls.push({
          publicId: cloudinaryResponse.data.public_id,
          url: cloudinaryResponse.data.secure_url,
        });
      }

      console.log("update bulk url", urls);
      const res = await updateImageUrl(type, uniqueId, urls);
      return res;
    } else {
      // Single upload
      const body = getFormData(file, sign);

      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`,
        body,
        config
      );
      const res = await updateImageUrl(type, uniqueId, cloudinaryResponse.data);
      return res;
    }
  } catch (error) {
    console.error(error);
  }
};

const getSignature = async () => {
  const signatureObj = await fetcher(
    "http://localhost:5000/api/v1/file/upload-signature",
    "GET"
  );
  return signatureObj;
};

const getFormData = (file, s) => {
  const form = new FormData();
  form.set("file", file);
  form.set("api_key", cloud_api_key);
  form.set("signature", s.signature);
  form.set("timestamp", s.timestamp);
  return form;
};

const updateImageUrl = async (
  collectionName,
  queryObject,
  cloudinaryResponse
) => {
  if (Array.isArray(cloudinaryResponse)) {
    const body = {
      collection: collectionName,
      "query-param": queryObject,
      "image-list": cloudinaryResponse,
    };

    const response = await fetcher(
      "http://localhost:5000/api/v1/file/update-url",
      "POST",
      body
    );

    return response;
  } else {
    const body = {
      "public-id": cloudinaryResponse.public_id,
      "image-url": cloudinaryResponse.secure_url,
      collection: collectionName,
      "query-param": queryObject,
    };

    const response = await fetcher(
      "http://localhost:5000/api/v1/file/update-url",
      "POST",
      body
    );

    return response;
  }
};

export default uploader;
