let running = false;

const initializeDragAndDrop = () => {
    running = true;
    const dropArea = document.getElementById('upload-photo-container');
    const uploadedImg = document.getElementById('uploaded-img');

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
};

const handleFiles = (files) => {
    if (!running) return;
    const file = files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            let uploadedImg;
            uploadedImg.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
};

const stopDragAndDrop = () => {
    running = false;
};