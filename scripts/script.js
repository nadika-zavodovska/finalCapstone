document.addEventListener("DOMContentLoaded", function () {
  // Get the button on the document.
  let buttonTop = document.getElementById("topbutton");

  // If user scrolls down 30px, show the button.
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 30 ||
      document.documentElement.scrollTop > 30
    ) {
      buttonTop.style.display = "block";
    } else {
      //Make disable the button, if user does not scroll down.
      buttonTop.style.display = "none";
    }
  }

  // Save the data-content of the clicked item.
  function save(event) {
    // Check if the event target has the "disable" attribute set to true, and return if true.
    if (!!event.targer?.getAttribute("disable") == true) {
      return;
    }

    // Get the current saved data or initialize it as an empty array.
    const saveArray = JSON.parse(sessionStorage.getItem("saveArray")) || [];
    // Get the closest parent element with "data-content" attribute.
    const parent = event.target.closest("[data-content]");
    // Get the value of the "data-content" attribute.
    const dataType = parent.getAttribute("data-content");
    // Construct the result object with data from the parent element.
    const result = {
      id: parent.getAttribute("data-id"),
      type: parent.getAttribute("data-content"),
      content: parent.innerHTML,
      isSave: true,
      title: parent.getAttribute("data-title"),
      src: "",
    };
    // If the data type is "image", get the src attribute of the first <img> element.
    if (dataType === "image") {
      result.src = parent.querySelector("img").getAttribute("src");
    }
    // Add the result object to the saveArray.
    saveArray.push(result);
    // Store the updated saveArray in session storage.
    sessionStorage.setItem("saveArray", JSON.stringify(saveArray));
    // Set the "disable" attribute of the event target to true.
    event.target.setAttribute("disable", true);
  }

  // Initialize the saveArray in session storage if it doesn't exist.
  function initSaveStorage() {
    const saveArray = sessionStorage.getItem("saveArray");
    if (!saveArray) {
      sessionStorage.setItem("saveArray", "[]");
    }
  }
  // Listen for the click event and call the save function if the data-action attribute is "save"
  document.addEventListener("click", function (event) {
    if (event.target.getAttribute("data-action") === "save") {
      save(event);
    }
  });
  // Call the initSaveStorage function to initialize the saveArray in session storage.
  initSaveStorage();
});
