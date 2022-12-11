import { useMutation, gql } from '@apollo/client';

const UPLOAD_PHOTO = gql`
  mutation UploadPhoto($username: String!, $photoTitle: String!, $description: String!, $imgUrl: String!, $imgLocal: String!) {
    uploadPhoto(username: $username, photoTitle: $photoTitle, description: $description, imgUrl: $imgUrl, imgLocal: $imgLocal) {
        id
        title
        description
        uploadUser
        imgUrl
        imgLocal
    }
  }
`;

export const usePhotoUpload = (setUploadSuccess) => {
  const [setUploadPhoto, {loading}] = useMutation(UPLOAD_PHOTO, {
    onCompleted: (data) => {
        const photo = data['uploadPhoto']
        if (photo.title === 'Create Photo Error') {
          alert(`Upload Failed: ${photo.description}`);
        } else {
          setUploadSuccess(true)
        }
    }
  });

  return {
    setUploadPhoto,
    loading,
  };
};