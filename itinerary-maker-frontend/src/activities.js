function locationEventListener(location){
  location.addEventListener('click', () => {
    const selectedIt = location.dataset.id

  fetch(`${ITINERARIES_URL}/${selectedIt}`)
    .then(resp => resp.json())
    .then(data => showItineraryCard(data))

  })
}

function showItineraryCard(itinerary){
  const main = document.getElementById("main")
  const eventContainer = document.createElement('div')
  const titleDiv = document.createElement('div')
  const title = document.createElement('h2')
  const date = document.createElement('h3')
  const activitiesDiv = document.createElement('div')
  const activityUl = document.createElement('ul')

  main.innerHTML = '';
  eventContainer.className = "event"
  titleDiv.className = "titleDiv"
  title.innerHTML = itinerary.location
  date.innerHTML = itinerary.date

  activitiesDiv.className = "activitiesDiv"
  activitiesDiv.id = "activitiesDiv"

  let activities = itinerary.activities
  let activityObject = activities.map((activity) => {
    return renderActivity(activity)
  })

  activityObject.forEach(activityDiv => {
    activitiesDiv.append(activityDiv)
  })

  const addActivity = document.createElement('button')
  addActivity.innerHTML = "Add Activity"
  addActivity.className = "add"

  activitiesDiv.append(addActivity)
  titleDiv.append(title, date)
  eventContainer.append(titleDiv)
  activitiesDiv.append(activityUl)
  eventContainer.append(activitiesDiv)
  main.append(eventContainer)

  addActivityListener(addActivity)
}

function renderActivity(activity){
    const eventContainer = document.createElement('div')
    eventContainer.className = "event"
    let activitiesDiv = document.getElementById('activitiesDiv')
    const activityName = document.createElement('h4')
    activityName.dataset.id = activity.id
    const activityDate = document.createElement('h6')
    const activityTime = document.createElement('h6')
    const activityInfo = document.createElement('div')
    const deleteActivityBtn = document.createElement('button');

    activityName.innerHTML = activity.name
    activityDate.innerHTML = activity.date
    activityTime.innerHTML = activity.times
    deleteActivityBtn.innerText = "delete"
    deleteActivityBtn.className = "delete"
    deleteActivityBtn.dataset['id'] = activity.id

    activityInfo.append(activityName)
    activityInfo.append(activityDate)
    activityInfo.append(activityTime)
    activityInfo.append(deleteActivityBtn)
    // activitiesDiv.append(activityInfo)

    activityEventListener(activityName)
    return activityInfo
}

function addActivityListener(addActivity){
  addActivity.addEventListener('click', () => {
    createAddActivityForm()
  })
}

function createAddActivityForm (){
  const activityForm = document.createElement('form')
  activityForm.id = "addActivity"
  const formDiv = document.createElement('div')
  formDiv.className = "container"
  const addButton = document.createElement('button')
  addButton.type = "submit"
  addButton.innerText = "Add"
  const nameLabel = document.createElement('label')
  nameLabel.innerHTML = " Name of Activity: "
  const nameInput = document.createElement('input')
  nameInput.className = "input"
  nameInput.id = "nameInput"
  const dateLabel = document.createElement('label')
  dateLabel.innerHTML = " Date: "
  const dateInput = document.createElement('input')
  dateInput.className = "input"
  dateInput.id = "dateInput"
  const timesLabel = document.createElement('label')
  timesLabel.innerHTML = " Time: "
  const timesInput = document.createElement('input')
  timesInput.className = "input"
  timesInput.id = "timesInput"
  const linkLabel = document.createElement('label')
  linkLabel.innerHTML = " Link: "
  const linkInput = document.createElement('input')
  linkInput.className = "input"
  linkInput.id = "linkInput"
  const imageLabel = document.createElement('label')
  imageLabel.innerHTML = " Link to Image: "
  const imageInput = document.createElement('input')
  imageInput.className = "input"
  imageInput.id = "imageInput"

  const activityContainer = document.getElementById('activitiesDiv')

  formDiv.append(nameLabel)
  formDiv.append(nameInput)
  formDiv.append(dateLabel)
  formDiv.append(dateInput)
  formDiv.append(timesLabel)
  formDiv.append(timesInput)
  formDiv.append(linkLabel)
  formDiv.append(linkInput)
  formDiv.append(imageLabel)
  formDiv.append(imageInput)
  formDiv.append(addButton)
  activityForm.append(formDiv)
  activityContainer.append(activityForm)

  addActivity(addButton)
}

function addActivity(addButton, e){
  addButton.addEventListener('click', (e)=> {
    e.preventDefault(e)
    const name = document.getElementById('nameInput').value
    const date = document.getElementById('dateInput').value
    const time = document.getElementById('timesInput').value
    const link = document.getElementById('linkInput').value
    const imageLink = document.getElementById('imageInput').value

    let reqObj = {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: name,
        date: date,
        times: time,
        link: link,
        image: imageLink
      })
    }
    fetch(`${ACTIVITIES_URL}`, reqObj)
      .then(resp => resp.json())
      .then(data => renderActivity(data))
  })

}
