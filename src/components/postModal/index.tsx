import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import ModalContainer from "../../uiComponents/photoModal";
import PhotoModalContent from "../../uiComponents/photoModalContent";

import { fetchPostThunk } from "../../redux/postsSlice/slice";
import {
  selectPostById,
  selectPostByIdLoading,
} from "../../redux/postsSlice/selector";
import type { AppDispatch } from "../../redux/store";

import "./PostModal.css";
import NotFoundPage from "../../pages/page404";

const PhotoModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const navigate = useNavigate();

  const post = useSelector(selectPostById);
  const loading = useSelector(selectPostByIdLoading);

  useEffect(() => {
    dispatch(fetchPostThunk(Number(id)));
  }, [id, dispatch]);

  return !post ? (
    <NotFoundPage />
  ) : (
    <ModalContainer onClose={() => navigate(-1)}>
      {loading || !post ? (
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
