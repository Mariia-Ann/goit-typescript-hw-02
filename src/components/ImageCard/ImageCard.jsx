import style from "./ImageCard.module.css";
const ImageCard = ({ image, openModal }) => {
  return (
    <div>
      <img
        className={style.img}
        src={image.urls.small}
        alt={image.alt_description}
        onClick={() => openModal(image)}
      />
    </div>
  );
};

export default ImageCard;
