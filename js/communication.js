async function postJSON(data, filename) 
{
    var data;
    const myRequest = new Request("data/" + filename, {method : "POST", body: JSON.stringify(data)});
    fetch(myRequest).then((response) => response.text()).then((text) => 
    {
        
    });
}

async function fetchJSON(filename) 
{
    var data;
    const myRequest = new Request("data/" + filename);
    fetch(myRequest).then((response) => response.text()).then((text) => 
    {
        data = text
        console.log(data)
    });
    return data
}
