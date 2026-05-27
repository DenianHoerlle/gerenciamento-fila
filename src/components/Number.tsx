interface NumberComponent {
  num: number;
}

const colorPallete = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#F3FF33",
  "#D433FF",
  "#33FFF0",
  "#FF33A1",
  "#FFA833",
  "#8D33FF",
  "#33FF94",
];

const colorByNumber = (num: number) => {
  const index = num % colorPallete.length;

  return colorPallete[index];
};

const NumberComponent = (props: NumberComponent) => {
  const { num } = props;

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        fontWeight: "bolder",
        borderRadius: "50%",
        fontSize: 20,
        width: 24,
        height: 24,
        padding: 8,
        backgroundColor: colorByNumber(num),
        border: "1px solid black",
      }}
      className="fade-in"
    >
      {num}
    </div>
  );
};

export { NumberComponent };
