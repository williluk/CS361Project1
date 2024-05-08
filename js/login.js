document.getElementById("login-submit-button").addEventListener("click", checkLoginInfo)
var loginForm = document.forms["login-form"]

function checkLoginInfo()
{
    if (loginForm["uname"].value == "MrMan")
    {
        var data = { username: "example" };
        postJSON(data, "data.json")
    }
    if (loginForm["uname"].value == "blerp")
    {
        
        var data = fetchJSON("data.json")
        console.log(data)
    }
}