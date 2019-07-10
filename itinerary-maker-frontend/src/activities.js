function locationEventListener(location){
  location.addEventListener('click', () => {
    const selectedIt = location.dataset.id

  fetch(`${ITINERARIES_URL}/${selectedIt}`)
    .then(resp => resp.json())
    .then(data => showItineraryCard(data))

  })
}
const activitiesDiv = document.createElement('div')
activitiesDiv.className = "activitiesDiv"
activitiesDiv.id = "activitiesDiv"

function showItineraryCard(itinerary){
  const main = document.getElementById("main")
  const eventContainer = document.createElement('div')
  const titleDiv = document.createElement('div')
  const title = document.createElement('h2')
  // const date = document.createElement('h3')
  const activityUl = document.createElement('ul')

  main.innerHTML = '';
  eventContainer.className = "event"
  titleDiv.className = "titleDiv"
  title.innerHTML = `${itinerary.location}, ${itinerary.date}`
  // date.innerHTML = itinerary.date


  let activities = itinerary.activities
  let activityObject = activities.map((activity) => {
    return renderActivity(activity)
  })

  activityObject.forEach(activityDiv => {
    activitiesDiv.append(activityDiv)
  })
  const activityBtnDiv = document.createElement('div')
  const addActivity = document.createElement('button')
  addActivity.innerHTML = "Add Activity"
  addActivity.className = "add"
  addActivity.dataset.id = itinerary.id

  titleDiv.append(title)
  eventContainer.append(titleDiv)
  activitiesDiv.append(activityUl)
  eventContainer.append(activitiesDiv)
  activityBtnDiv.append(addActivity)
  eventContainer.append(activityBtnDiv)
  main.append(eventContainer)

  addActivityClickListener()
}

function renderActivity(activity){
    const eventContainer = document.createElement('div')
    eventContainer.className = "event"
    // const activitiesDiv = document.getElementById('activitiesDiv')
    const activityName = document.createElement('h4')
    activityName.dataset.id = activity.id
    const activityDate = document.createElement('h6')
    const activityTime = document.createElement('h6')
    const activityInfo = document.createElement('div')
    const deleteActivityBtn = document.createElement('button');


    // const activityLink = document.createElement('a')
    // const activityImage = document.createElement('img')
    // activityLink.href = activity.link
    // activityLink.innerHTML = "Check it out!"
    // activityImage.src = activity.image

    activityName.innerHTML = activity.name
    activityDate.innerHTML = activity.date
    activityTime.innerHTML = activity.times
    deleteActivityBtn.innerText = "delete"
    deleteActivityBtn.className = "delete"
    deleteActivityBtn.dataset['id'] = activity.id


    activityInfo.append(activityName)
    activityInfo.append(activityDate)
    activityInfo.append(activityTime)
    // activityInfo.append(activityLink)
    // activityInfo.append(activityImage)
    activityInfo.append(deleteActivityBtn)
    activitiesDiv.append(activityInfo)

    activityEventListener(activityName)
    return activityInfo
}


function addActivityClickListener(){
  const mainElement = document.getElementById('main')
  mainElement.addEventListener('click', (e) => {
    if (e.target.className === 'add') {
      e.target.style.display = 'none'
      createAddActivityForm()
    } else if (e.target.className === 'delete'){
      handleDeleteActivity(e)
    }
  })
}

function handleDeleteActivity(e){
  fetch(`${ACTIVITIES_URL}/${e.target.dataset.id}`, {method: 'DELETE'})
  .then(resp => resp.json())
  .then(data => deleteActivity(e))
}

function deleteActivity(e){
  e.target.parentNode.remove()
}


/////when you click "Add Activity" this form shows up
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

/// When the form shows and you click "add"
function addActivity(addButton){
  addButton.addEventListener('click', (e)=> {
    e.preventDefault(e)
    const form = document.getElementById("addActivity")
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
