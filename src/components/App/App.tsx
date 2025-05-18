import style from "./App.module.css";

import { fetchImagesWithTopic } from "../../images-api";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import ImageGallery from "../ImageGallery/ImageGallery";
import SearchBar from "../SearchBar/SearchBar";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";
import { FetchImagesResponse, Image } from "../../types";

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [topic, setTopic] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<Image | null>(null);

  const galleryRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (newTopic: string): Promise<void> => {
    setTopic(newTopic);
    setPage(1);
    setImages([]);
    setError(false);
    setLoading(true);
    try {
      const data: FetchImagesResponse = await fetchImagesWithTopic(newTopic, 1);
      setImages(data.images);
      setLoadMore(data.loadMore);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreImages = async (): Promise<void> => {
    if (!loadMore) return;

    setLoading(true);
    try {
      const nextPage = page + 1;
      const data: FetchImagesResponse = await fetchImagesWithTopic(
        topic,
        nextPage
      );
      setImages((prevImages) => [...prevImages, ...data.images]);
      setLoadMore(data.loadMore);
      setPage(nextPage);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (image: Image): void => {
    setModalImage(image);
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setModalImage(null);
  };

  const handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    if (page <= 1) return;

    const liEl = galleryRef.current?.firstElementChild as HTMLElement | null;
    if (!liEl) return;
    const { height } = liEl.getBoundingClientRect();

    window.scrollBy({
      top: height * 2,
      behavior: "smooth",
    });
  }, [images]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={style.section}>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-right" />
      {error && <ErrorMessage />}
      {images.length > 0 && (
        <div ref={galleryRef}>
          <ImageGallery items={images} openModal={openModal} />
        </div>
      )}
      {loadMore && !loading && <LoadMoreBtn onClick={loadMoreImages} />}
      {loading && <Loader />}
      {modalOpen && (
        <ImageModal
          isOpen={modalOpen}
          onClose={closeModal}
          image={modalImage}
        />
      )}
    </div>
  );
};

export default App;
