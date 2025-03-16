export const loadTemplate = (file, id) => {
    return new Promise((resolve) => {
        fetch(file).then(res => res.text()).then(text => {
            document.getElementById(id).innerHTML = text;
            resolve();
        });
    });
};