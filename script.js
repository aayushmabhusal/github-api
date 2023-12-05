document.addEventListener('DOMContentLoaded', function () {
    const username = 'aayushmabhusal';
    const apiUrl = `https://api.github.com/users/${username}`;
    const reposUrl = `https://api.github.com/users/${username}/repos`;
  
    fetch(apiUrl)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const name = document.getElementById('name');
            const login = document.getElementById('login');
            const location = document.getElementById('location');
            const anchorTag = document.getElementById('url');
            const pp = document.getElementById('pp');
            const followers = document.getElementById('followers');
            const bio = document.getElementById('bio');


            name.textContent = data.name;
            login.textContent = '@' + data.login;
            location.textContent = data.location;
            following.textContent = `Following: ${data.following}`;
            followers.textContent = `Followers: ${data.followers}`;
            bio.textContent = data.bio;

            
  
            anchorTag.setAttribute('href', data.html_url);
            pp.setAttribute('src', data.avatar_url);
        })
        .catch((e) => console.error('Error msg = ', e));
      
  
    fetch(reposUrl)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const allRepo = document.getElementById('allRepo');
            data.map((element) => {
                const tag = document.createElement('div');
                tag.classList.add('repo');
                tag.innerHTML = `
                    <p class="repo_name">${element.name}</p>
                    <div class="language">
                        <p>Made with: </p>
                        <p>${element.language || 'Not specified'}</p>
                    </div>
                    <div class="star">
                        <div class="rate">
                            <a href="#"> <i class='fa fa-star'></i></a>
                            <p class="value">: ${element.stargazers_count}</p>
                        </div>
                        <div class="link">
                            <a href="#"> <i class='fa fa-link'></i></a>
                            <a href="${element.html_url}" target="_blank">view repository</a>
                        </div>
                    </div>
                `;
                allRepo.appendChild(tag);
            });
        })
        .catch((error) => console.error('Error fetching repositories:', error));
  });

  