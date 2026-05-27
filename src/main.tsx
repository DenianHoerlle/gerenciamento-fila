import { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { SimulationController } from "./classes/SimulationController";
import { HotKonfig } from "./classes/konfigs/HotKonfig";
import { BoothComponent } from "./components/Booth";
import { Button } from "./components/Button";
import { NextTwoComponent } from "./components/NextTwo";
import { QueueComponent } from "./components/Queue";
import { StackComponent } from "./components/Stack";
import "./index.css";

const simulateSystem = () => {
  const SimulationControllerInstance = new SimulationController();

  SimulationControllerInstance.start(HotKonfig.build());

  while (!SimulationControllerInstance.isFinished)
    SimulationControllerInstance.iterate();

  const snapshots = SimulationControllerInstance.stop();

  return snapshots;
};

const Cell = (props: any): React.ReactNode => {
  const { customStyle, children } = props;

  const style: React.CSSProperties = {
    backgroundColor: "lightskyblue",
    border: "1px solid black",
    borderRadius: 12,
    padding: 8,
    ...customStyle,
  };

  return <div style={style}>{children}</div>;
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

  const renderContainer = () => {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          gap: 8,
          padding: 8,
          height: 500,
        }}
      >
        <Cell
          customStyle={{
            gridColumn: "span 2 / span 2",
            gridColumnStart: 1,
            gridRowStart: 1,
          }}
        >
          <QueueComponent
            queueName="Fila NORMAL"
            queue={currentSnapshot?.normalQueue}
          />
        </Cell>
        <Cell
          customStyle={{
            gridColumn: "span 2 / span 2",
          }}
        >
          <QueueComponent
            queueName="Fila PRIORITÁRIA"
            queue={currentSnapshot?.priorityQueue}
          />
        </Cell>
        <Cell
          customStyle={{
            gridColumn: "span 2 / span 2",
            gridColumnStart: 1,
            gridRowStart: 3,
          }}
        >
          <BoothComponent
            booths={[
              { isOpen: false },
              { isOpen: true },
              { currentNumber: 10, isOpen: true },
            ]}
          />
        </Cell>
        <Cell
          customStyle={{
            gridColumn: "span 3 / span 3",
            gridColumnStart: 3,
            gridRowStart: 1,
            gridRowEnd: 4,
          }}
        >
          <StackComponent
            stack={currentSnapshot?.normalQueue}
            // TODO voltar cabines
            // stack={currentSnapshot?.stack}
            stackName="Pilha ATENDIDOS"
          />
        </Cell>
      </div>
    );
  };

  // LAYOUT
  return (
    <div>
      <h1>Gerenciamento de filas</h1>
      <NextTwoComponent nextTwo={currentSnapshot?.nextTwo} />
      {renderContainer()}
      <h2>
        Número de abandonos: {JSON.stringify(currentSnapshot?.abandonCounter)}
      </h2>
      <div
        style={{
          width: "100%",
          position: "absolute",
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<MainComponent />);
