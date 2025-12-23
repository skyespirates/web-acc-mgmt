import LoginButton from "./LoginButton";

const LoginMethod = () => {
  function loginGoogle() {
    window.location.href = "http://localhost:3000/auth/google";
  }

  function loginGithub() {
    window.location.href = "http://localhost:3000/auth/github";
  }
  return (
    <div className="d-flex flex-column gap-1">
      <LoginButton
        icon="google"
        color="outline-secondary"
        text="Continue with Google"
        handleClick={loginGoogle}
      />
      <LoginButton
        icon="github"
        color="outline-dark"
        text="Continue with Github"
        handleClick={loginGithub}
      />
    </div>
  );
};

export default LoginMethod;
