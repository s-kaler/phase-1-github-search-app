document.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('#github-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let search = e.target.search.value;
        handleUserSearch(search)
        form.reset();
    })
})

function handleUserSearch(search){
    let userList = document.querySelector('#user-list');
    let repoList = document.querySelector('#repos-list');
    userList.innerHTML = `<p>User List:</p>`;

    fetch(`https://api.github.com/search/users?q=${search}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        }
    })
    .then(res => res.json())
    .then(userData => {
        let userArr = userData.items;
        console.log(userArr);
        console.log(userList);
        for(let i=0; i < userArr.length; i++){
            let newUser = document.createElement('li');
            let img = document.createElement('img');
            img.src = userArr[i]['avatar_url'];
            console.log(i + ' ' + img.src)
            newUser.appendChild(img);
            let username = document.createElement('p')
            username.textContent = userArr[i].login;
            newUser.appendChild(username);
            let link = document.createElement('a');
            link.href = userArr[i]['html_url'];
            link.textContent = 'Profile Link'
            newUser.appendChild(link);
            
            userList.appendChild(newUser);

            username.addEventListener('click', (e) => {
                repoList.innerHTML = `<p>Repos List</p>`
                fetch(`https://api.github.com/users/${userArr[i].login}/repos`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/vnd.github.v3+json'
                    }
                })
                .then(res2 => res2.json())
                .then(repoData => {
                    console.log(repoData)
                    for(let i2=0; i2 < repoData.length; i2++){
                        let newRepo = document.createElement('li');
                        let repoLink = document.createElement('a');
                        repoLink.href = repoData[i2]['html_url'];
                        repoLink.textContent = repoData[i2].name;
                        newRepo.appendChild(repoLink);
                        repoList.appendChild(newRepo);
                    }
                })
                .catch(error => console.log(error))
            })

        }
        
    })
    .catch(error => console.log(error))
}