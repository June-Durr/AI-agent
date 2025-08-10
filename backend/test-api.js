// backend/test-api.js
const axios = require("axios");
const fs = require("fs");

async function testAPI() {
  try {
    // Read API URL
    const apiUrl = fs.readFileSync("../api-url.txt", "utf8").trim();

    // Read a test image (use one of your Lennox photos)
    const imageBuffer = fs.readFileSync("test-image.jpg");
    const imageBase64 = imageBuffer.toString("base64");

    // Make request
    const response = await axios.post(`${apiUrl}/analyze`, {
      imageBase64: imageBase64,
      equipmentType: "hvac",
    });

    console.log("Response:", JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

// First install axios
// npm install axios

testAPI();
