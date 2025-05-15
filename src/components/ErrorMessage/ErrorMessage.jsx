import style from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  return (
    <p className={style.error}>
      Oops. Something went wrong. Please try again later.
    </p>
  );
};

export default ErrorMessage;
