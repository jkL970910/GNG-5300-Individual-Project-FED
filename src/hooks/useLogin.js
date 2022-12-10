 import { useLazyQuery, gql, useMutation } from '@apollo/client';
import useLocalStorageState from './useLocalStorage';

const GET_LOGIN_USER = gql`
  query Login($username: String!, $password: String!) {
    userLogin(username: $username, password: $password) {
      id
      username
      myPhotos
      likedList
    }
  }
`;

const CREATE_USER = gql`
  mutation Register($username: String!, $password: String!) {
    addNewUser(username: $username, password: $password) {
      username
    }
  }
`;

export const useLogin = (setLoginSuccess) => {
  const [, setName] = useLocalStorageState('current_user');
  const [getLoginUser] = useLazyQuery(GET_LOGIN_USER, {
    onCompleted: (data) => {
      const user = data['userLogin']
      if (user.username === 'UsernameOrPasswordNotMatched') {
        alert('Login Failed: Username Or Password Not Matched');
      } else {
        setName({'id': data.userLogin.id, 'likedList': data.userLogin.likedList, 'myPhotos': data.userLogin.myPhotos, 'username': data.userLogin.username})
        setLoginSuccess(true)
      }
    }
  });

  return {
    getLoginUser,
  };
};

export const useRegister = (setRegisterSuccess) => {
  const [getRegister] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      const user = data['addNewUser']
      if (user.username === 'UserAlreadyExisted') {
        alert('Register Failed: Username Already Existed');
      } else {
        setRegisterSuccess(true)
      }
    }
  });

  return {
    getRegister,
  };
};