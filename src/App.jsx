import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Searcher } from "./components/Searcher/Searcher";
import { MapWrapper } from "./components/MapWrapper/MapWrapper";

//styles
import "./App.scss";

function App() {
  const [handleFrom, setHandleFrom] = useState();
  const [handleTo, setHandleTo] = useState();
  const [handleLoading, setHandleLoading] = useState(false);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Searcher
              departure={setHandleFrom}
              arrival={setHandleTo}
              isLoading={setHandleLoading}
            />
          }
        />
        {handleLoading && (
          <Route
            path="/map"
            element={<MapWrapper departure={handleFrom} arrival={handleTo} />}
          />
        )}
        <Route
          exact
          path="*"
          element={
            <Searcher
              departure={setHandleFrom}
              arrival={setHandleTo}
              isLoading={setHandleLoading}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
