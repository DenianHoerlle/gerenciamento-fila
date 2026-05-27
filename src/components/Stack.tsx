import { NumberComponent } from "./Number";

interface StackComponentProps {
  stack: number[];
  stackName: string;
}

const StackComponent = (props: StackComponentProps) => {
  const { stack, stackName } = props;

  const renderstackContent = () => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: 8,
          overflow: "auto",
        }}
        className="hide-scroll"
      >
        {!stack.length ? (
          <span
            style={{
              margin: "0 auto",
            }}
          >
            Pilha vazia
          </span>
        ) : (
          stack.map((num) => <NumberComponent num={num} key={num} />)
        )}
      </div>
    );
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", height: "stretch" }}
    >
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {stackName}
      </h2>
      {renderstackContent()}
    </div>
  );
};

export { StackComponent };
