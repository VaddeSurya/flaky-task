/* 

1. First bring the data from the data.js using require or 
 using the import user from './data.js'

 2. Next i will install the axios that used to send 
 requests to the backend

 3. since we are using the port number 7676 
 so we can use this https://localhost:7676 
 for sending the post requests to backend

  4. we can use axios.post to post the data and 
  
  5. I will run the loop on the data
     and send that to the user
  
  6. If i got the response as 500 means 
    the server side error they we can resend that
    user post request until i get the user saved Successfully

  7. I will retry the request if and only if i 
  got the 500 and if i got the error

 */


  const { default: axios, isAxiosError } = require('axios');
  // const data=require('./user-data/src/data');
  import data from './user'
  const api="http://localhost:7676/"

  let remaining=[];
  function postingData(eachUser){
    axios.post(api,eachUser).then(res =>{
      const id=eachUser.user_id;
      console.log(id);
      remaining.push(id);
      // console.log(eachUser.user_id);
    })
    .catch(error => {
      // if(error.response.status){
      //   return postingData(eachUser);
      // }
      console.log(error.response.status)
    })
  }
console.log(remaining)

  data.USERS.forEach(element => {
    postingData(element)
  });

