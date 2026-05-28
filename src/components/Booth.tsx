import type { BoothType } from "../classes/Booth";
import { NumberComponent } from "./Number";

interface BoothComponentProps {
  booths: BoothType<number>[];
}

const Booth = (props: { booth: BoothType<number> }) => {
  const { currentNumber, duration } = props.booth;

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

  return (
    <div
      key={currentNumber}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={boothBaseStyles}>
        {currentNumber && <NumberComponent num={currentNumber} />}
      </div>
      {duration ? <span>{duration}</span> : null}
    </div>
  );
};

const BoothComponent = (props: BoothComponentProps) => {
  const { booths } = props;

  return (
    <div>
      <h2>Cabines</h2>
      <div style={{ display: "flex", gap: 8 }}>
        {booths.map((booth, index) => (
          <Booth booth={booth} key={index} />
        ))}
      </div>
    </div>
  );
};

export { BoothComponent };
