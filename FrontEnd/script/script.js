//const socket = io("http://localhost:3000");

//server_url = "https://group-chatbox-kunal.onrender.com/";
server_url = "https://group-chatbox-kunal.onrender.com/";

//adding server address
const socket = io(server_url);

const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

const u_name = prompt("What is your name?") || "New User";
appendMessage({ new_user: "You", user_message: "Joined" });
socket.emit("new-user", u_name);

socket.on("chat-message", (data) => {
  appendMessage({ new_user: data.name, user_message: data.message });
});

socket.on("user-connected", (name) => {
  appendMessage({ new_user: name, user_message: "Joined" });
});

socket.on("user-disconnected", (name) => {
  appendMessage({ new_user: name, user_message: "Disconnected" });
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage({ new_user: "You", user_message: message });
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});

function appendMessage(message) {
  let username = message.new_user;
  let user_message = message.user_message;
  const messageElement = document.createElement("div");

  //console.log(message.new_user);
  if (message.new_user == "You") {
    messageElement.className = "bd-example bg-dark align-items-center d-flex";
  } else {
    messageElement.className =
      "bd-example bg-dark align-items-center d-flex justify-content-end";
  }

  messageElement.innerHTML =
    "<div class='toast fade show my-3'>" +
    "<div class='toast-header'>" +
    // "<svg class='bd-placeholder-img rounded me-2' width='20' height='20' xmlns='http://www.w3.org/2000/svg'" +
    // "aria-hidden='true' preserveAspectRatio='xMidYMid slice' focusable='false'>" +
    // "<rect width=100% height=100% fill=#007aff></rect> </svg>" +
    "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='me-2 bi bi-person-circle' viewBox='0 0 16 16'>" +
    "<path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z'/>" +
    "<path fill-rule='evenodd' d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'/>" +
    "</svg>  " +
    "<strong class='me-auto'> " +
    username +
    "</strong>" +
    "</div> <div class='toast-body'>" +
    user_message +
    "</div>" +
    "</div>" +
    "</div>";

  messageContainer.append(messageElement);
}
