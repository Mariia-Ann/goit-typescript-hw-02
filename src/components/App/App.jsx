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

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [topic, setTopic] = useState("");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const galleryRef = useRef(null);

  const handleSearch = async (newTopic) => {
    setTopic(newTopic);
    setPage(1);
    setImages([]);
    setError(false);
    setLoading(true);
    try {
      const data = await fetchImagesWithTopic(newTopic, 1);
      setImages(data.images);
      setLoadMore(data.loadMore);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreImages = async () => {
    if (!loadMore) return;

    setLoading(true);
    try {
      const nextPage = page + 1;
      const data = await fetchImagesWithTopic(topic, nextPage);
      setImages((prevImages) => [...prevImages, ...data.images]);
      setLoadMore(data.loadMore);
      setPage(nextPage);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (image) => {
    setModalImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImage(null);
  };

  useEffect(() => {
    if (page <= 1) return;

    const liEl = galleryRef.current?.firstElementChild;
    if (!liEl) return;
    const { height } = liEl.getBoundingClientRect();

    window.scrollBy({
      top: height * 2,
      behavior: "smooth",
    });
  }, [images]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

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
