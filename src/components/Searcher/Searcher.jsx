import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { SavedRoutes } from "./SavedRoutes/SavedRoutes";
import { geocode } from "esri-leaflet-geocoder";

// styles
import "./Searcher.scss";

export const Searcher = (props) => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaveHistory, setIsSaveHistory] = useState(false);
  const navigate = useNavigate();

  // window.localStorage.removeItem("searchKeywords");

  const departureRef = useRef("");
  const arrivalRef = useRef("");

  // Handle departure location point
  const handleDeparturePoint = (event) => {
    geocode({
      apikey:
        "AAPKf4fb6bf885e741dcb04350c24254dfcaRj3Nh-5mM_wIZUBlQ0kVTORrxIjMF52RjxcgW0l5-U9BT00IMNEdlgMpHNQ3U15X",
    })
      .text(event.target.value)
      .run(function (err, results, response) {
        if (err) {
          console.log(err);
          return;
        }
        setDeparture(results);
        setIsLoading(true);
      });
  };

  // Handle arrival location point
  const handleArrivalPoint = (event) => {
    geocode({
      apikey:
        "AAPKf4fb6bf885e741dcb04350c24254dfcaRj3Nh-5mM_wIZUBlQ0kVTORrxIjMF52RjxcgW0l5-U9BT00IMNEdlgMpHNQ3U15X",
    })
      .text(event.target.value)
      .run(function (err, results, response) {
        if (err) {
          console.log(err);
          return;
        }
        setArrival(results);
      });
  };

  const handleDepartureLocationClick = (departureLocation) => {
    departureRef.current.value = departureLocation.text;
    setDeparture(departureLocation);
  };

  const handleArrivalLocationClick = (arrivalLocation) => {
    arrivalRef.current.value = arrivalLocation.text;
    setArrival(arrivalLocation);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();

    props.departure(departure);
    props.arrival(arrival);
    props.isLoading(isLoading);
    navigate("/map", { replace: true });
  };

  return (
    <div className="container">
      <form className="px-5 py-2 mt-5 " onSubmit={handleFormSubmit}>
        <h3>Search </h3>
        <div className="row ">
          <div className="col-5">
            <label>Departure point</label>
            <div>
              <input
                ref={departureRef}
                className="w-100 p-2"
                type="text"
                placeholder="From: "
                onChange={handleDeparturePoint}
                required
              />
              {departure.results !== undefined && (
                <ul className="col-12 py-2">
                  {departure.results.map((location) => (
                    <li
                      className="px-4 py-3"
                      key={Math.random()}
                      onClick={() => handleDepartureLocationClick(location)}
                    >
                      {location.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="col-5">
            <label>Arrival point</label>
            <input
              ref={arrivalRef}
              className="w-100 p-2"
              type="text"
              placeholder="To: "
              onChange={handleArrivalPoint}
              required
            />
            {arrival.results !== undefined && (
              <ul className="col-12 py-2">
                {arrival.results.map((location) => (
                  <li
                    className="px-4 py-3"
                    key={Math.random()}
                    onClick={() => handleArrivalLocationClick(location)}
                  >
                    {location.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="col-2  pt-4">
            <button className=" w-100 p-2">Search</button>
          </div>
        </div>
        <div className="row justify-content-center"></div>
      </form>
      <SavedRoutes
        departurePoint={departure.text}
        arrivalPoint={arrival.text}
      />
    </div>
  );
};
