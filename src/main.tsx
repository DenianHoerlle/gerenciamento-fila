import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SimulationController } from "./classes/SimulationController";

const MainComponent = () => {
  const SimulationControllerInstance = new SimulationController();

  SimulationControllerInstance.start();

  const currentSnapshot = SimulationControllerInstance.iterate();

  // LAYOUT
  return (
    <div>
      <h2>normalQueue: {JSON.stringify(currentSnapshot?.normalQueue)}</h2>
      <h2>priorityQueue: {JSON.stringify(currentSnapshot?.priorityQueue)}</h2>
      <h2
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        booths:{" "}
        {currentSnapshot?.booths.map((booth) => (
          <h3>{JSON.stringify(booth)}</h3>
        ))}
      </h2>
      <h2>stack: {JSON.stringify(currentSnapshot?.stack)}</h2>
      <h2>nextTwo: {JSON.stringify(currentSnapshot?.nextTwo)}</h2>
      <h2>abandonCounter: {JSON.stringify(currentSnapshot?.abandonCounter)}</h2>
    </div>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainComponent />
  </StrictMode>,
);
