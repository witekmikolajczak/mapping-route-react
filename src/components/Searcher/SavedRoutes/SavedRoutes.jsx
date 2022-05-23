import React, { useState, useEffect } from "react";

export const SavedRoutes = ({ departurePoint, arrivalPoint }) => {
  const departureKeyId = Math.random();
  const arrivalKeyId = Math.random();
  localStorage.setItem(`${departureKeyId}`, departurePoint);
  localStorage.setItem(`${arrivalKeyId}`, arrivalPoint);
  return (
    <>
      <div className="row mt-5">
        <div className="col-6">
          <h5>Saved Routes</h5>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p>From: {localStorage.getItem(departureKeyId)} </p>
          <p>To: {localStorage.getItem(arrivalKeyId)}</p>
        </div>
      </div>
    </>
  );
};
