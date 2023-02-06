// Class Comment creates a new comment object
class Comment {
  // constructor to initialize the comment object with type, date, username and text
  constructor(type, date, username, text) {
    // type of comment - 'comment' or 'warning'
    this.type = type;
    // date of the comment
    this.date = date;
    // username of the user who made the comment
    this.username = username;
    // text of the comment
    this.text = text;
  }
}
// get the username field from the HTML DOM
const fieldUsername = document.getElementById("user-name");
// get the comment field from the HTML DOM
const fieldComment = document.getElementById("user-comment");
// array to store all comments
const comments = [];

// function to load all comments in the HTML DOM
const loadComments = () => {
  let list = "";
  // loop through all comments
  comments.forEach((comment) => {
    let className = "";
    // check the type of comment
    if (comment.type === "comment") {
      className = "comment";
    } else if (comment.type === "warning") {
      className = "warning";
    }
    // create the HTML string for each comment
    list += `<div class="${className}">`;
    list += `<div class="comment-username">${comment.username}</div>`;
    list += `<div class="comment-date">${comment.date}</div>`;
    list += `<div class="comment-text">${comment.text}</div>`;
    list += "</div>";
  });
  // set the innerHTML of the comment feed to the created HTML string
  document.getElementById("comment-feed").innerHTML = list;
};

// function to add a new comment
function addComment() {
  // prevent default submit behavior
  event.preventDefault();
  // get the current date
  const date = new Date();
  // create a new comment object
  const content = new Comment(
    "comment",
    date.toLocaleString(),
    fieldUsername.value,
    fieldComment.value
  );
  // add the new comment to the comments array
  comments.push(content);
  // load all comments in the HTML DOM
  loadComments();
  // clear the username and comment fields
  fieldUsername.value = "";
  fieldComment.value = "";
}
