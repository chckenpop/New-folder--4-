document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.querySelector('.chat-input input');
    const sendChatBtn = document.querySelector('.chat-input button');
    const chatbox = document.querySelector(".chatbox");
    const zenBtn = document.getElementById('zen-btn');
    const stopwatch = document.getElementById('timer');
    const API_KEY = 'YOUR_API_KEY';

    stopwatch.style.display = 'none';

    const createChatLi = (message, className) => {
        const chatLi = document.createElement("li");
        chatLi.classList.add("chat", className);
        chatLi.innerHTML = `<p>${message}</p>`;
        return chatLi;
    }

    const generateResponse = (incomingChatLi) => {
        const API_URL = "https://api.openai.com/v1/chat/completions";
        const messageElement = incomingChatLi.querySelector("p");

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                "model": "gpt-4",
                "messages": [
                    {
                        role: "user",
                        content: userMessage
                    }
                ]
            })
        };

        fetch(API_URL, requestOptions)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then(data => {
                messageElement.textContent = data.choices[0].message.content;
            })
            .catch(error => {
                console.error("Error:", error);
                messageElement.classList.add("error");
                messageElement.textContent = "Oops! Something went wrong. Please try again!";
            })
            .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
    };

    const handleChat = () => {
        const userMessage = chatInput.value.trim();
        if (!userMessage) {
            return;
        }
        chatbox.appendChild(createChatLi(userMessage, "chat-outgoing"));
        chatInput.value = '';
        chatbox.scrollTo(0, chatbox.scrollHeight);

        setTimeout(() => {
            const incomingChatLi = createChatLi("Thinking...", "chat-incoming");
            chatbox.appendChild(incomingChatLi);
            chatbox.scrollTo(0, chatbox.scrollHeight);
            generateResponse(incomingChatLi);
        }, 600);
    }

    sendChatBtn.addEventListener("click", handleChat);

    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            handleChat();
        }
    });

    let timerInterval;
    let startTime = 0;
    let elapsedTime = 0;

    const formatTime = (milliseconds) => {
        const seconds = Math.floor(milliseconds / 1000) % 60;
        const minutes = Math.floor(milliseconds / 60000) % 60;
        const hours = Math.floor(milliseconds / 3600000);
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const updateStopwatch = () => {
        elapsedTime = Date.now() - startTime;
        stopwatch.textContent = formatTime(elapsedTime);
    };

    const startStopwatch = () => {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateStopwatch, 1000);
    };

    const stopStopwatch = () => {
        clearInterval(timerInterval);
    };

    const resetStopwatch = () => {
        clearInterval(timerInterval);
        elapsedTime = 0;
        stopwatch.textContent = '00:00:00';
    };

    zenBtn.addEventListener('click', () => {
        if (stopwatch.style.display === 'none') {
            stopwatch.style.display = 'block';
            resetStopwatch();
            startStopwatch();
        } else {
            stopwatch.style.display = 'none';
            stopStopwatch();
        }
    });
});
