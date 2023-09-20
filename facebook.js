console.log("Linked: facebook.js");

function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
    console.log('statusChangeCallback');
    console.log(response);                   // The current login status of the person.
    if (response.status === 'connected') {   // Logged into your webpage and Facebook.
        testAPI();
    } 
    else {                                 // Not logged into your webpage or we are unable to tell.
        document.getElementById('status').innerHTML = 'Please log ' + 'into this webpage.';
    }
}

function checkLoginState() {               // Called when a person is finished with the Login Button.
    FB.getLoginStatus(function (response) {   // See the onlogin handler
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function () {
    FB.init({
        appId: '550162146188464',
        cookie: true,                     // Enable cookies to allow the server to access the session.
        xfbml: true,                     // Parse social plugins on this webpage.
        version: 'v11.0'           // Use this Graph API version for this call.
    });


    FB.getLoginStatus(function (response) {   // Called after the JS SDK has been initialized.
        statusChangeCallback(response);        // Returns the login status.
    });
};

function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function (response) {
        console.log('Successful login for: ' + response.name);
        console.log('Facebook ID: ' + response.id);
        console.log('Email: ' + response.email);
        console.log('Public Profile: ' + response.public_profile);
        document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!';

        // creating user profile for DOM
        let profileBody = document.getElementById('profile-body');
        let contentDiv = document.createElement('div');
        contentDiv.id = "FcontentDiv";
        contentDiv.className = "contentDiv";
        html = `
        <div class="card my-3 p-2">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="https://via.placeholder.com/150" class="img-fluid rounded-start g-image" alt="">
                </div>
                <div class="col-md-8">
                    <div class="card-body text-left mt-4 p-1">
                        <p class="card-title" id="g-name"><b>Name :</b> ${response.name}</p>
                        <p class="card-text" id="g-email"><b>Email :</b> ${(response.name.toLowerCase()).replace(/\s+/g, '')}@gmail.com</p>
                        <p class="card-text"><small class="text-muted" id="g-id"><b>Facebook ID :</b> ${response.id}</small></p>
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
        navlink.id = "f-signoutbtn";
        navlink.className = "nav-item";
        linkContent = `<a class="nav-link" href="index.html" onclick="fblogout();">FB | Sign out</a>`;
        navlink.innerHTML = linkContent;
        navbar.appendChild(navlink);

        // hidding signin btn
        let Fsigninbtn = document.getElementById('f-signinbtn');
        Fsigninbtn.style.display = "none";
    });
}

function fblogout() {
    FB.logout(function(response) {
        // user is now logged out
        console.log('Facebook logged out for: ' + response.name);
        window.location.href = "index.html";

        // removing user profile from DOM
        let contentDiv = document.getElementById('FcontentDiv');
        contentDiv.remove();
        
        // removing signout btn
        let Fsignoutbtn = document.getElementById('f-signoutbtn');
        Fsignoutbtn.remove();

        // showing signin btn
        let Fsigninbtn = document.getElementById('f-signinbtn');
        Fsigninbtn.style.display = "flex";
    });
}