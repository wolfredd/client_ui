import jwt_decode from 'jwt-decode';

export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export const saveAuthTokenToLocalStorage = (token) => {
  localStorage.setItem("auth", token);
}

export const retrieveTokenFromLocalStorage = () => {
  return localStorage.getItem("auth");
}

export const deleteTokenFromLocalStorage = () => {
  localStorage.removeItem("auth");
}

export const decodeJWT = (token) => {
  try {
    const decodedToken = jwt_decode(token);
    return decodedToken;
  } catch (error) {
    // Handle any error that occurs during decoding
    console.log('Error decoding JWT:', error);
    return null;
  }
};