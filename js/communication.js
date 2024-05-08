async function postJSON(data, filename) 
{
    try {
        const response = await fetch("data/" + filename, {
        method: "POST", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("Success:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}

async function fetchJSON(filename) 
{
    var data;
    const myRequest = new Request("data/" + filename);
    fetch(myRequest).then((response) => response.text()).then((text) => 
    {
        data = text;
    });
    return data;
}