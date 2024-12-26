function writedata() {
  let table_data = document.getElementById("table_data");

  // Retrieve data from localStorage
  let curd_data = localStorage.getItem("curd_data");

  // If no data exists, initialize with an empty array
  if (!curd_data) {
    curd_data = [];
  } else {
    curd_data = JSON.parse(curd_data); // Parse the JSON to get the actual data
  }

  // Create table rows dynamically from the data
  let element = "";
  curd_data.map((data) => {
    const isChecked = localStorage.getItem(`task_${data.id}`) === "true";
    element += `
      <ul style="color:black; background-color:white; margin-top:10px;margin-left:10px; margin-right:10px;  border-radius:8px; height: fit-content; list-style: none; display: flex;justify-content: space-evenly; align-items: center; text-align: center; box-shadow: rgba(58, 58, 62, 0.23) 0px 7px 29px 0px;">
        <input type="checkbox" onchange="toggleTask(this, ${data.id})" ${
      isChecked ? "checked" : ""
    } style="height:15px; width:15px; cursor:pointer;">
        <li style="width:50%; ${
          isChecked ? "text-decoration: line-through; color: gray;" : ""
        }">${data.name}</li>
        <li style="  display: flex; justify-content: space-evenly; align-items: center; ">
         <i class="fa-regular fa-pen-to-square" onclick="edit(${
           data.id
         })" style=" font-size: 18px; color:green;" id="editper"></i>
         <i class="fa-solid fa-trash-can" onclick="deleteData(${
           data.id
         })" style="margin-left: 10px; font-size: 18px; color:red;"></i>
        
      
        </li>
      </ul>
    `;
  });

  table_data.innerHTML = element; // Update the table body with the data
  updatepertask();
}
writedata();

function addtask() {
  let name = document.getElementById("name").value;

  // Check if name is provided
  if (name) {
    // Retrieve existing data from localStorage
    let curd_data = JSON.parse(localStorage.getItem("curd_data")) || [];

    // Create new data object
    const new_data = {
      id: curd_data.length + 1,
      name: name,
    };

    // Push new data to the array
    curd_data.push(new_data);

    // Save updated data back to localStorage
    localStorage.setItem("curd_data", JSON.stringify(curd_data));

    // Reload the table data
    document.getElementById("name").value = "";
    writedata();
  } else {
    alert("After Fill The Input Box Click The + Button.");
  }
}
const add = document.getElementById('add')
add.addEventListener("click",addtask);
// add.addEventListener("keydown", function(event){
//   if (event.key === 'Enter') {
//     addtask();
//   }
// });
function edit(id) {
  // Hide the "add" form
  document.querySelector(".creat").style.display = "none";

  // Show the "edit" form
  document.querySelector(".edit").style.display = "block";

  // Retrieve data from localStorage
  let curd_data = JSON.parse(localStorage.getItem("curd_data"));

  // Find the data to edit
  let dataToEdit = curd_data.find((item) => item.id === id);

  // Populate the "edit" form field with the data
  document.getElementById("editName").value = dataToEdit.name;

  // Store the id of the item being edited globally
  window.editId = id;
}

function update() {
  let name = document.getElementById("editName").value;

  // Check if name is provided
  if (name && window.editId !== undefined) {
    // Retrieve data from localStorage
    let curd_data = JSON.parse(localStorage.getItem("curd_data"));

    // Find the index of the data being edited
    let dataIndex = curd_data.findIndex((item) => item.id === window.editId);

    // Update the data
    curd_data[dataIndex].name = name;

    // Save the updated data back to localStorage
    localStorage.setItem("curd_data", JSON.stringify(curd_data));

    // Hide the edit form and show the add form again
    document.querySelector(".edit").style.display = "none";
    document.querySelector(".creat").style.display = "block";

    // Reload the table data
    document.getElementById("name").value = "";
    writedata();
  } else {
    alert("Please fill in the name field.");
  }
}

function deleteData(id) {
  // Retrieve data from localStorage
  let curd_data = JSON.parse(localStorage.getItem("curd_data"));

  // Filter out the data to delete
  curd_data = curd_data.filter((item) => item.id !== id);

  // Save the updated data back to localStorage
  localStorage.setItem("curd_data", JSON.stringify(curd_data));
   const cmpsound=document.getElementById("cmp-sound")
   cmpsound.play();
   setTimeout(()=>{
      cmpsound.pause();
      cmpsound.currentTime =0;

   },1000)
  // Reload the table data
  writedata();
}
function checked() {
  document.querySelector("li").classList.add("color");
}
function updatepertask() {
  const count = JSON.parse(localStorage.getItem("curd_data")) || [];
  // alert(count.length)
  const res = count.length;
  document.getElementById("counterper").innerHTML = `${res} Task`;
}

function toggleTask(checkbox, id) {
  const listItem = checkbox.nextElementSibling; // Select the corresponding <li>

  if (checkbox.checked) {
    listItem.style.textDecoration = "line-through";
    listItem.style.color = "gray";
    localStorage.setItem(`task_${id}`, "true");

    // Save checked state
  } else {
    listItem.style.textDecoration = "none";
    listItem.style.color = "black";
    localStorage.setItem(`task_${id}`, "false"); // Save unchecked state
  }
}

function updatepertask() {
  const count = JSON.parse(localStorage.getItem("curd_data")) || [];
  const res = count.length;
  document.getElementById("counterper").innerHTML = `${res} Task`;
}

// Call `writedata` on page load to restore the task states
document.addEventListener("DOMContentLoaded", () => {
  writedata();
});
