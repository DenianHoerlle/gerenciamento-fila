import { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { SimulationController } from "./classes/SimulationController";
import { HotKonfig } from "./classes/konfigs/HotKonfig";
import { BoothComponent } from "./components/Booth";
import { Button } from "./components/Button";
import { NextTwoComponent } from "./components/NextTwo";
import { QueueComponent } from "./components/Queue";
import { StackComponent } from "./components/Stack";

const simulateSystem = () => {
  const SimulationControllerInstance = new SimulationController();

  SimulationControllerInstance.start(HotKonfig.build());

  while (!SimulationControllerInstance.isFinished)
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
      <QueueComponent
        queueName="Fila NORMAL"
        queue={currentSnapshot?.normalQueue}
      />
      <QueueComponent
        queueName="Fila PRIORITÁRIA"
        queue={currentSnapshot?.priorityQueue}
      />
      <BoothComponent
        booths={[
          { isOpen: false },
          { isOpen: true },
          { currentNumber: 10, isOpen: true },
        ]}
      />
      <StackComponent
        stack={currentSnapshot?.stack}
        stackName="Pilha ATENDIDOS"
      />
      <NextTwoComponent nextTwo={currentSnapshot?.nextTwo} />
      <h2>
        Número de abandonos: {JSON.stringify(currentSnapshot?.abandonCounter)}
      </h2>
      <Button onClick={handleRegress} isDisabled={!currentSnapshot.iteration}>
        Voltar
      </Button>
      <Button
        onClick={handleAdvance}
        isDisabled={currentSnapshot.iteration >= snapshots.length - 1}
      >
        Avançar
      </Button>
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<MainComponent />);
