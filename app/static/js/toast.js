let notifications = document.querySelector('.notifications');

function createToast(type, text, title = null, icon = null) {
    let newToast = document.createElement('div');
    switch (type) {
        case 'success':
            title = 'Success';
            icon = 'fa-solid fa-circle-check'
            break
        case 'error':
            title = 'Error';
            icon = 'fa-solid fa-circle-exclamation'
            break
        case 'warning':
            title = 'Warning';
            icon = 'fa-solid fa-triangle-exclamation';
            break
        case 'info':
            title = 'Info';
            icon = 'fa-solid fa-circle-info';
            break

    }
    newToast.innerHTML = `
            <div class="toast ${type}">
                <i class="${icon}"></i>
                <div class="content">
                    <div class="title">${title}</div>
                    <span>${text}</span>
                </div>
                <i class="fa-solid fa-xmark" onclick="(this.parentElement).remove()"></i>
            </div>`;
    notifications.appendChild(newToast);
    newToast.timeOut = setTimeout(
        () => newToast.remove(), 100000
    )
}

// success.onclick = function () {
//     let type = 'success';
//     let icon = 'fa-solid fa-circle-check';
//     let title = 'Success';
//     let text = 'This is a success toast.';
//     createToast(type, icon, title, text);
// }
// error.onclick = function () {
//     let type = 'error';
//     let icon = 'fa-solid fa-circle-exclamation';
//     let title = 'Error';
//     let text = 'This is a error toast.';
//     createToast(type, icon, title, text);
// }
// warning.onclick = function () {
//     let type = 'warning';
//     let icon = 'fa-solid fa-triangle-exclamation';
//     let title = 'Warning';
//     let text = 'This is a warning toast.';
//     createToast(type, icon, title, text);
// }
// info.onclick = function () {
//     let type = 'info';
//     let icon = 'fa-solid fa-circle-info';
//     let title = 'Info';
//     let text = 'This is a info toast.';
//     createToast(type, icon, title, text);
// }