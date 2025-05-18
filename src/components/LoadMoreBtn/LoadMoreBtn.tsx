import style from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onClick: () => void
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <div className={style.btn}>
      <button className={style.loadBtn} type='button' onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
