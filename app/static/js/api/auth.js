const btnLogin = document.querySelector('#btnLogin')
const btnLogout = document.querySelector('#btnLogout')
const btnNoti = document.querySelector('#notification')
btnLogin?.addEventListener('click', async () => {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {

            window.location.href = '/';
        } else {
            const data = await response.json();
            console.log(data)
            let type = 'error';
            let icon = 'fa-solid fa-circle-exclamation';
            let title = 'Error';
            let text = data.message
            console.log('abc')
            createToast(type, icon, title, text);
            console.error('Login failed:', response.statusText);
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
})

btnLogout?.addEventListener('click', async () => {
    try {
        const response = await fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {

            window.location.href = '/';
        } else {
            const data = await response.json();
            console.log(data)
            console.error('Logout failed:', response.statusText);
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
})

btnNoti?.addEventListener('click', () => {
    let type = 'success';
    let icon = 'fa-solid fa-circle-check';
    let title = 'Success';
    let text = 'This is a success toast.';
    createToast(type, icon, title, text);
})