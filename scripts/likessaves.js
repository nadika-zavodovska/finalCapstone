// Class `savedItem` represents an item saved by the user, it has 3 properties:
// `type` which is either "saved" or "liked", `title` which is the title of the page, and `filename` which is the filename of the page.
class savedItem {
  constructor(type, title, filename) {
    this.type = type;
    this.title = title;
    this.filename = filename;
  }
}

// `count` is a variable that keeps track of the number of saved items
let count = 0;

// This code listens to the click event of all the elements with the class `save-item`,
// increments the count variable by 1 whenever a save-item is clicked.
document.querySelectorAll(".save-item").forEach((btn) => {
  btn.addEventListener("click", () => {
    count++;
  });
});

// This function saves a page, it retrieves the title of the page, filename of the page,
// and creates a new instance of the `savedItem` class.
// Then it retrieves the saved items from the session storage and increments the length by 1,
// to show the total number of saved items.
function savePage() {
  let title = document.title;
  let filename = location.href.split("/").slice(-1);
  let newItem = new savedItem("saved", title, filename);

  // Retrieve the saved items from session storage
  const saveArray = JSON.parse(window.sessionStorage.getItem("saveArray"));
  const length = saveArray?.length || 0;
  const keys = Object.keys(sessionStorage);
  // Check the saved items and update the count variable
  for (let key of keys) {
    let item = JSON.parse(window.sessionStorage.getItem(key));
    if (item.type == "saved" && count == 0) {
      count += 1;
    }
    if (item.type == "saved") {
      count += 0;
    }
  }

  alert(`You've saved content. You have ${length + 1} blocks.`);
}

// `countLike` is a variable that keeps track of the number of liked items
let countLike = 0;

// This code listens to the click event of all the elements with the class `btnLike`,
// increments the countLike variable by 1 whenever a btnLike is clicked,
// creates a new instance of the `savedItem` class, and stores it in the session storage.
document.querySelectorAll(".btnLike").forEach((button) => {
  button.addEventListener("click", function () {
    let title = document.title;
    let filename = location.href.split("/").slice(-1);
    let newItem = new savedItem("liked", title, filename);

    // Store the liked item in the session storage
    window.sessionStorage.setItem(
      "LIKED" + button.id + filename,
      JSON.stringify(newItem)
    );

    alert(`You've liked a block.`);
    // Check if the page is liked and update the UI
    checkLiked(button.id);
  });
});

// checkLiked() function checks if the current page has been liked by the user.
// If the page has been liked, the function adds the class "disabled" to the liked button
// and disables the button so the user can no longer like the page.
function checkLiked(id) {
  // Get the key of the liked page in session storage
  let page = window.sessionStorage.getItem(
    "LIKED" + id + location.href.split("/").slice(-1)
  );
  // If the key exists in session storage, the page has been liked
  if (page !== null) {
    // Add the "disabled" class to the liked button
    document.getElementById(id).classList.add("disabled");
    // Disable the liked button
    document.getElementById(id).disabled = true;
  }
}

