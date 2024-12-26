// Function to open the menu

document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  alert("Right Click Not Allowed");
});
document.onselectstart = (e) => {
  e.preventDefault();
  //    alert("Content Copy Are Not Allowed")
};
document.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.key.toLowerCase() === "u" && e.ctrlKey) {
  }
});
// import {app} from "E:"
document.getElementById("currentYear").textContent = new Date().getFullYear();

function openmenu() {
  document.querySelector(".slider").classList.add("show");
  // sidebar
}

// Function to close the menu
function closemenu() {
  const sidebar = document.querySelector(".slider");
  sidebar.classList.remove("show");
}
function personal() {
  document.querySelector(".overlay-card").classList.add("show-overlay");
  // document.querySelector(".overlay-card").style.display="block"
}
function closepersonal() {
  document.querySelector(".overlay-card").classList.remove("show-overlay");
}

function study() {
  document.querySelector(".study-overlay-card").classList.add("show-overlay");
}

function closestudy() {
  document
    .querySelector(".study-overlay-card")
    .classList.remove("show-overlay");
}
function finance() {
  document.querySelector(".finance-overlay-card").classList.add("show-overlay");
}
function closefinace() {
  document
    .querySelector(".finance-overlay-card")
    .classList.remove("show-overlay");
}
function work() {
  alert("No-Funtonality Add Now");
}
// Signup form event listener
document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const username = document.getElementById("username").value;

    // Retrieve existing users from localStorage
    let todolistuser = JSON.parse(localStorage.getItem("todolistuser")) || [];
    let emailExists = todolistuser.some((user) => user.email === email);

    if (emailExists) {
      alert("This email is already registered. Please use a different email.");
      document.getElementById("signupForm").reset();
    } else {
      // Add the new user to the list
      todolistuser.push({ email, password, username });
      localStorage.setItem("todolistuser", JSON.stringify(todolistuser));
      alert("Signup successful! You can now log in.");
      document.getElementById("signupForm").reset();
    }
  });

// Login form event listener
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Retrieve existing users from localStorage
    let todolistuser = JSON.parse(localStorage.getItem("todolistuser")) || [];
    let loginUser = todolistuser.find(
      (user) => user.email === email && user.password === password
    );

    if (loginUser) {
      // Save logged-in user to localStorage
      localStorage.setItem("loggedInUser", JSON.stringify(loginUser));

      // Update both welcome messages
      updateWelcomeMessage(loginUser.username);
      updateWelcomeMessage2(loginUser.username);

      // Close slider menu
      const sidebar = document.querySelector(".slider");
      sidebar.classList.remove("show");

      alert("Login successful! Welcome!");

      // Reset the login form
      document.getElementById("loginForm").reset();
    } else {
      alert("Invalid email or password.");
      document.getElementById("loginForm").reset();
    }
  });

// Function to update the first welcome message
function updateWelcomeMessage(username) {
  const welcomeMessage = document.getElementById("welcomeMessage");
  welcomeMessage.textContent = `Welcome, ${username}!`;
}

// Function to update the second welcome message
function updateWelcomeMessage2(username) {
  const welcomeMessage2 = document.getElementById("welcomeMessage2");
  welcomeMessage2.textContent = `Welcome, ${username}!`;
}

// Check if a user is already logged in when the page loads
window.addEventListener("load", function () {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (loggedInUser) {
    updateWelcomeMessage(loggedInUser.username);
    updateWelcomeMessage2(loggedInUser.username);
  }
});
