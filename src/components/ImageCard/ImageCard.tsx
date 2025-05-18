import { Image } from "../../types";
import style from "./ImageCard.module.css";

interface ImageCardProps {
  image: Image,
  openModal: (image: Image) => void
}

const ImageCard: React.FC<ImageCardProps> = ({ image, openModal }) => {
  return (
    <div>
      <img
        className={style.img}
        src={image.urls.small}
        alt={image.alt_description ?? "Image"}
        onClick={() => openModal(image)}
      />
    </div>
  );
};

export default ImageCard;
