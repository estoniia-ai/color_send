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
    
    console.log(`Clicked at: ${x}, ${y}`);  // Log the click coordinates
    console.log(`Pixel data: ${pixel}`);    // Log the pixel data

    // Check if the pixel is white or transparent
    if (pixel[0] === 255 && pixel[1] === 255 && pixel[2] === 255 || pixel[3] === 0) {
        console.log("Clicked on white or transparent pixel");  // Log this for clarity
        return;  // Ignore white or transparent pixels
    }

    const rgba = `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${pixel[3] / 255})`;
    
    document.getElementById('chosenColor').innerText = rgba;
    
    // Send the color choice to the backend
    // Update the frontend based on the response
});
