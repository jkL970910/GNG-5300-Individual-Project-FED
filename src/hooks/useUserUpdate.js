import { useMutation, gql } from '@apollo/client';

const LIKE_PHOTO = gql`
  mutation LikePhoto($username: String!, $photoID: String!) {
    likePhoto(username: $username, photoID: $photoID) {
        id
        username
        myPhotos
        likedList
    }
  }
`;

const UNLIKE_PHOTO = gql`
  mutation UnlikePhoto($username: String!, $photoID: String!) {
    unLikePhoto(username: $username, photoID: $photoID) {
        id
        username
        myPhotos
        likedList
    }
  }
`;

export const useUserLikedPhoto = (onUploadSuccess) => {
    const [likedPhoto, {loading: likedLoading}] = useMutation(LIKE_PHOTO, {
        onCompleted: (data) => {
            const user = data['likePhoto']
            if (user.username.includes('Error')) {
                alert(`Upload Failed: ${user.username}`);
            } else {
                onUploadSuccess(true, user)
            }
        }
    });

    return {
        likedPhoto,
        likedLoading,
    };
};

export const useUserUnlikedPhoto = (onUploadSuccess) => {
    const [unlikedPhoto, {loading: unlikedloading}] = useMutation(UNLIKE_PHOTO, {
        onCompleted: (data) => {
            const user = data['unLikePhoto']
            if (user.username.includes('Error')) {
                alert(`Upload Failed: ${user.username}`);
            } else {
                onUploadSuccess(true, user)
            }
        }
    });
  
    return {
        unlikedPhoto,
        unlikedloading,
    };
  };