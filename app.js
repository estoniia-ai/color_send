const canvas = document.getElementById('colorWheel');
const ctx = canvas.getContext('2d');
const image = new Image();
image.crossOrigin = "anonymous";  // Important!
image.onload = function() {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
};

image.src = 'color_wheel.png';  // Use a color wheel image

canvas.addEventListener('click', function(event) {
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

    // Send the color choice to the backend
    // Update the frontend based on the response
});

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
