
hljs.highlightElement(document.getElementById("code"))
PopulateProjects()


function PopulateProjects()
{
    projDropdown = document.getElementById("myDropdown");

    if (projDropdown)
    {
        const myRequest = new Request("content/code_blog/");
        var regex = /<td><a href="[^"]*">(?!Parent Directory)/g
        fetch(myRequest).then((response) => response.text()).then((text) => 
        {
            var array = new Array(0)
            var match
            while ((match = regex.exec(text)) != null) {
                array.push(match[0])
            }
            for (var i = 0; i < array.length; i++)
            {
                var x = array[i].slice(13, array[i].length - 2)
                var d = document.createElement("a");
                d.type = "button";
                d.addEventListener('click', function(){
                    PopulateFileManager(this.text);
                });
                
                d.text = x
                projDropdown.appendChild(d);
            }
        });
        
    } else
    {
        fileManager.innerHTML = "I'm sorry, this file could not be located.";
        throw new Error("ERROR: code container not found");
    }
}

function PopulateFileManager(projectName)
{
    fileman = document.getElementById("file-man")
    document.getElementById("drop-button").textContent = projectName
    var a = document.getElementById("download-link")
    var string = "downloads/" + projectName.substring(0, projectName.length - 1) + ".zip";
    a.setAttribute("href", string)
    while (fileman.firstChild)
    {
        fileman.removeChild(fileman.lastChild);
    }

    if (fileman)
    {
        console.log("content/code_blog/" + projectName)
        const myRequest = new Request("content/code_blog/" + projectName)
        var regex = /<td><a href="[^"]*">(?!Parent Directory)/g
        fetch(myRequest).then((response) => response.text()).then((text) => 
        {
            var array = new Array(0)
            var match
            while ((match = regex.exec(text)) != null) {
                array.push(match[0])
            }
            for (var i = 0; i < array.length; i++)
            {
                var x = array[i].slice(13, array[i].length - 2)
                var d = document.createElement("button");
                d.addEventListener('click', function()
                {
                    LoadCodeFromFilepath("content/code_blog/" + projectName + this.textContent)
                })
                d.setAttribute("class", "file-man-content")
                d.textContent = x
                fileman.appendChild(d);
            }
        });
        
    } else
    {
        fileManager.innerHTML = "I'm sorry, this file could not be located.";
        throw new Error("ERROR: code container not found");
    }
}

function LoadCodeFromFilepath(filepath)
{
    codeCont = document.getElementById("code");
    if (codeCont.dataset.highlighted) 
    {
        codeCont.removeAttribute("data-highlighted")
        codeCont.removeAttribute("class")
    }
    if (codeCont)
    {
        const myRequest = new Request(filepath);
        fetch(myRequest).then((response) => response.text()).then((text) => 
            {
                var x = text.replaceAll("<", "&lt;")
                codeCont.innerHTML = x;
                hljs.highlightElement(codeCont);
            }
        );
    } else
    {
        codeCont.innerHTML = "I'm sorry, this file could not be located.";
        throw new Error("ERROR: code container not found");
    }
}

function ProjectsDropdown() 
{
    document.getElementById("myDropdown").classList.toggle("show");
}
  
// Closes the dropdown when clicked off
window.onclick = function(event) 
{
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) 
        {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) 
            {
                openDropdown.classList.remove('show');
            }
        }
    }
}


