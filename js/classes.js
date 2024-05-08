class Object
{
    constructor(div)
    {
        this.div = div;
        this.transform = new Transform(500, 500, div)
    }

    info()
    {
        console.log(this.div)
        console.log(this.transform)
    }
}

class Transform
{
    constructor(x, y, div)
    {
        this.pos = new Vector2(x, y)
        this.r = 0
        this.div = div
        
    }
    display()
    {
        this.div.style.left = Math.floor(this.pos.x.toString()) + "px"
        this.div.style.bottom = Math.floor(this.pos.y.toString()) + "px"
        this.div.style.transform = "rotate(" + this.r.toString() + "rad)"
    }

    translate(x, y)
    {
        this.pos.x += x
        this.pos.y += y
        this.display()
    }

    delete()
    {
        this.pos.delete()
        delete this.r
        delete this.div
    }
}

class Vector2
{
    constructor(x, y)
    {
        this.x = x
        this.y = y
    }
    distance(start, end)
    {
        return Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2))
    }
    add(v)
    {
        this.x += v.x
        this.y += v.y
    }
    getSum(v)
    {
        return new Vector2(this.x + v.x, this.y + v.y)
    }
    sub(v)
    {
        this.x -= v.x
        this.y -= v.y
    }
    magnitude()
    {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
    }
    delete()
    {
        delete this.x
        delete this.y
    }
}

class Tile
{
    constructor() 
    {
        // -3, -2, -1 are reserved IDs for a void tile, floor tile, and non-origin tile respectively
        this.objID = -3; 
    }

    getContents()
    {
        return contents;
    }

    setContents(value)
    {
        this.contents = value;
    }
}

class RoomHandler
{

}

class RoomMap
{
    constructor()
    {
        this.tiles = new Array(0);
    }

    // loadMap()
    // {
    //     //load map from JSON
    //     const myRequest = new Request("data.json");
    //     fetch(myRequest).then((response) => response.json())
    //         .then((json) => console.log(json));
    // }
}

class Item
{
    constructor()
    {

    }
}