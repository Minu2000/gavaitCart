// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// function Payment() {
//   const [formData, setFormData] = useState({
//     _id: "",
//     credit_card_provider: "",
//     card_number: "",
//     card_holder: "",
//     expiration_date: "",
//     cvv: ""
//   });
//   const [result, setResult] = useState("");
//   const navigate=useNavigate('');
//   const handleChange = (event) => {
//     setFormData({
//       ...formData,
//       [event.target.name]: event.target.value
//     });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/api/v1/match_credit_card", formData,{
//         headers: {
//           "Authorization": `Bearer ${localStorage.getItem('access_token')}`
//         }
//       });
//       setResult(response.data);
//     } catch (error) {
//       setResult(error.response.data);
//     }
//   };

//   return (
//     <div style={{ backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "10px" }}>
//       <h2>Credit Card Details</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Account ID:</label>
//           <input type="text" name="_id" value={formData._id} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Credit Card Provider:</label>
//           <input type="text" name="credit_card_provider" value={formData.credit_card_provider} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Card Number:</label>
//           <input type="text" name="card_number" value={formData.card_number} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Card Holder:</label>
//           <input type="text" name="card_holder" value={formData.card_holder} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Expiration Date:</label>
//           <input type="text" name="expiration_date" value={formData.expiration_date} onChange={handleChange} />
//         </div>
//         <div>
//           <label>CVV:</label>
//           <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} />
//         </div>
//         <br />
//         <button type="submit" onClick={()=>navigate('/shippment')} style={{ backgroundColor: "#4fc3f7", color: "black", padding: "10px", borderRadius: "5px", border: "none", cursor: "pointer" , marginRight:"10px"}}>SUBMIT</button>
//         <button type="submit" onClick={()=>navigate('/address')} style={{ backgroundColor: "#4CAF50", color: "white", padding: "10px", borderRadius: "5px", border: "none", cursor: "pointer" ,marginRight:"10px" }}>GO BACK</button>
//       </form>
//       {result && <p style={{ marginTop: "10px", backgroundColor: "#d7f1dd", padding: "10px", borderRadius: "5px" }}>{result}</p>}
     
//     </div>
//   );
// }

// export default Payment;
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [formData, setFormData] = useState({
    _id: "",
    credit_card_provider: "",
    card_number: "",
    card_holder: "",
    expiration_date: "",
    cvv: ""
  });
  const [result, setResult] = useState("");
  const navigate=useNavigate('');

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/v1/match_credit_card", formData,{
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      const result = response.data;
      if (result === "Credit card details matched successfully") {
        navigate('/shippment');
      } else {
        setResult(result);
      }
    } catch (error) {
      setResult(error.response.data);
    }
  };

  return (
    <div style={{ backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "10px" }}>
      <h2>Credit Card Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Account ID:</label>
          <input type="text" name="_id" value={formData._id} onChange={handleChange} />
        </div>
        <div>
          <label>Credit Card Provider:</label>
          <input type="text" name="credit_card_provider" value={formData.credit_card_provider} onChange={handleChange} />
        </div>
        <div>
          <label>Card Number:</label>
          <input type="text" name="card_number" value={formData.card_number} onChange={handleChange} />
        </div>
        <div>
          <label>Card Holder:</label>
          <input type="text" name="card_holder" value={formData.card_holder} onChange={handleChange} />
        </div>
        <div>
          <label>Expiration Date:</label>
          <input type="text" name="expiration_date" value={formData.expiration_date} onChange={handleChange} />
        </div>
        <div>
          <label>CVV:</label>
          <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} />
        </div>
        <br />
        <button type="submit" style={{ backgroundColor: "#4fc3f7", color: "black", padding: "10px", borderRadius: "5px", border: "none", cursor: "pointer" , marginRight:"10px"}}>SUBMIT</button>
        <button type="button" onClick={()=>navigate('/viewproducts')} style={{ backgroundColor: "#4CAF50", color: "white", padding: "10px", borderRadius: "5px", border: "none", cursor: "pointer" ,marginRight:"10px" }}>GO BACK</button>
      </form>
      {result && <p style={{ marginTop: "10px", backgroundColor: "#d7f1dd", padding: "10px", borderRadius: "5px" }}>{result}</p>}
    </div>
  );
}

export default Payment;
