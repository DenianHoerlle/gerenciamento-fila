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
    backgroundColor: isDisabled ? "#999999" : "#326091",
    color: "white",
    fontWeight: 600,
    fontSize: 16,
    border: "none",
    cursor: isDisabled ? "not-allowed" : "pointer",
    transition: "all 0.3s ease",
  };

  return (
    <button 
      onClick={onClick}
      style={style}
      className="button-animate"
      disabled={isDisabled}
      >
      {children}
    </button>
  );
};

export { Button };
