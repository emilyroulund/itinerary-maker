
function showActivityPage(activity){
  const main = document.getElementById("main")
  const activityContainer = document.createElement('div')
  const activityTitleDiv = document.createElement('div')
  const activityTitle = document.createElement('h2')
  const activityDetailsDiv = document.createElement('div')
  const activityDateTime = document.createElement('h4')
  const activityLink = document.createElement('a')
  const activityImageDiv = document.createElement('div')
  const activityImage = document.createElement('img')

  main.innerHTML = '';
  activityContainer.id = "activityContainer"
  activityTitle.innerHTML = activity.name
  activityDateTime.innerText = `${activity.date}, ${activity.times}`
  activityLink.href = activity.link
  activityLink.target = '_blank';
  activityLink.innerHTML = "Click Here for More Info"
  activityImage.src = activity.image

  const commentsDiv = document.createElement('div')
  const activityComments = createCommentsPItems(activity.comments)
  const commentsList = document.createElement('div')
  commentsDiv.id = "commentsDiv"
  commentsList.id = "commentsList"
  commentsDiv.append(commentsList)
  activityComments.forEach((commentP) => {
    commentsList.append(commentP);
  })

  const commentForm = document.createElement('form')
  const commentInput = document.createElement('input')
  const addCommentBtn = document.createElement('button')

  commentInput.id = "commentInput"
  commentInput.dataset.id = activity.user_id
  commentForm.append(commentInput)
  addCommentBtn.id = "addCommentBtn"
  addCommentBtn.innerHTML = "Add Comment"
  addCommentBtn.dataset.id = activity.id

  addCommentListener(addCommentBtn, commentInput)
  addClickListener()

  commentsDiv.append(commentForm)
  commentsDiv.append(addCommentBtn)
  activityImageDiv.append(activityImage)
  activityDetailsDiv.append(activityDateTime)
  activityDetailsDiv.append(activityLink)
  activityDetailsDiv.append(activityImageDiv)
  activityTitleDiv.append(activityTitle)
  activityContainer.append(activityTitleDiv)
  activityContainer.append(activityDetailsDiv)
  activityContainer.append(commentsDiv)
  main.append(activityContainer)
  // createGoBackButton()
}

function renderComments(comment){
  let commentP = document.createElement('p')
  const deleteCommentBtn = document.createElement('button');
  commentP.id = "commentP"
  commentP.innerHTML = comment.content
  deleteCommentBtn.innerText = "delete"
  deleteCommentBtn.className = "deleteBtn"
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
  addCommentBtn.addEventListener("click", (e)=>{

    const commentContent = commentInput.value
    let commentP = document.createElement('p')
    const deleteCommentBtn = document.createElement('button');
    let commentList = document.getElementById('commentsList')

    commentP.innerHTML = commentContent
    deleteCommentBtn.innerText = "delete"
    deleteCommentBtn.className = "delete"
    commentP.append(deleteCommentBtn)
    commentList.append(commentP)

    let reqObj = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          activity_id: addCommentBtn.dataset.id,
          user_id: commentInput.dataset.id,
          content: commentContent
      })

    }
    fetch(COMMENTS_URL, reqObj)
    .then (resp => resp.json())
    .then(console.log(e.target.parentNode))
    commentInput.value = ""
  })
}

function handleDeleteComment(e){
  fetch(`${COMMENTS_URL}/${e.target.dataset.id}`, {method: 'DELETE'})
    deleteComment(e)
}

function deleteComment(e){
  e.target.parentNode.remove()
}

function addClickListener(){
  const mainElement = document.querySelector('main')
  mainElement.addEventListener('click', (e) => {
    if (e.target.className === 'deleteBtn'){
      handleDeleteComment(e)
    }
  })
}

// function createGoBackButton(){
//   const goBackButton = document.createElement('button')
//   const header = document.getElementsByClassName('titleDiv')
//   goBackButton.innerHTML = "<<Back"
//   header.append(goBackButton)
// }
