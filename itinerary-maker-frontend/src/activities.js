const activitiesDiv = document.createElement('div')
activitiesDiv.className = "activitiesDiv"
activitiesDiv.id = "activitiesDiv"

const eventContainer = document.createElement('div')
eventContainer.className = "event"


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
  const titleDiv = document.createElement('div')
  const title = document.createElement('h2')
  const activityUl = document.createElement('ul')
  main.innerHTML = '';
  titleDiv.className = "titleDiv"
  title.innerHTML = `${itinerary.location}, ${itinerary.date}`


  let activities = itinerary.activities
  let activityObject = activities.map((activity) => {
    return renderActivity(activity)
  })

  activityObject.forEach(activityDiv => {
    activitiesDiv.append(activityDiv)
  })
  const activityBtnDiv = document.createElement('div')
  const addActivityBtn = document.createElement('button')
  activityBtnDiv.className = 'activityBtnDiv'
  addActivityBtn.innerHTML = "Add Activity"
  addActivityBtn.className = "add"
  addActivityBtn.id = "addActivityButton"
  addActivityBtn.dataset.id = itinerary.id

  titleDiv.append(title)
  main.append(titleDiv)
  activitiesDiv.append(activityUl)
  eventContainer.append(activitiesDiv)
  activityBtnDiv.append(addActivityBtn)
  eventContainer.append(activityBtnDiv)
  main.append(eventContainer)

  addActivityClickListener(addActivityBtn)
}

function renderActivity(activity){
    const activityName = document.createElement('h4')
    const activityDate = document.createElement('h6')
    const activityTime = document.createElement('h6')
    const activityInfo = document.createElement('div')
    const deleteActivityBtn = document.createElement('button');
    activityInfo.className = "card2"
    activityName.dataset.id = activity.id

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
    activitiesDiv.append(activityInfo)

    activityEventListener(activityName)
    return activityInfo
}

function addActivityClickListener(addActivityBtn){
  const mainElement = document.getElementById('main')
  mainElement.addEventListener('click', (e) => {
    if (e.target.className === 'add') {
      e.target.style.display = 'none'
      createAddActivityForm(addActivityBtn)
    } else if (e.target.className === 'delete'){
      console.log(e)
      handleDeleteActivity(e)
    }
  })
}

function handleDeleteActivity(e){
  console.log(e.target.dataset.id)
  fetch(`${ACTIVITIES_URL}/${e.target.dataset.id}`, {method: 'DELETE'})
  .then(resp => resp.json())
  .then(data => deleteActivity(e))
}

function deleteActivity(e){
  e.target.parentNode.remove()
}

function createAddActivityForm (addActivityBtn){
  const activityForm = document.createElement('form')
  const formDiv = document.createElement('div')
  const addButton = document.createElement('button')
  const nameLabel = document.createElement('label')
  const nameInput = document.createElement('input')
  const dateLabel = document.createElement('label')
  const dateInput = document.createElement('input')
  const timesLabel = document.createElement('label')
  const timesInput = document.createElement('input')
  const linkLabel = document.createElement('label')
  const linkInput = document.createElement('input')
  const imageLabel = document.createElement('label')
  const imageInput = document.createElement('input')

  activityForm.id = "addActivityForm"
  formDiv.className = "container"
  addButton.type = "submit"
  addButton.innerText = "Add"
  addButton.dataset.id = addActivityBtn.dataset.id
  nameLabel.innerHTML = " Name of Activity: "
  nameInput.className = "input"
  nameInput.id = "nameInput"
  dateLabel.innerHTML = " Date: "
  dateInput.className = "input"
  dateInput.id = "dateInput"
  timesLabel.innerHTML = " Time: "
  timesInput.className = "input"
  timesInput.id = "timesInput"
  linkLabel.innerHTML = " Link: "
  linkInput.className = "input"
  linkInput.id = "linkInput"
  imageLabel.innerHTML = " Link to Image: "
  imageInput.className = "input"
  imageInput.id = "imageInput"

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
  eventContainer.append(activityForm)

  addActivity(addButton)
}

function addActivity(addButton){
  addButton.addEventListener('click', (e)=> {
    e.preventDefault(e)
    const form = document.getElementById("addActivityForm")
    const name = document.getElementById('nameInput').value
    const date = document.getElementById('dateInput').value
    const time = document.getElementById('timesInput').value
    const link = document.getElementById('linkInput').value
    const image = document.getElementById('imageInput').value
    let reqObj = {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: name,
        date: date,
        times: time,
        link: link,
        image: image,
        user_id: currentUser.id,
        itinerary_id: addButton.dataset.id
      })
    }
    fetch(`${ACTIVITIES_URL}`, reqObj)
      .then(resp => resp.json())
      .then(activity => renderActivity(activity))
      form.reset()
  })
}

function activityEventListener(activityName){
  activityName.addEventListener("click", ()=>{
    const selectedActivity = activityName.dataset.id

    fetch(`${ACTIVITIES_URL}/${selectedActivity}`)
      .then(resp => resp.json())
      .then(data => showActivityPage(data))
    })
}
