import { useMutation, gql } from '@apollo/client';

const LIKE_PHOTO = gql`
  mutation LikePhoto($username: String!, $photoID: String!) {
    likePhoto(username: $username, photoID: $photoID) {
        username
        myPhotos
        likedList
    }
  }
`;

const UNLIKE_PHOTO = gql`
  mutation UnlikePhoto($username: String!, $photoID: String!) {
    unLikePhoto(username: $username, photoID: $photoID) {
        username
        myPhotos
        likedList
    }
  }
`;

export const useUserLikedPhoto = (setUploadSuccess) => {
    const [likedPhoto, {loading: likedLoading}] = useMutation(LIKE_PHOTO, {
        onCompleted: (data) => {
            const photo = data['uploadPhoto']
            if (photo.title.includes('Error')) {
            alert(`Upload Failed: ${photo.title}`);
            } else {
            setUploadSuccess(true)
            }
        }
    });

    return {
        likedPhoto,
        likedLoading,
    };
};

export const useUserUnlikedPhoto = (setUploadSuccess) => {
    const [unlikedPhoto, {loading: unlikedloading}] = useMutation(UNLIKE_PHOTO, {
        onCompleted: (data) => {
            const photo = data['uploadPhoto']
            if (photo.title.includes('Error')) {
                alert(`Upload Failed: ${photo.title}`);
            } else {
                setUploadSuccess(true)
            }
        }
    });
  
    return {
        unlikedPhoto,
        unlikedloading,
    };
  };