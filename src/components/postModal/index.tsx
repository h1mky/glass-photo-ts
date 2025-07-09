import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import ModalContainer from "../../uiComponents/photoModal";
import PhotoModalContent from "../../uiComponents/photoModalContent";
import NotFoundPage from "../../pages/page404";
import { useFetchPostById } from "../../services/PostService/service";

import "./PostModal.css";

const PhotoModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: post, isPending, isError } = useFetchPostById(Number(id));

  if (isError) {
    return <NotFoundPage />;
  }

  return (
    <ModalContainer onClose={() => navigate(-1)}>
      {isPending || !post ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ClipLoader color="#f0f0f0f0" size={40} />
        </div>
      ) : (
        <PhotoModalContent post={post} />
      )}
    </ModalContainer>
  );
};

export default PhotoModal;
