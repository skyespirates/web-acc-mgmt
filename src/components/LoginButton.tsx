import { Button } from "react-bootstrap";

type LoginButtonProps = {
  icon?: string;
  color?: string;
  text?: string;
  handleClick: () => void;
};

const LoginButton = ({
  icon = "cloud-rain",
  color = "primary",
  text = "login",
  handleClick,
}: LoginButtonProps) => {
  return (
    <Button
      onClick={handleClick}
      variant={color}
      className="d-flex align-items-center gap-3 w-100 justify-content-center"
    >
      <i className={`bi bi-${icon}`}></i>
      {text}
    </Button>
  );
};

export default LoginButton;
