import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const apiSecret = import.meta.env.VITE_API_SECRET;

export const sankalpalogin = async (phone) => {
  try {
    console.log("sankalpalogin called with phone:", phone); // Debug log
    const response = await axios.post(`${baseURL}/getuser/${phone}`, {}, {
      headers: {
        "x-api-key": apiKey,
        "x-api-secret": apiSecret
      }
    });

    return response.data; // ✅ return only useful data
  } catch (error) {
    console.error("Login API error:", error);
    return { success: false, error: error.response?.data || "Network Error" };
  }
};

export const updatesankalpa = async (Phone,newsankalpa) => {
  try {
    console.log("sankalpa updates:", Phone,newsankalpa); // Debug log
    const response = await axios.patch(`${baseURL}/updateSankalpa/${Phone}`, {
      Sankalpa: newsankalpa
    }, {
      
    });

    return response.data; // ✅ return only useful data
  } catch (error) {
    console.error("Login API error:", error);
    return { success: false, error: error.response?.data || "Network Error" };
  }
};


export const updateckecked = async (Phone) => {
  try {
    console.log("checked updates:", Phone); // Debug log
    const response = await axios.patch(`${baseURL}/updateChecked/${Phone}`, {
      Checked: true
    }, {
      
    });

    return response.data; // ✅ return only useful data
  } catch (error) {
    console.error("Login API error:", error);
    return { success: false, error: error.response?.data || "Network Error" };
  }
};

export const adminlogin = async () => {
  try {
    const response = await axios.get(
      `${baseURL}/checked`,
      {},  // body
      {
        headers: {
          "ngrok-skip-browser-warning": "hhy66hafffa",
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Login API error:", error);
    return { success: false, error: error.response?.data || "Network Error" };
  }
};

