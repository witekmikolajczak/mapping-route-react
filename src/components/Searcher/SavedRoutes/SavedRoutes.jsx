import React, { useState, useEffect } from "react";

export const SavedRoutes = ({ departurePoint, arrivalPoint }) => {
  const [startPoint, setStartPoint] = useState([]);

  useEffect(() => {
    if (departurePoint !== undefined) {
      setStartPoint((prevState) => [...prevState, departurePoint]);

      console.log(localStorage.getItem("arr"));
      localStorage.setItem("arr", JSON.stringify(startPoint));
    }
  }, [departurePoint]);

  const storedDeparturePoints = JSON.parse(localStorage.getItem("arr"));
  return (
    <>
      <div className="row mt-5">
        <div className="col-6">
          <h5>Saved Routes</h5>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p>From: {localStorage.getItem("arr")} </p>
          <p>To: </p>
        </div>
      </div>
    </>
  );
};
