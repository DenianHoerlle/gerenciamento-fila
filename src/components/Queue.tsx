import { NumberComponent } from "./Number";

interface QueueComponentProps {
  queue: number[];
  queueName: string;
}

const QueueComponent = (props: QueueComponentProps) => {
  const { queue, queueName } = props;

  const renderQueueContent = () => {
    if (!queue.length) return <span>Fila vazia</span>;

    return (
      <div
        style={{
          display: "flex",
          gap: 8,
        }}
      >
        {queue.map((num) => (
          <NumberComponent num={num} />
        ))}
      </div>
    );
  };

  return (
    <div
      style={{
        minHeight: 100,
      }}
    >
      <h2>{queueName}</h2>
      {renderQueueContent()}
    </div>
  );
};

export { QueueComponent };
