const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "doovuwhgo",
    api_key: "362757378189742",
    api_secret: "FbyiFfCdTiAasAu6WEDtRl9Fp4k",
  });
  async function handleUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return res;
  }

  module.exports = {handleUpload}