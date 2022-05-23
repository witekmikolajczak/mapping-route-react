import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// styles
import "./CalcPricing.scss";

export const CalcPricing = ({ departure, arrival, distance }) => {
  const [price, setPrice] = useState(0);
  const dataTravelRef = useRef(null);

  const handlePriceChange = (event) => {
    const enteredPrice = event.target.value;
    setPrice(parseFloat(enteredPrice * distance).toFixed(2));
  };

  const printDocument = () => {
    html2canvas(dataTravelRef.current).then((canvas) => {
      const image = canvas.toDataURL("image/png");
      const pdfDocument = new jsPDF();
      pdfDocument.addImage(image, "JPEG", 50, 10);
      pdfDocument.save("download.pdf");
    });
  };
  return (
    <>
      <div ref={dataTravelRef}>
        <div className="row mt-5">
          <div className="col d-flex justify-content-center">
            <h5>Route details</h5>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <i className="info">
              you can drive 800 km per day, the price per day is 1000 PLN
            </i>
            <p>
              <b>From:</b> {departure.text.slice(0, 20).concat("...")}{" "}
            </p>
            <p>
              <b>To:</b> {arrival.text.slice(0, 20).concat("...")}
            </p>
            <p>
              <b>Distance:</b> {distance} km
            </p>
            <p>
              <b>Number of days for the journey: </b>
              {distance >= 800 ? Math.ceil(distance / 800) : "< 0"}
            </p>

            <p>
              <b>Total cost of travel: </b>
              {distance >= 800
                ? Number(price) + Math.ceil(distance / 800) * 1000
                : Number(price)}
              PLN
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <form action="" className="d-flex flex-column">
              <label htmlFor="">Enter cost per Km in PLN</label>
              <input
                className="col-2"
                type="number"
                onChange={handlePriceChange}
              />
            </form>
          </div>
        </div>
      </div>
      <button className="mt-2" onClick={printDocument}>
        Download
      </button>
    </>
  );
};
