function activityEventListener(activityName){
  activityName.addEventListener("click", ()=>{
    const selectedActivity = activityName.dataset.id

  fetch(`${ACTIVITIES_URL}/${selectedActivity}`)
    .then(resp => resp.json())
    .then(data => showActivityPage(data))
  })

}

function showActivityPage(activity){
  console.log(activity)
  const main = document.getElementById("main")
  main.innerHTML = '';
  const activityContainer = document.createElement('div')
  activityContainer.id = "activityContainer"
  const activityTitleDiv = document.createElement('div')
  const activityTitle = document.createElement('h2')
  activityTitle.innerHTML = activity.name
  const activityDetailsDiv = document.createElement('div')
  const activityDateTime = document.createElement('p')
  activityDateTime.innerText = `${activity.date}, ${activity.times}`
  const activityLink = document.createElement('p')
  activityLink.innerHTML = activity.like
  const activityImageDiv = document.createElement('div')
  const activityImage = document.createElement('image')
  activityImage.src = activity.image
  // const activityLikes = document.createElement('span')

  const commentsDiv = document.createElement('div')
  commentsDiv.id = "commentsDiv"
  // const activityCreator = document.createElement('p')
  // activityCreator.innerHTML = activity.user_id.name
  const activityComments = createCommentsPItems(activity.comments)
  activityComments.forEach((commentP) => {
    commentsDiv.append(commentP);
  })


  const commentForm = document.createElement('form')
  const commentInput = document.createElement('input')
  commentInput.id = "commentInput"
  commentForm.append(commentInput)
  const addCommentBtn = document.createElement('button')
  addCommentBtn.id = "addCommentBtn"
  addCommentBtn.innerHTML = "Add Comment"
  addCommentListener(addCommentBtn, commentInput)

  commentsDiv.append(commentForm)
  commentsDiv.append(addCommentBtn)
  activityImageDiv.append(activityImage)
  activityDetailsDiv.append(activityDateTime)
  activityDetailsDiv.append(activityLink)
  activityDetailsDiv.append(activityImageDiv)
  // activityDetailsDiv.append(activityCreator)
  activityTitle.append(activityDetailsDiv)
  activityTitleDiv.append(activityTitle)
  activityContainer.append(activityTitleDiv)
  activityContainer.append(commentsDiv)
  main.append(activityContainer)
}

function renderComments(comment){
  let commentP = document.createElement('p')
  commentP.innerHTML = comment.content
  const deleteCommentBtn = document.createElement('button');
  deleteCommentBtn.innerText = "delete"
  deleteCommentBtn.className = "delete"
  deleteCommentBtn.dataset['id'] = comment.id
  commentP.append(deleteCommentBtn)
  return commentP
}

function createCommentsPItems(comments){
  let answer = comments.map(comment => {
    const commentsPs = renderComments(comment)
    return commentsPs
  })
  return answer
}


function addCommentListener(addCommentBtn, commentInput){
  addCommentBtn.addEventListener("click", ()=>{

    const commentContent = commentInput.value
    let commentP = document.createElement('p')
    commentP.innerHTML = commentContent
    const deleteCommentBtn = document.createElement('button');
    deleteCommentBtn.innerText = "delete"
    deleteCommentBtn.className = "delete"
    commentP.append(deleteCommentBtn)
    let commentDiv = document.getElementById('commentsDiv')
    commentDiv.append(commentP)
    return commentP

    fetch(COMMENTS_URL)
  })
}

function buildCommentForm(){

}


function commentForm(){
  commentForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let newComment = document.createElement('li')
    const commentField = document.getElementById('comment_input').value
    newComment.append(commentField)
    commentsUl.append(newComment)


    let reqObj = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          image_id: imageId,
          content: commentField
      })

    }
    fetch(commentsURL, reqObj)
    .then (resp => resp.json())
    commentForm.reset()
  })
}




// The following adds activities and deletes them from the main page
// function handleAddActivity(e){
//   const reqObj = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json'},
//     body: JSON.stringify(
//       {
//         CREATE FORM FOR ADD ACTIVITY THEN PULL VALUES TO SEND TO POST REQUEST
//         name: e.target.dataset.id}),
//   }
//   fetch(ACTIVITIES_URL, reqObj)
//     .then(resp => resp.json())
//     .then(data => createNewActivity(data, e))
// }
//
// function createNewActivity (activity, e) {
//   const activityLi = createActivityLi(activity)
//   e.target.nextSibling.append(activityLi)
// }

// function handleDeleteActivity(e){
//   fetch(`${ACTIVITIES_URL}/${e.target.dataset.id}`, {method: 'DELETE'})
//     .then(resp => resp.json())
//     .then(data => deleteActivity(e))
// }

// function deleteActivity(e){
//   e.target.parentNode.remove()
// }

// function addClickListener(){
//   const mainElement = document.querySelector('main')
//   mainElement.addEventListener('click', (e) => {
//     if (e.target.className === 'add') {
//       handleAddActivity(e)
//     } else if (e.target.className === 'delete'){
//       handleDeleteActivity(e)
//     }
//   })
// }
