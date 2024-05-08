document.getElementById("login-submit-button").addEventListener("click", checkLoginInfo)
var loginForm = document.forms["login-form"]

function checkLoginInfo()
{
    if (loginForm["uname"].value == "MrMan")
    {
        const data = { username: "example" };
        postJSON(data, "data.json")
    }
    if (loginForm["uname"].value == "blerp")
    {
        
        const data = fetchJSON("data.json")
        console.log(data)
    }
}