console.log("Linked: google.js");

// signin
function onSignIn(googleUser) {
    console.log('User signed in.');
    
    // console massages
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    
    document.getElementById('status').innerHTML = 'Thanks for logging in, ' + profile.getName() + '!';

    // creating user profile for DOM
    let profileBody = document.getElementById('profile-body');
    let contentDiv = document.createElement('div');
    contentDiv.id = "GcontentDiv";
    contentDiv.className = "contentDiv";
    html = `
    <div class="card my-3 p-2">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${profile.getImageUrl()}" class="img-fluid rounded-start g-image" alt="" id="g-image">
            </div>
            <div class="col-md-8">
                <div class="card-body text-left mt-4 p-1">
                    <p class="card-title" id="g-name"><b>Name :</b> ${profile.getName()}</p>
                    <p class="card-text" id="g-email"><b>Email :</b> ${profile.getEmail()}</p>
                    <p class="card-text"><small class="text-muted" id="g-id"><b>Google ID :</b> ${profile.getId()}</small></p>
                </div>
            </div>
        </div>
    </div>
    `;
    contentDiv.innerHTML = html;
    profileBody.appendChild(contentDiv);

    // creating signout btn and appending it in the navbar
    let navbar = document.getElementById('navbar');
    let navlink = document.createElement('li');
    navlink.id = "g-signoutbtn";
    navlink.className = "nav-item";
    linkContent = `<a class="nav-link" href="index.html" onclick="signOut();">Google | Sign out</a>`;
    navlink.innerHTML = linkContent;
    navbar.appendChild(navlink);
    
    // hidding signin btn
    let Gsigninbtn = document.getElementById('g-signinbtn');
    Gsigninbtn.style.display = "none";
}

// signout
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        
        // removing user profile from DOM
        let contentDiv = document.getElementById('GcontentDiv');
        contentDiv.remove();
        
        // removing signout btn
        let Gsignoutbtn = document.getElementById('g-signoutbtn');
        Gsignoutbtn.remove();

        // showing signin btn
        let Gsigninbtn = document.getElementById('g-signinbtn');
        Gsigninbtn.style.display = "flex";
    });
}