import { NumberComponent } from "./Number";

interface NextTwoProps {
  nextTwo: (number | undefined)[];
}

const EmptyNumber = () => {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        fontWeight: "bolder",
        borderRadius: "50%",
        fontSize: 32,
        width: 24,
        height: 24,
        padding: 8,
        border: "1px solid black",
      }}
    ></div>
  );
};

const NextTwoComponent = (props: NextTwoProps) => {
  const { nextTwo } = props;

  const [first, second] = nextTwo;

  const style = {
    fontSize: 20,
  };

  return (
    <div>
      <h2>Próximos dois números a serem chamados:</h2> <br />
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {first ? <NumberComponent num={first} /> : <EmptyNumber />}
        <span style={style}>/</span>
        {second ? <NumberComponent num={second} /> : <EmptyNumber />}
      </div>
    </div>
  );
};

export { NextTwoComponent };
