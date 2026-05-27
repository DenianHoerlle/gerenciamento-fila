import { startTransition, useEffect, useState, ViewTransition } from "react";
import { NumberComponent } from "./Number";

interface QueueComponentProps {
  queue: number[];
  queueName: string;
}

const QueueComponent = (props: QueueComponentProps) => {
  const { queue, queueName } = props;

  const [localQueue, setLocalQueue] = useState<number[]>([]);

  useEffect(() => {
    startTransition(() => {
      setLocalQueue(queue);
    });
  }, [queue]);

  const renderQueueContent = () => {
    return (
      <div
        style={{
          display: "flex",
          gap: 8,
          overflow: "auto",
        }}
        className="hide-scroll"
      >
        {!localQueue.length ? (
          <span>Fila vazia</span>
        ) : (
          localQueue.map((num) => <NumberComponent num={num} key={num} />)
        )}
      </div>
    );
  };

  return (
    <ViewTransition>
      <div
        style={{
          minHeight: 100,
        }}
      >
        <h2>{queueName}</h2>
        {renderQueueContent()}
      </div>
    </ViewTransition>
  );
};

export { QueueComponent };
