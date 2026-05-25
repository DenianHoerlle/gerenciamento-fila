import { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { SimulationController } from "./classes/SimulationController";

const simulateSystem = () => {
  const SimulationControllerInstance = new SimulationController();

  SimulationControllerInstance.start();

  SimulationControllerInstance.iterate();
  SimulationControllerInstance.iterate();
  SimulationControllerInstance.iterate();

  const snapshots = SimulationControllerInstance.stop();

  return snapshots;
};

const MainComponent = () => {
  const [currentSnapshotIndex, setCurrentSnapshotIndex] = useState(0);
  const snapshots = useMemo(() => simulateSystem(), []);

  const currentSnapshot = snapshots[currentSnapshotIndex];

  const handleRegress = () => {
    if (currentSnapshotIndex) setCurrentSnapshotIndex(currentSnapshotIndex - 1);
  };

  const handleAdvance = () => {
    if (currentSnapshotIndex < snapshots.length - 1)
      setCurrentSnapshotIndex(currentSnapshotIndex + 1);
  };

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
          <span key={Math.random()}>{JSON.stringify(booth)}</span>
        ))}
      </h2>
      <h2>stack: {JSON.stringify(currentSnapshot?.stack)}</h2>
      <h2>nextTwo: {JSON.stringify(currentSnapshot?.nextTwo)}</h2>
      <h2>abandonCounter: {JSON.stringify(currentSnapshot?.abandonCounter)}</h2>
      <button onClick={handleRegress}>Prev</button>
      <button onClick={handleAdvance}>Next</button>
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<MainComponent />);
