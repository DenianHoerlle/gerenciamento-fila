import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { SimulationController } from "./classes/SimulationController";
import { ColdKonfig } from "./classes/konfigs/ColdKonfig";
import { HotKonfig } from "./classes/konfigs/HotKonfig";
import type { Konfig } from "./classes/konfigs/Konfig";
import { BoothComponent } from "./components/Booth";
import { Button } from "./components/Button";
import { NextTwoComponent } from "./components/NextTwo";
import { QueueComponent } from "./components/Queue";
import { StackComponent } from "./components/Stack";
import "./index.css";

const simulateSystem = (konfig: Konfig) => {
  const SimulationControllerInstance = new SimulationController(konfig);

  SimulationControllerInstance.start();

  while (!SimulationControllerInstance.getIsFinished())
    SimulationControllerInstance.iterate();

  const snapshots = SimulationControllerInstance.stop();

  return snapshots;
};

const Cell = (props: any): React.ReactNode => {
  const { customStyle, children } = props;

  const style: React.CSSProperties = {
    backgroundColor: "#b3d6ff",
    border: "1px solid black",
    borderRadius: 12,
    padding: 8,
    ...customStyle,
  };

  return <div style={style}>{children}</div>;
};

const Konfigs = {
  hot: HotKonfig,
  cold: ColdKonfig,
};

const MainComponent = () => {
  const [currentSnapshotIndex, setCurrentSnapshotIndex] = useState(0);
  const [highDemand, setHighDemand] = useState(true);
  const [lowDemand, setLowDemand] = useState(false);
  const [currentKonfig, setCurrentKonfig] = useState(Konfigs.hot.build());
  const [snapshots, setSnapshots] = useState(simulateSystem(currentKonfig));

  const currentSnapshot = snapshots[currentSnapshotIndex];

  useEffect(() => {
    if (snapshots.length) console.log(snapshots);
  }, [snapshots]);

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
          <BoothComponent booths={currentSnapshot.booths} />
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
            stack={currentSnapshot?.stack}
            stackName="Pilha ATENDIDOS"
          />
        </Cell>
      </div>
    );
  };

  // LAYOUT
  return (
    <div className="container">
      <h1>Gerenciamento de Filas</h1>
      <div className="checkbox-container">
        <label
          className="checkbox-label"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            className="custom-checkbox"
            checked={highDemand}
            onChange={() => {
              setHighDemand(true);
              setCurrentKonfig(Konfigs.hot.build());
              setLowDemand(false);
            }}
          />
          <span style={{ fontWeight: 500, paddingLeft: "4px" }}>
            Alta demanda
          </span>
        </label>
        <label
          className="checkbox-label"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            className="custom-checkbox"
            checked={lowDemand}
            onChange={() => {
              setLowDemand(true);
              setCurrentKonfig(Konfigs.cold.build());
              setHighDemand(false);
            }}
          />
          <span style={{ fontWeight: 500, paddingLeft: "4px" }}>
            Baixa demanda
          </span>
        </label>
      </div>
      <div style={{ marginTop: 16, width: "66%", alignSelf: "flex-start" }}>
        <NextTwoComponent nextTwo={currentSnapshot?.nextTwo} />
      </div>
      <div style={{ width: "100%" }}>{renderContainer()}</div>
      <h2 style={{ textAlign: "center", marginTop: 16 }}>
        Iteração: {currentSnapshot?.iteration} | Número de abandonos:{" "}
        {currentSnapshot?.abandonCounter}
      </h2>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 8,
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
        <Button
          onClick={() => {
            setSnapshots(simulateSystem(currentKonfig));
            setCurrentSnapshotIndex(0);
          }}
        >
          Reiniciar
        </Button>
      </div>
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<MainComponent />);
