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
  const {data, loading, error, refetch} = useQuery(GET_PHOTO_GALLERY);

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

export const useLikedPhotoList = (name) => {
  const {data, loading, error, refetch} = useQuery(GET_LIKED_LIST, {
    variables: {
      username: name
    }
  });

  return {
    data,
    loading,
    error,
    refetch
  };
};

const GET_USER_LIST = gql`
  query GetUserPhotoList($username: String!) {
    getUserPhotoList(username: $username) {
      id
      title
      description
      uploadUser
      imgUrl
      imgLocal
    }
  }
`;

export const useUserPhotoList = (name) => {
  const {data, loading, error, refetch} = useQuery(GET_USER_LIST, {
    variables: {
      username: name
    }
  });

  return {
    data,
    loading,
    error,
    refetch
  };
}