import axios from 'axios'
export async function getPicture(userId,token) {
  debugger;
  var config = {
    method: 'get',
    url: `http://localhost:9000/user/getPicture/${userId}`,
     headers: { 
      //'Content-Type': 'application/json',
      'Authorization': token
    }
  };

  const res =await axios(config)
    .then(function (response) {
      console.log(response.data.picture.media_type)
      const picture={url: response.data.picture.url,
        media_type:response.data.picture.media_type}
     
      return picture
    })
    .catch(function (error) {
      console.log('error from service'+error)
      return error
    });
  return res;

}


export async function loginServer(userName, password) {

  var config = {
    method: 'get',
    url: `http://localhost:9000/user/login?name=${userName}&password=${password}`,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const res = axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      return response
    })
    .catch(function (error) {
      console.log(error);
      return error
    });
return res;
}

export async function signUpserver(userName, password,email) {
  debugger;
var data = JSON.stringify({
  "name": userName,
  "password": password,
  "email": email
});

var config = {
  method: 'post',
  url: 'http://localhost:9000/user/signUp',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

const res=axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  return response
})
.catch(function (error) {
  console.log(error);
  return error
});
return res;
}
export async function getAllPicturesController(userId,token) {

  var axios = require('axios');

  var config = {
    method: 'get',
    url: `http://localhost:9000/user/getAllPictures/${userId}`,
 

  headers: { 
    'Authorization': token
  },
  };

 const res=await axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
      console.log('from ser '+response);
      return response
    })
    .catch(function (error) {
      console.log('from ser '+error);    
        return error;
    });
  return res;
}



export async function deletPictureController(pictureId) {
  debugger;
  var config = {
    method: 'delete',
    url: ` http://localhost:9000/picture/deletPicture/${pictureId}`,

   
    headers: { }
  };
  
 const res=await axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    return response;
  })
  .catch(function (error) {
    console.log(error);
    return error
  });
  return res;
}


export async function savePictureController(user_id) {
  debugger;
var config = {
  method: 'post',
  url: `http://localhost:9000/user/savePicture/${user_id}`,
  headers: { }
};

const res=await axios(config)
.then(function (response) {
  console.log("userC\n"+JSON.stringify(response.data));
  return response
})
.catch(function (error) {
  console.log("error save\n"+error);
  return error
});
return res;
}

export function saveMyPicture(user_id,img){
debugger;
console.log(img);
  var data = JSON.stringify({
    "date": img.date,
    "url": img.url,
    "explanation": img.explanation,
    "title":img.title
  });
  
  var config = {
    method: 'post',
    url: `http://localhost:9000/picture/saveMyPicture/${user_id}`,
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  const res=axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    return response
  })
  .catch(function (error) {
    console.log(error);
    return error
  });
  
return res








}

export async function forgotPasswordServer(name,email){
  debugger;
// var data = JSON.stringify({
//   "name": name,
//   "email":email
// });

// var config = {
//   method: 'get',
//   url: 'http://localhost:9000/user/forgotPassword',
//   headers: { 
//     'Content-Type': 'application/json'
//   },
//   data : data
// };

// const res=axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
//   return response
// })
// .catch(function (error) {
//   console.log(error);
//   return error
// });
//   return res;  
// }









var data = JSON.stringify({
  "name": name,
  "email": email
});

var config = {
  method: 'get',
  url: 'http://localhost:9000/user/forgotPassword',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

const res=await axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  return response
})
.catch(function (error) {
  console.log(error);
  return error
});
return res;
}