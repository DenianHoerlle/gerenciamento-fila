import { NumberComponent } from "./Number";

interface StackComponentProps {
  stack: number[];
  stackName: string;
}

const StackComponent = (props: StackComponentProps) => {
  const { stack, stackName } = props;

  const renderstackContent = () => {
    if (!stack.length) return <span>Pilha vazia</span>;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {stack.map((num) => (
          <NumberComponent num={num} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2>{stackName}</h2>
      {renderstackContent()}
    </div>
  );
};

export { StackComponent };
