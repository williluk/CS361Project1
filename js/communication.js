async function postJSON(data, filename) 
{
    var data;
    const myRequest = new Request("data/" + filename, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data})
    });
    fetch(myRequest).then((response) => response.text()).then((text) => 
    {
        
    });
<<<<<<< HEAD
=======
    fetch(myRequest).then((response) => response.text()).then((text) => 
    {
        
    });
>>>>>>> parent of 899200e... basic server communication test 3
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
