import { Image } from "../../types";
import ImageCard from "../ImageCard/ImageCard";
import style from "./ImageGallery.module.css";

interface ImageGalleryProps {
  items: Image[],
  openModal: (image: Image) => void
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ items, openModal }) => {
  return (
    <ul className={style.list}>
      {items.map((image) => (
        <li key={image.id}>
          <ImageCard image={image} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
