import { X } from "lucide-react";
import { useEffect } from "react";

import "./modalContainer.css";

type ModalContainerProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const ModalContainer = ({ children, onClose }: ModalContainerProps) => {
  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalContainer;
