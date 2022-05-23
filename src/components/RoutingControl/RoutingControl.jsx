import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const createRoutineMachineLayer = ({ departure, arrival, ...props }) => {
  console.log(departure.lat, arrival);
  const instance = L.Routing.control({
    position: "topleft",
    show: false,
    waypoints: [
      L.latLng(departure.lat, departure.lng),
      L.latLng(arrival.lat, arrival.lng),
    ],
    lineOptions: {
      styles: [
        {
          color: "#757de8",
        },
      ],
    },
  });
  instance.on("routesfound", function (e) {
    const routes = e.routes;
    const summary = routes[0].summary;
    props.totalDistance(Math.round(summary.totalDistance / 1000, 2));
  });
  return instance;
};

// Pass our createRoutingMachineLayer to the createControlHook:
const RoutingMachine = createControlComponent(createRoutineMachineLayer);

// Export
export default RoutingMachine;
