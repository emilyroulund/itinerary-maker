let itineraryId;

function fetchItineraries(userData){
 fetch(ITINERARIES_URL)
 .then(resp => resp.json())
 .then((itineraries) => renderItinerariers(userData, itineraries))
 const header = document.querySelector('header')
 const addItinerary = document.createElement('button')
 addItinerary.innerHTML = "Add Itinerary"
 header.append(addItinerary)
 handleAddItinerary(addItinerary, userData)
}

function renderItinerariers(userData, itineraries){
  let specificItin = itineraries.filter(itinerary => {
    console.log(itinerary.users)
    return itinerary.users[0].id === userData.id})
  specificItin.forEach(itinerary => {
    renderItinerary(itinerary)
  })
}

function handleAddItinerary(addItinerary, userData){
  addItinerary.addEventListener('click', (e) => {
    addItinerary.style.display = 'none'
    renderCreateForm(userData)
  })
}

function renderCreateForm(userData){
  const form = document.createElement('form')
  form.id = 'formToCreateNewItinerary'
  const locationLabel = document.createElement('label')
  locationLabel.innerHTML = 'Location: '
  const dateLabel = document.createElement('label')
  dateLabel.innerHTML = 'Date: '
  const itineraryInputLocation = document.createElement('input')
  itineraryInputLocation.id = "locationFormInput"
  const itineraryInputDate = document.createElement('input')
  itineraryInputDate.id = "locationFormDate"

  const submitNewItineraryBtn = document.createElement('button')
  submitNewItineraryBtn.innerHTML = "Add"
  submitNewItineraryBtn.id = "submitNewItineraryBtn"
  submitNewItineraryBtn.dataset.id = userData.id
  form.append(submitNewItineraryBtn)
  form.append(locationLabel)
  form.append(itineraryInputLocation)
  form.append(dateLabel)
  form.append (itineraryInputDate)
  const main = document.getElementById('main')
  main.append(form)
  grabItineraryFormData(submitNewItineraryBtn, userData)
}

function grabItineraryFormData(submitNewItineraryBtn, userData){
  submitNewItineraryBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const itineraryInputLocation = document.getElementById('locationFormInput')
    const itineraryInputDate = document.getElementById('locationFormDate')
    const locationValue = itineraryInputLocation.value
    const dateValue = itineraryInputDate.value

    const form = document.getElementById("formToCreateNewItinerary")
    const limiter = document.getElementsByClassName('limiter')[0]
    const dataDiv = document.createElement('div')
    const eventCard = document.createElement('div');
    const location = document.createElement('h2');
    form.dataset.id = submitNewItineraryBtn.dataset.id
    location.dataset.id = submitNewItineraryBtn.dataset.id
    locationEventListener(location);
    eventCard.className = "card";
    location.className = "locationCard"
    location.innerHTML = `${locationValue}, ${dateValue}`
    eventCard.append(location);
    dataDiv.append(eventCard);
    limiter.append(dataDiv)
    postToBackend(locationValue, dateValue, userData)
  })
}

function postToBackend(locationValue, dateValue, userData){
  const form = document.getElementById("formToCreateNewItinerary")
  console.log(userData)
  let reqObj = {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      location: locationValue,
      date: dateValue,
      user: userData.id
    })
  }
  fetch(`${ITINERARIES_URL}`, reqObj)
    form.reset()
}

function renderItinerary(itinerary) {
  const limiter = document.getElementsByClassName('limiter')[0]
  const dataDiv = document.createElement('div')
  const eventCard = document.createElement('div');
  const location = document.createElement('h2');
  const activityUl = document.createElement('ul')
  const activityLi = document.createElement('li')
  const activityLis = createActivityListItems(itinerary.activities);
  location.dataset.id = itinerary.id
  locationEventListener(location);
  eventCard.className = "card";
  location.className = "locationCard"
  location.innerHTML = `${itinerary.location}, ${itinerary.date}`
  activityLis.forEach((activityList) => {
    activityUl.append(activityList);
  })

  eventCard.append(location);
  eventCard.append(activityUl)
  dataDiv.append(eventCard);
  limiter.append(dataDiv)
}

function createActivityListItems(activities){
  let answer = activities.map((activity) => {
    const activityLi = createActivityLi(activity)
    return activityLi
  })
  return answer
}

function createActivityLi(activity){
  const activityLi = document.createElement('li')
  activityLi.innerHTML = activity.name
  return activityLi
}
