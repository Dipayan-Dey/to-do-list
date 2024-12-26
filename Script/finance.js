function writefinancedata() {
  let table_data2 = document.getElementById("table_data2");

  // Retrieve data from localStorage
  let finance_name = localStorage.getItem("finance_name");

  // If no data exists, initialize with an empty array
  if (!finance_name) {
    finance_name = [];
  } else {
    finance_name = JSON.parse(finance_name); // Parse the JSON to get the actual data
  }

  // Create table rows dynamically from the data
  let element = "";
  finance_name.map((data) => {
    const isChecked = localStorage.getItem(`task_${data.id}`) === "true";
    element += `
        <ul style="color:black; background-color:white; margin-top:10px;margin-left:10px; margin-right:10px;  border-radius:8px;height: fit-content;list-style: none; display: flex;justify-content: space-evenly; align-items: center; text-align: center; box-shadow: rgba(58, 58, 62, 0.23) 0px 7px 29px 0px;">
    
          <input type="checkbox" onchange="toggleTask(this, ${data.id})" ${
      isChecked ? "checked" : ""
    } style="height:15px; width:15px; cursor:pointer;">
        <li style="width:50%; ${
          isChecked ? "text-decoration: line-through; color: gray;" : ""
        }">${data.name}</li>
        <li style="  display: flex; justify-content: space-evenly; align-items: center; ">
         <i class="fa-regular fa-pen-to-square" onclick="editfinancetask(${
           data.id
         })" style=" font-size: 18px; color:green;" ></i>
         <i class="fa-solid fa-trash-can" onclick="deletefinancetask(${
           data.id
         })" style="margin-left: 10px; font-size: 18px; color:red;"></i>
        
      
        </li>
      </ul>
      `;
  });

  table_data2.innerHTML = element; // Update the table body with the data
  updatefinancetask();
}
writefinancedata();

function addfinance() {
  // alert("hi")
  let name = document.getElementById("financename").value;

  // Check if name is provided
  if (name) {
    // Retrieve existing data from localStorage
    let finance_name = JSON.parse(localStorage.getItem("finance_name")) || [];

    // Create new data object
    const new_data = {
      id: finance_name.length + 1,
      name: name,
    };

    // Push new data to the array
    finance_name.push(new_data);

    // Save updated data back to localStorage
    localStorage.setItem("finance_name", JSON.stringify(finance_name));

    // Reload the table data
    document.getElementById("financename").value = "";
    writefinancedata();
  } else {
    alert("After Fill The Input Box Click The + Button.");
  }
}

function editfinancetask(id) {
  // Hide the "add" form
  // alert("ho")
  document.querySelector(".createfinance").style.display = "none";

  // Show the "edit" form
  document.querySelector(".editfinance").style.display = "block";

  // Retrieve data from localStorage
  let finance_name = JSON.parse(localStorage.getItem("finance_name"));

  // Find the data to edit
  let dataToEdit = finance_name.find((item) => item.id === id);

  // Populate the "edit" form field with the data
  document.getElementById("editfinanceName").value = dataToEdit.name;

  // Store the id of the item being edited globally
  window.editId = id;
}

function updatefinance() {
  let name = document.getElementById("editfinanceName").value;

  // Check if name is provided
  if (name && window.editId !== undefined) {
    // Retrieve data from localStorage
    let finance_name = JSON.parse(localStorage.getItem("finance_name"));

    // Find the index of the data being edited
    let dataIndex = finance_name.findIndex((item) => item.id === window.editId);

    // Update the data
    finance_name[dataIndex].name = name;

    // Save the updated data back to localStorage
    localStorage.setItem("finance_name", JSON.stringify(finance_name));
    // document.getElementById("editfinanceName").value=""
    // Hide the edit form and show the add form again
    document.querySelector(".editfinance").style.display = "none";
    document.querySelector(".createfinance").style.display = "block";

    // Reload the table data
    document.getElementById("financename").value = "";

    writefinancedata();
  } else {
    alert("Please fill in the name field.");
  }
}

function deletefinancetask(id) {
  // Retrieve data from localStorage
  let finance_name = JSON.parse(localStorage.getItem("finance_name"));

  // Filter out the data to delete
  finance_name = finance_name.filter((item) => item.id !== id);

  // Save the updated data back to localStorage
  localStorage.setItem("finance_name", JSON.stringify(finance_name));
  const cmpsound=document.getElementById("cmp-sound")
  cmpsound.play();
  setTimeout(()=>{
     cmpsound.pause();
     cmpsound.currentTime =0;

  },1000)
  // Reload the table data
  writefinancedata();
  // updatetask();
}
function updatefinancetask() {
  const count = JSON.parse(localStorage.getItem("finance_name")) || [];
  // alert(count.length)
  const res = count.length;
  document.getElementById("counterfinance").innerHTML = `${res} Task`;
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
