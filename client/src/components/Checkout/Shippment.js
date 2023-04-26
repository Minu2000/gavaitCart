import React from "react";
import truck from "../Checkout/truck.mp4";
function ShippmentPage() {
  return (
    <div style={{ backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "10px" }}>
      <h2>your product is on the way!</h2>
      <video src={truck} autoPlay loop muted style={{ width: "100%", borderRadius: "10px" }} type="truck/mp4">
        </video>
      {/* <p style={{ marginTop: "10px" }}>
        
      </p> */}
    </div>
  );
}

export default ShippmentPage;
