
document.getElementById("loginForm").addEventListener("submit", function(event) {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    
    if (username === "" || password === "") {
        event.preventDefault(); // Prevent from submission
        alert("Both fields are required!");
    } else {
        //  and redirecting to another page
        window.location.href = "ww.html"; 
    }
});