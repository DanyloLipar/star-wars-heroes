import { useState, useEffect } from "react";

const IntroModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const watchedIntro = sessionStorage.getItem("intro");
    if (!watchedIntro) {
      setShowModal(true);
    }
  }, []);

  const handleCloseModal = () => {
    sessionStorage.setItem("intro", "true");
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-content__title">Episode IV</h2>
        <p className="modal-content__text">
          A long time ago in a galaxy far, far away... Episode IV: A New Hope.
          It is a period of civil war. Rebel spaceships, striking from a hidden
          base, have won their first victory against the evil Galactic Empire.
        </p>
        <button onClick={handleCloseModal} className="modal-content__close">
          OK
        </button>
      </div>
    </div>
  );
};

export default IntroModal;
