import { useMutation, gql } from '@apollo/client';

const UPDATE_PHOTO = gql`
  mutation UpdatePhoto($photoID: String!, $photoTitle: String!, $description: String!, $imgUrl: String!, $imgLocal: String!) {
    updatePhoto(photoId: $photoID, photoTitle: $photoTitle, description: $description, imgUrl: $imgUrl, imgLocal: $imgLocal) {
      id
      title
      description
      uploadUser
      imgUrl
      imgLocal
    }
  }
`;

export const usePhotoUpdate = (setUpdateOrDeleteSuccess) => {
  const [setUpdatePhoto, {loading}] = useMutation(UPDATE_PHOTO, {
    onCompleted: (data) => {
      const photo = data['updatePhoto']
      if (photo.title === 'Update Photo Error') {
        alert(`Upload Failed: ${photo.description}`);
      } else {
        setUpdateOrDeleteSuccess(true)
      }
    }
  });

  return {
    setUpdatePhoto,
    loading,
  };
};

const DELETE_PHOTO = gql`
  mutation DeletePhoto($photoID: String!) {
    deletePhoto(photoId: $photoID) {
      id
      title
      description
      uploadUser
      imgUrl
      imgLocal
    }
  }
`;

export const usePhotoDelete = (setDeleteSuccess) => {
  const [setDeletePhoto, {loading}] = useMutation(DELETE_PHOTO, {
    onCompleted: (data) => {
      const photo = data['deletePhoto']
      if (photo.title === 'Delete Photo Error') {
        alert(`Upload Failed: ${photo.description}`);
      } else {
        setDeleteSuccess(true)
      }
    }
  });

  return {
    setDeletePhoto,
    loading,
  };
};