interface ButtonInterface {
  children: React.ReactNode;
  onClick: () => void;
  isDisabled: boolean;
}

const Button = (props: ButtonInterface) => {
  const { children, onClick, isDisabled } = props;

  const style = {
    width: 254,
    height: 48,
    margin: 18,
    borderRadius: 8,
    backgroundColor: isDisabled ? "#999999" : "#a1d19f",
    cursor: "pointer",
  };

  return (
    <button onClick={onClick} style={style}>
      {children}
    </button>
  );
};

export { Button };
