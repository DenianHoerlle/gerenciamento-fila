import { NumberComponent } from "./Number";

type Booth = {
  currentNumber?: number;
  duration?: number;
  isOpen: boolean;
};

interface BoothComponentProps {
  booths: Booth[];
}

const BoothComponent = (props: BoothComponentProps) => {
  const { booths } = props;

  const boothBaseStyles = {
    borderRadius: 8,
    border: "1px solid black",
    backgroundColor: "#d5e3f7",
    display: "grid",
    placeItems: "center",
    width: 48,
    height: 48,
    fontSize: 30,
  };

  const renderBooth = (booth: Booth) => {
    const { isOpen, currentNumber } = booth;

    if (!isOpen) {
      const style = {
        ...boothBaseStyles,
        fontSize: 30,
      };

      return <div style={style}>❌</div>;
    }

    return (
      <div style={boothBaseStyles}>
        {currentNumber && <NumberComponent num={currentNumber} />}
      </div>
    );
  };

  return (
    <div>
      <h2>Cabines</h2>
      <div style={{ display: "flex", gap: 8 }}>{booths.map(renderBooth)}</div>
    </div>
  );
};

export { BoothComponent };
