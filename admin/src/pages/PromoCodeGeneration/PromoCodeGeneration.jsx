import { useEffect, useState } from "react";
import "./PromoCodeGeneration.css";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const PromoCodeGeneration = ({ url }) => {
  const [promoCodes, setPromoCodes] = useState([]);
  const [formData, setFormData] = useState({
    code: "",
    discount: "",
    expiration: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generateRandomCode = async () => {
    try {
      const res = await axios.get(url + "/api/promoCode/generate");
      if (res.data.success) {
        setFormData({ ...formData, code: res.data.data });
      } else {
        alert("Error generating promo code");
      }
    } catch (error) {
      console.error("Error generating promo code:", error);
      alert("Error generating promo code");
    }
  };

  const createPromoCode = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(url + "/api/promoCode/create", formData);
      if (res.data.success) {
        getAllPromoCodes();
        setFormData({ code: "", discount: "", expiration: "" });
      }
    } catch (error) {
      console.error("Error creating promo code:", error);
      alert("Error creating promo code");
    }
  };

  const deletePromoCode = async (id) => {
    try {
      const res = await axios.delete(`${url}/api/promoCode/delete?id=${id}`);
      if (res.data.success) {
          alert("Promo code deleted successfully");
          getAllPromoCodes();
      } else {
        alert("Error deleting promo code");
      }
    } catch (error) {
      console.error("Error deleting promo code:", error);
      alert("Error deleting promo code");
    }
  };

  useEffect(() => {
    getAllPromoCodes();
  }, []);

  const getAllPromoCodes = async () => {
    try {
      const res = await axios.get(url + "/api/promoCode/list");
      if (res.data.success) {
        setPromoCodes(res.data.data);
      } else {
        alert("Error retrieving promo codes");
      }
    } catch (error) {
      console.error("Error retrieving promo codes:", error);
      alert("Error retrieving promo codes");
    }
  };
  return (
    <div className="container">
      <h1>Promo Code Generation</h1>
      <form onSubmit={createPromoCode}>
        <div>
          <label>Promo Code:</label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              onClick={generateRandomCode}
              style={{ marginLeft: "10px" }}
            >
              Generate
            </button>
          </div>
        </div>
        <div>
          <label>Discount Percentage:</label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Expiration Date:</label>
          <input
            type="date"
            name="expiration"
            value={formData.expiration}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Generate Promo Code</button>
      </form>

      <h2>Generated Promo Codes</h2>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Discount</th>
            <th>Expiration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {promoCodes.map((promo) => (
            <tr key={promo.id}>
              <td>{promo.code}</td>
              <td>{promo.discount}%</td>
              <td>{promo.expiration}</td>
              <td>
                <button onClick={() => deletePromoCode(promo._id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PromoCodeGeneration;
