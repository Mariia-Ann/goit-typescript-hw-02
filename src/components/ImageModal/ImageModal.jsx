import Modal from "react-modal";
import style from "./ImageModal.module.css";

const ImageModal = ({ isOpen, image, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Example Modal"
      className={style.content}
      overlayClassName={style.overlay}
    >
      <div>
        <img
          className={style.img}
          src={image.urls.regular}
          alt={image.alt_description}
        />
        <div className={style.info}>
          <p>
            <span className={style.details}>Author:</span> {image.user.name}
          </p>
          <p>
            <span className={style.details}>Likes:</span> {image.likes}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
