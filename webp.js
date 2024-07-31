function convertToWebP() {
    const input = document.getElementById('imageInput');
    const webpImage = document.getElementById('webpImage');
    const downloadButton = document.getElementById('downloadButton');
    const spinner = document.getElementById('spinner');
    const hideDiv = document.getElementById('hide');
    const fileSizeInfo = document.getElementById('fileSizeInfo');

    // Check if a file is selected
    if (input.files.length > 0) {
        const file = input.files[0];

        // Get the size of the original file
        const originalFileSize = file.size;

        // Convert the image to WebP
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const img = new Image();

        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0, img.width, img.height);

            // Convert to WebP with compression quality 0.9
            const webpDataURL = canvas.toDataURL('image/webp', 0.9);
            webpImage.src = webpDataURL;

            // Display download button
            downloadButton.style.display = 'block';

            // Display the "hide" div
            hideDiv.style.display = 'block';

            // Calculate and display the percentage reduction in file size
            const webpFileSize = webpDataURL.length;
            const reductionPercentage = ((originalFileSize - webpFileSize) / originalFileSize) * 100;
            fileSizeInfo.innerHTML = `File size reduced by ${reductionPercentage.toFixed(2)}%`;
        };

        img.src = URL.createObjectURL(file);
    } else {
        alert('Please select an image file.');
    }
}

function downloadWebP() {
    const webpImage = document.getElementById('webpImage');
    const link = document.createElement('a');
    link.href = webpImage.src;
    
    // Get the original file name without extension
    const input = document.getElementById('imageInput');
    const originalFileName = input.files[0].name.replace(/\.[^/.]+$/, "");
    
    link.download = `${originalFileName}.webp`;
    link.click();
}