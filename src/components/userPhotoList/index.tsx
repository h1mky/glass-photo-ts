import PhotoListItem from "../photoListItem";
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
    <div className="photo-list-user">
      {photos?.map((photo) => (
        <PhotoListItem
          key={photo.id}
          photo={{
            ...photo,
            id: photo.id,
            username: photo.username,
          }}
        />
      ))}
    </div>
  );
};

export default PhotosListUser;
