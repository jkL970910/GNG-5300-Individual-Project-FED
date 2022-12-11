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
  const {data, loading, error, refetch} = useQuery(GET_PHOTO_GALLERY, {
    fetchPolicy: 'cache-and-network'
  });

  return {
    data,
    loading,
    error,
    refetch
  };
};

const GET_LIKED_LIST = gql`
  query GetLikedPhotoList($username: String!) {
    getLikePhotoList(username: $username) {
      id
      title
      description
      uploadUser
      imgUrl
      imgLocal
    }
  }
`;

export const useLikedPhotoList = () => {
  const {data, loading, error, refetch} = useQuery(GET_LIKED_LIST, {
    fetchPolicy: 'cache-and-network'
  });

  return {
    data,
    loading,
    error,
    refetch
  };
};