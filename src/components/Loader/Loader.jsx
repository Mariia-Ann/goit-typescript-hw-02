import PulseLoader from "react-spinners/PulseLoader";
import style from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={style.override}>
      <PulseLoader
        color="#B693C0"
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
