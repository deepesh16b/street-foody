// Define a list of options
const options = ["Apple", "Banana", "Cherry", "Durian", "Elderberry", "Fig", "Grape"];

function showOptions() {
  // Get the input field and the list
  const inputField = document.getElementById("input-field");
  const list = document.getElementById("list");
  
  // Clear the list
  list.innerHTML = "";
  
  // Get the input value
  const inputValue = inputField.value.toLowerCase();
  
  // Loop through the options and add the matching ones to the list
  for (let i = 0; i < options.length; i++) {
    const option = options[i].toLowerCase();
    
    if (option.startsWith(inputValue)) {
      const listItem = document.createElement("li");
      listItem.innerText = options[i];
      list.appendChild(listItem);
    }
  }
}