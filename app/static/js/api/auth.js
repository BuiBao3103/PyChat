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
            createToast('error', data.message);
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

    createToast('success', 'Thông báo okela');
})