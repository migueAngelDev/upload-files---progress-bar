const $imagePreview = document.getElementById("img-preview"),
  $imageUploader = document.getElementById("img-uploader"),
  $imageProgress = document.getElementById("img-upload-bar");

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dcahjwjye/image/upload",
  CLOUDINARY_UPLOAD_PRESET = "cndnitue";

$imageUploader.addEventListener("change", async (e) => {
  const file = e.target.files[0];

  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const res = await axios.post(CLOUDINARY_URL, formData, {
    Headers: {
      "Content-Type": "multipart/form-data",
    },

    onUploadProgress(e) {
      const progress = (e.loaded * 100) / e.total;
      $imageProgress.setAttribute("value", progress);
    },
  });

  $imagePreview.src = res.data.secure_url;
});
