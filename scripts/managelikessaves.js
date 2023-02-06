// Add an event listener to the DOMContentLoaded event, which fires when the DOM has been fully loaded
document.addEventListener("DOMContentLoaded", function () {
   // Define a function to render saved items
  function renderItem() {
     // Retrieve saved items from session storage
    const items = JSON.parse(sessionStorage.getItem("saveArray"));
    // Get the container element where saved items will be displayed
    const container = document?.getElementById("saved");
    // Return if the container element is not found
    if (!container) {
      return;
    }
    // Initialize a variable to store the result string
    let result = "";
    // Loop through each item in the saved items array
    items.forEach((item, index) => {
      // If the item type is "article", add the item content to the result string
      if (item.type === "article") {
        result += `<div class="save-block"><p>${item.content}</p></div>`;
      }
      // If the item type is "image", add the item image to the result string
      if (item.type === "image") {
        result += `<img src=${item.src} />`;
      }
    });
    // Set the innerHTML of the container element to the result string
    container.innerHTML = result;
  }

   // Call the renderItem function to render saved items when the DOM is fully loaded
  renderItem();
});
