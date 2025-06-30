import PhotoListItem from "../photoListItem";

const PhotosListUser = () => {
  const photos = [
    {
      post_id: 1,
      title: "Castle View",
      post_img:
        "https://images.unsplash.com/photo-1520637836862-4d197d17c13a?w=400&h=300&fit=crop",
      created_at: "2024-06-25T10:30:00Z",
      post_author: "Maral",
      post_author_id: 1,
      likes: 45,
      comments: 12,
    },
    {
      post_id: 2,
      title: "Forest Path",
      post_img:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      created_at: "2024-06-24T15:20:00Z",
      post_author: "Maral",
      post_author_id: 1,
      likes: 38,
      comments: 8,
    },
    {
      post_id: 3,
      title: "Mountain Landscape",
      post_img:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      created_at: "2024-06-23T09:15:00Z",
      post_author: "Maral",
      post_author_id: 1,
      likes: 67,
      comments: 15,
    },
    {
      post_id: 4,
      title: "Urban Architecture",
      post_img:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      created_at: "2024-06-22T14:45:00Z",
      post_author: "Maral",
      post_author_id: 1,
      likes: 29,
      comments: 6,
    },
    {
      post_id: 5,
      title: "Sunset Colors",
      post_img:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      created_at: "2024-06-21T18:30:00Z",
      post_author: "Maral",
      post_author_id: 1,
      likes: 82,
      comments: 20,
    },
    {
      post_id: 6,
      title: "Street Photography",
      post_img:
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop",
      created_at: "2024-06-20T12:00:00Z",
      post_author: "Maral",
      post_author_id: 1,
      likes: 34,
      comments: 9,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {photos.map((photo) => (
        <PhotoListItem
          key={photo.post_id}
          photo={{
            ...photo,
            id: photo.post_id,
            username: photo.post_author,
          }}
        />
      ))}
    </div>
  );
};

export default PhotosListUser;
