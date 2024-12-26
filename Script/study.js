function writestudydata() {
  let table_data1 = document.getElementById("table_data1");

  // Retrieve data from localStorage
  let study_name = localStorage.getItem("study_name");

  // If no data exists, initialize with an empty array
  if (!study_name) {
    study_name = [];
  } else {
    study_name = JSON.parse(study_name); // Parse the JSON to get the actual data
  }

  // Create table rows dynamically from the data
  let element = "";
  study_name.map((data) => {
    const isChecked = localStorage.getItem(`task_${data.id}`) === "true";
    element += `
        <ul style="color:black; background-color:white; margin-top:10px;margin-left:10px; margin-right:10px;  border-radius:8px;height: fit-content; list-style: none; display: flex;justify-content: space-evenly; align-items: center; text-align: center; box-shadow: rgba(58, 58, 62, 0.23) 0px 7px 29px 0px;">
    
          <input type="checkbox" onchange="toggleTask(this, ${data.id})" ${
      isChecked ? "checked" : ""
    } style="height:15px; width:15px; cursor:pointer;">
        <li style="width:50%; ${
          isChecked ? "text-decoration: line-through; color: gray;" : ""
        }">${data.name}</li>
        <li style="  display: flex; justify-content: space-evenly; align-items: center; ">
         <i class="fa-regular fa-pen-to-square" onclick="editstudy(${
           data.id
         })" style=" font-size: 18px; color:green;" ></i>
         <i class="fa-solid fa-trash-can" onclick="deletestudyData(${
           data.id
         })" style="margin-left: 10px; font-size: 18px; color:red;"></i>
        
      
        </li>
      </ul>
      `;
  });

  table_data1.innerHTML = element; // Update the table body with the data
  updatestudytask();
}
writestudydata();

function addstudy() {
  let name = document.getElementById("studyname").value;

  // Check if name is provided
  if (name) {
    // Retrieve existing data from localStorage
    let study_name = JSON.parse(localStorage.getItem("study_name")) || [];

    // Create new data object
    const new_data = {
      id: study_name.length + 1,
      name: name,
    };

    // Push new data to the array
    study_name.push(new_data);

    // Save updated data back to localStorage
    localStorage.setItem("study_name", JSON.stringify(study_name));

    // Reload the table data
    document.getElementById("studyname").value = "";
    writestudydata();
  } else {
    alert("After Fill The Input Box Click The + Button.");
  }
}

function editstudy(id) {
  // Hide the "add" form
  // alert("ho")
  document.querySelector(".createstudy").style.display = "none";

  // Show the "edit" form
  document.querySelector(".editstudy").style.display = "block";

  // Retrieve data from localStorage
  let study_name = JSON.parse(localStorage.getItem("study_name"));

  // Find the data to edit
  let dataToEdit = study_name.find((item) => item.id === id);

  // Populate the "edit" form field with the data
  document.getElementById("editstudyName").value = dataToEdit.name;

  // Store the id of the item being edited globally
  window.editId = id;
}

function updatestudy() {
  let name = document.getElementById("editstudyName").value;

  // Check if name is provided
  if (name && window.editId !== undefined) {
    // Retrieve data from localStorage
    let study_name = JSON.parse(localStorage.getItem("study_name"));

    // Find the index of the data being edited
    let dataIndex = study_name.findIndex((item) => item.id === window.editId);

    // Update the data
    study_name[dataIndex].name = name;

    // Save the updated data back to localStorage
    localStorage.setItem("study_name", JSON.stringify(study_name));
    // document.getElementById("editstudyName").value=""
    // Hide the edit form and show the add form again
    document.querySelector(".editstudy").style.display = "none";
    document.querySelector(".createstudy").style.display = "block";

    // Reload the table data
    document.getElementById("studyname").value = "";

    writestudydata();
  } else {
    alert("Please fill in the name field.");
  }
}

function deletestudyData(id) {
  // Retrieve data from localStorage
  let study_name = JSON.parse(localStorage.getItem("study_name"));

  // Filter out the data to delete
  study_name = study_name.filter((item) => item.id !== id);

  // Save the updated data back to localStorage
  localStorage.setItem("study_name", JSON.stringify(study_name));
  const cmpsound=document.getElementById("cmp-sound")
  cmpsound.play();
  setTimeout(()=>{
     cmpsound.pause();
     cmpsound.currentTime =0;

  },1000)
  // Reload the table data
  writestudydata();
  // updatetask();
}
function updatestudytask() {
  const count = JSON.parse(localStorage.getItem("study_name")) || [];
  // alert(count.length)
  const res = count.length;
  document.getElementById("counterstudy").innerHTML = `${res} Task`;
}
function checked() {
  document.querySelector("li").classList.add("color");
}

function toggleTask(checkbox, id) {
  const listItem = checkbox.nextElementSibling; // Select the corresponding <li>

  if (checkbox.checked) {
    listItem.style.textDecoration = "line-through";
    listItem.style.color = "gray";
    localStorage.setItem(`task_${id}`, "true"); // Save checked state
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
