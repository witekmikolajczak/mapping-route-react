import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CalcPricing } from "../CalcPricing/CalcPricing";

// Map components
import RoutingControl from "../RoutingControl/RoutingControl";
import { MapContainer, TileLayer } from "react-leaflet";

//styles
import "./MapWrapper.scss";

export const MapWrapper = ({ departure, arrival }) => {
  const [distance, setDistance] = useState();
  const departureLatLng = departure.latlng;
  const arrivalLatLng = arrival.latlng;

  return (
    <div className="container-fluid mr-0">
      <div className="row">
        <div className="col-3">
          <div className="row">
            <div className="col">
              <Link to="/">
                <span>powrót</span>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <CalcPricing
                departure={departure}
                arrival={arrival}
                distance={distance}
              />
            </div>
          </div>
        </div>
        <div className="col-9">
          <div className="row mr-0">
            <div className="col ">
              <MapContainer zoom={10} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <RoutingControl
                  departure={departureLatLng}
                  arrival={arrivalLatLng}
                  totalDistance={setDistance}
                />
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
