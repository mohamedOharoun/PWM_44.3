let running = false;

const stopDragAndDrop = () => {
    running = false;
};

const initializeDragAndDrop = () => {
    running = true;
    dropArea = document.getElementById('upload-photo-container');
    uploadedImg = document.getElementById('uploaded-img');
    dropArea.addEventListener('dragover', (event) => {
        if (!running) return;
        event.preventDefault();
        dropArea.classList.add('dragover');
    });

    dropArea.addEventListener('dragleave', () => {
        if (!running) return;
        dropArea.classList.remove('dragover');
    });

    dropArea.addEventListener('drop', (event) => {
        if (!running) return;
        event.preventDefault();
        dropArea.classList.remove('dragover');

        const files = event.dataTransfer.files;
        if (files.length > 0) {
            handleFiles(files);
        }
    });
};

let dropArea = document.getElementById('upload-photo-container');
let uploadedImg = document.getElementById('uploaded-img');

const handleFiles = (files) => {
    if (!running) return;
    const file = files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            uploadedImg.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
};