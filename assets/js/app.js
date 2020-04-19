function appendChat(text) {
    var chat = document.getElementById("chat-box");
    var ele = document.createElement("div");
    ele.setAttribute("class", "chat-text");
    ele.textContent = "Player 1: " + text;
    chat.appendChild(ele);
}