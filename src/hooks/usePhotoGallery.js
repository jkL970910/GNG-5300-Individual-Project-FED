import { useQuery, gql } from '@apollo/client';

const GET_PHOTO_GALLERY = gql`
  query GetPhotoGallery {
    getAllPhotos {
      id
      title
      description
      uploadUser
      imgUrl
      imgLocal
    }
  }
`;

export const usePhotoGallery = () => {
  const {data: photos, loading, error, refetch} = useQuery(GET_PHOTO_GALLERY);

  return {
    photos,
    loading,
    error,
    refetch
  };
};