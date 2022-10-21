import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BreakingBad from "./pages/BreakingBad";
import BetterCallSaul from "./pages/BetterCallSaul";
import SharedLayout from "./pages/SharedLayout";
import Error from "./pages/Error";
import SingleBreakingBadCard from "./pages/SingleBreakingBadCard";
import SingleBetterCallSaulCard from "./pages/SingleBetterCallSaulCard";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<BreakingBad />} />
          <Route path=":breakingBadId" element={<SingleBreakingBadCard />} />
          <Route path="/better-call-saul" element={<BetterCallSaul />} />
          <Route
            path="/better-call-saul/:betterCallId"
            element={<SingleBetterCallSaulCard />}
          />
          <Route path="*" element={<Error />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
