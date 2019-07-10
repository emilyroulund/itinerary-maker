let itineraryId;

function fetchItineraries(userData){
 fetch(ITINERARIES_URL)
 .then(resp => resp.json())
 .then((itineraries) => renderItinerariers(userData, itineraries))
}

function renderItinerariers(userData, itineraries){
  let specificItin = itineraries.filter(itinerary => {
    return itinerary.users[0].id === userData.id})
  specificItin.forEach(itinerary => {
    renderItinerary(itinerary)
  })
}

function renderItinerary(itinerary) {
  const main = document.getElementById('main')
  const dataDiv = document.createElement('div')
  const eventCard = document.createElement('div');
  const date = itinerary.date
  const location = document.createElement('h2');
  location.dataset.id = itinerary.id
  locationEventListener(location);
  const activityUl = document.createElement('ul')
  const activityLi = document.createElement('li')
  const activityLis = createActivityListItems(itinerary.activities);
  eventCard.className = "card";
  location.className = "locationCard"
  location.innerHTML = `${itinerary.location}, ${date}`
  activityLis.forEach((activityList) => {
    activityUl.append(activityList);
  })

  eventCard.append(location);
  eventCard.append(activityUl)
  dataDiv.append(eventCard);
  main.append(dataDiv)
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
