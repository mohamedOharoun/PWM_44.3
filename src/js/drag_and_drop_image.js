const dropArea = document.getElementById('group-upload-photo-container');
const uploadedImg = document.getElementById('uploaded-img');
const fileElem = document.getElementById('fileElem');

dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.classList.add('dragover');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('dragover');
});

dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    dropArea.classList.remove('dragover');

    const files = event.dataTransfer.files;
    if (files.length > 0) {
        handleFiles(files);
    }
});

function handleFiles(files) {
    const file = files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            uploadedImg.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
}

fileElem.addEventListener('change', (event) => {
    const files = event.target.files;
    if (files.length > 0) {
        handleFiles(files);
    }
});
