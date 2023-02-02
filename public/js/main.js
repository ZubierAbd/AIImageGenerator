function onSubmit(e) {
    e.preventDefault();
    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;

    if (prompt === '') {
        alert('please enter something')
        return;
    }
    generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
    try {
        showSpinner();
        document.querySelector('.msg').textContent = ''
        document.querySelector('#image').src = ''
        const response = await fetch('/openai/generateimage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "prompt": prompt, "size": size
            })
        })

        if (!response.ok) {
            hideSpinner()
            throw new Error('That image couldnt be generated')
        }
        const data = await response.json();

        const imageUrl = data.data;

        document.querySelector('#image').src = imageUrl;
        hideSpinner();

    } catch (error) {
        console.log(error)
        document.querySelector('.msg').textContent = error
    }
}

function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('#image-form').addEventListener('submit', onSubmit)