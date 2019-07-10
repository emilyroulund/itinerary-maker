const BASE_URL = "http://localhost:3000"
const ACTIVITIES_URL = `${BASE_URL}/activities`
const ITINERARIES_URL = `${BASE_URL}/itineraries`
const USERS_URL = `${BASE_URL}/users`
const USER_URL = `${BASE_URL}/users/login`
const COMMENTS_URL = `${BASE_URL}/comments`

let currentUser;
function handleLogin(){
  const login = document.getElementById('login')
  login.addEventListener("submit", (e) => {
    e.preventDefault()
    grabFormData()
  })
}

function grabFormData(){
  const formInput = document.getElementById('input')
  const username = formInput.value
  logInPost(username)
}

function logInPost(username){
  let reqObj = {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
     'Accept': 'application/json'
   },
    body: JSON.stringify({username: username})
    };
    // console.log(username)
  fetch(USER_URL, reqObj)
  .then(resp => resp.json())
  .then(userData => {
    currentUser = userData;
    fetchItineraries(userData)
  })
  logIn()
}



let loggedIn = true

function logIn(){
const form = document.getElementById('login')
 loggedIn = !loggedIn
   if (loggedIn){
      //dashboard.style.display = 'block'
       form.style.display = 'none'
   } else{
       // dashboard.style.display = 'none'
       form.style.display = 'block'
   }
}

function main(){
  document.addEventListener("DOMContentLoaded", ()=>{
    handleLogin()
    logIn()
  })
}

main()
