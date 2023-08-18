const canvas = document.getElementById('colorWheel');
const ctx = canvas.getContext('2d');
const image = new Image();
image.crossOrigin = "anonymous";  // Important!
image.onload = function() {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
};

image.src = 'color_wheel.png';  // Use a color wheel image

canvas.addEventListener('click', function(event) {
    console.log("Canvas clicked!"); // For debugging purposes
    const x = event.offsetX;
    const y = event.offsetY;
    const pixel = ctx.getImageData(x, y, 1, 1).data;

    // Check if the pixel is white or transparent
    if (pixel[0] === 255 && pixel[1] === 255 && pixel[2] === 255 || pixel[3] === 0) {
        return;  // Ignore white or transparent pixels
    }

    const rgba = `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${pixel[3] / 255})`;
    document.getElementById('chosenColor').innerText = rgba;

    // Draw the indicator on the canvas
    drawIndicator(x, y);

    // Call the selectColor function to send the color choice to the backend
    selectColor(rgba);  // Pass the rgba value to the function
});

function selectColor(rgba) {
    const userId = "some_unique_user_id";  // You'll need a way to identify users uniquely

    console.log("Sending color choice to backend:", rgba);  // Use rgba here

    // Send the color choice to the backend
    fetch('https://9g5mygrkq9.execute-api.eu-north-1.amazonaws.com/live/save-color', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId,
            color: rgba  // Use rgba here
        })
    })
    .then(response => {
        console.log("Response received:", response);  // For debugging purposes
        return response.json();
    })
    .then(data => {
        console.log(data.message);
        // Update the frontend based on the response
        document.getElementById('chosenColor').innerText = rgba;  // Use rgba here

        // Update the background color in real-time
        updateAppBackgroundColor(rgba);
    })
    .catch(error => {
        console.error("Error sending color choice:", error);  // This will log any fetch-related errors
    });
}

function drawIndicator(x, y) {
    // First, redraw the color wheel to clear any previous indicators
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Now, draw the indicator (a small circle) at the clicked coordinates
    const indicatorRadius = 10;  // Adjust as needed
    ctx.beginPath();
    ctx.arc(x, y, indicatorRadius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'black';  // Color of the indicator
    ctx.fill();
}

function updateAppBackgroundColor(color) {
    document.body.style.backgroundColor = color;
}
