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
    <div
      style={{
        display: "flex",
        gap: 8,
        borderBottom: "1px solid black",
        paddingBottom: 12,
      }}
    >
      <h2>Próximos números a serem chamados:</h2> <br />
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          borderRadius: 12,
          backgroundColor: "lightgoldenrodyellow",
          border: "1px solid black",
          padding: 8,
        }}
      >
        {first ? <NumberComponent num={first} key={first} /> : <EmptyNumber />}
        <span style={style}>/</span>
        {second ? (
          <NumberComponent num={second} key={second} />
        ) : (
          <EmptyNumber />
        )}
      </div>
    </div>
  );
};

export { NextTwoComponent };
