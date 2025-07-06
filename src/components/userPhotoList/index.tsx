import PhotoListItem from "../../uiComponents/photoListItem";
import "./userPhotoList.css";

import { useSelector, useDispatch } from "react-redux";
import { fetchUserPostsThunk } from "../../redux/postsSlice/slice";
import {
  selectUserPosts,
  // selectUserPostsError,
  // selectUserPostsLoading,
} from "../../redux/postsSlice/selector";

import { useParams } from "react-router-dom";

import type { AppDispatch } from "../../redux/store";
import { useEffect } from "react";

const PhotosListUser = () => {
  const { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const photos = useSelector(selectUserPosts);
  // const loading = useSelector(selectUserPostsLoading);
  // const error = useSelector(selectUserPostsError);

  useEffect(() => {
    dispatch(fetchUserPostsThunk(Number(id)));
    // eslint-disable-next-line
  }, [id]);

  return (
    <div className="user-photos-page">
      <div className="photo-list-user user-style-scope">
        {photos?.map((photo) => (
          <PhotoListItem key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
};

export default PhotosListUser;
