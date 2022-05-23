import React, { useState } from "react";

// styles
import "./LocationList.scss";
export const LocationList = ({ locations, ...props }) => {
  const [location, setLocation] = useState("");

  const handleLocationClick = (location) => {
    props.locationDetails(location);
  };
  return (
    <ul className="col-12">
      {locations != undefined
        ? locations.map((location) => (
            <li
              key={Math.random()}
              onClick={() => handleLocationClick(location)}
            >
              {location.text}
            </li>
          ))
        : ""}
    </ul>
  );
};
