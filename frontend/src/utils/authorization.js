// export const BASE_URL = 'https://auth.nomoreparties.co';

// export const register = ( data ) => {
//   return fetch(`${BASE_URL}/signup`, {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   })
//   .then((response) => {
//     try {
//       if (response.status === 200){
//         return response.json();
//       }
//     } catch(e){
//       return (e)
//     }
//   })
//   .then((res) => {
//     return res;
//   })
//   .catch((err) => console.log(err));
// };



// export const authorization = (data) => {
//     return fetch(`${BASE_URL}/signin`, {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     })
//     .then((response) => {
//       try {
//         if (response.status === 200){
//           return response.json();
//         }
//       } catch(e){
//         return (e)
//       }
//     })
//     .then((res) => {
//       return res;
//     })
//     .catch((err) => console.log(err));
//   };

//   export const checkTokenValidation = (token) => {
//     return fetch(`${BASE_URL}/users/me`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       }
//     })
//     .then((response) => {
//       try {
//         if (response.status === 200){
//           return response.json();
//         }
//       } catch(e){
//         return (e)
//       }
//     })
//     .then((res) => {
//       return res;
//     })
//     .catch((err) => console.log(err));
//   };




export const BASE_URL = 'http://renat-frontend.tk';

const getServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Не удалось получить ответ от сервера. Ошибка ${res.status}`);
}

export const register = ( data ) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((res) => getServerResponse(res))
};



export const authorization = (data) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((res) => getServerResponse(res))

  };

  export const checkTokenValidation = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then((res) => getServerResponse(res))
  };