import { useState } from "react";
import CreatePostForm from "../../components/createPostForm";
import ModalContainer from "../modalContainer";
import "./createButton.css";

const CreateButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="create-button_wrapper">
        <button className="Btn" onClick={() => setIsModalOpen(true)}>
          <div className="sign">+</div>
          <div className="text">Create</div>
        </button>
      </div>

      {isModalOpen && (
        <ModalContainer onClose={() => setIsModalOpen(false)}>
          <CreatePostForm />
        </ModalContainer>
      )}
    </>
  );
};

export default CreateButton;
