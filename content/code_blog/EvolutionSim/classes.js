const DELTA_TIME = 33
const CREATURE_MOVE_SPEED = 0.1
const CREATURE_ROT_SPEED = 0.005
const COLLISION_DETECT_RANGE = 30

// these are all effectivly constants within this script but they can be altered though user input
var NEURAL_COLS = [3, 3, 3, 2] // i = 0 and i = length are input/output layers
var RAYCAST_SIGHT_RANGE = 100   // sight range for the creatures 
var RAYCAST_ROTATION_SIZE = 5   // field of view for the creatures
var AREA_WIDTH = 2000           // width and height of the play area
var AREA_HEIGHT = 2000          //
var LEARNING_FACTOR = 0.1       // this influences the amount of random differences between parents and their children
var CREATURE_LIFESPAN = 100     // creature lifespan


// very simple function attached to the lifespan user-input slider
function updateConstants(lf)
{
    LEARNING_FACTOR = lf
}

// Populates an array with 100x100 grid sections of the play area.
var playAreaGrid = []
for (var i = 0; i < AREA_WIDTH/100; i++)
{
    playAreaGrid[i] = []
    for (var j = 0; j < AREA_HEIGHT/100; j++)
    {
        playAreaGrid[i][j] = []
    }
}

// list containing all of the food objects
var orderedFoodList = new Array(0)

/*----------------------------------------------------------------------------------------------
* Object
*       This class is the parent class for any div generated by the script. It automatically 
*       constructs an assosiated Transform class and add this object to the array of all objects
*       declared in update.js
*-----------------------------------------------------------------------------------------------
*/
class Object 
{
    /*
    *   creates the div, adds to the document, constructs the Transform, and adds to the allObjects[]
    */
    constructor(divHolder)
    {
        var div = document.createElement('div')
        divHolder.appendChild(div)
        this.div = div
        this.transform = new Transform(10, 10, this.div)
        allObjects.push(this);
    }
    /*
    *   Used by children to delete the instance of an Object. 
    *   This is important to increase efficiency, even though JS
    *   automatically deletes instances of classes. 
    */
    superDelete()
    {
        for (var i = 0; i < allObjects.length; i++)
        {
            if (allObjects[i] == this) allObjects.splice(i, 1)
        }
        this.div.remove()
        delete this.div
        this.transform.delete()
    }
}

/*----------------------------------------------------------------------------------------------
* Creature
*       This class is a child of the Object class that governs the movements and behavior of the
*       creatures. It is a child of the Object class, and updates the Object's position continously
*       through the update() function
*-----------------------------------------------------------------------------------------------
*/
class Creature extends Object
{
    constructor(divHolder, parentNet)
    {
        super(divHolder)
        this.div.classList.add("creature")
        this.div.innerHTML = "*"
        //constructs children vs parentless spawn 
        if (parentNet) 
        {
            this.net = new NeuralNet(parentNet)
        }
        else this.net = new NeuralNet()

        this.outputArr = [0, 0]     // [move speed, rotation change, ]
        this.inputArr = [0, 0, 0]   // these come from the three visual raycasts
        this.energy = CREATURE_LIFESPAN - 1
        this.lifetime = 0
    } 
    /*----------------------------------------------------------------------------------------------
    * update()
    *       This function is run every frame. It deligates the nueral network call, creature movement, 
    *       and collision checks with the boundry or food. 
    *-----------------------------------------------------------------------------------------------
    */ 
    update()
    {
        this.lifetime++
        if (this.lifetime > longestLife) bestInShow = this.net

        // Neural network call and performance check
        // uses the inputArr from last frame.
        const sTime = window.performance.now()
        this.cascade(this.inputArr)
        const eTime = window.performance.now()

        // Moves the Object parent according to outputArr
        this.transform.move(this.outputArr[0] * CREATURE_MOVE_SPEED, (this.outputArr[1] - 0.5) * CREATURE_ROT_SPEED)

        // boundry and food collision checks
        this.outOfBounds()
        this.checkCollision()

        // Spawns child if there is excess energy 
        if (this.energy == CREATURE_LIFESPAN)
        {
            var obj = new Creature(creatureDivHolder, this.net)
            obj.transform.setPosition(this.transform.pos.x, this.transform.pos.y)
            
        }
        
        // energy and death
        this.energy--
        if (this.energy <= 0) 
        {
            this.delete()
        }

        // returns some data for stats
        return ((eTime - sTime) * 1000000)
    } 
    /*----------------------------------------------------------------------------------------------
    * cascade()
    *       This function caclculates the neural network cascade from start to finish. It does this
    *       pretty simply by multiplying the new section of the matrix by each new vector as they get
    *       calculated. For the purpose of speed, the loop flattens the matrix and effectivly duplicates
    *       the vector and behaves as though it is multiplying two arrays of equal length.   
    *-----------------------------------------------------------------------------------------------
    */ 
    cascade(newActivations)
    {
        for (var i = 1; i < NEURAL_COLS.length; i++)
        {
            newActivations = multMatrixByVector(flattenMatrix(this.net.cols[i]), newActivations, NEURAL_COLS[i])
        }
        this.outputArr = newActivations
    }
    outputs()
    {
        for (var i = 0; i < this.outputArr.length; i++)
        {
            console.log(this.outputArr[i])
        }
    }
    checkCollision()
    {
        var gridLoc = playAreaGrid[Math.floor(this.transform.pos.x/100)][Math.floor(this.transform.pos.y/100)]
        var rayCasts = new Array(NEURAL_COLS[0])
        var firstRot = this.transform.r - Math.floor(NEURAL_COLS[0]/2) * RAYCAST_ROTATION_SIZE
        for (var i = 0; i < NEURAL_COLS[0]; i++)
        {
            rayCasts[i] = { a:this.transform.pos, b:this.transform.pos.getSum(new Vector2(
                RAYCAST_SIGHT_RANGE * Math.cos(firstRot + (RAYCAST_ROTATION_SIZE * i)), 
                RAYCAST_SIGHT_RANGE * Math.sin(firstRot + (RAYCAST_ROTATION_SIZE * i)))) }
            
        }
        for (var i = 0; i < gridLoc.length; i++)
        {
            for (var j = 0; j < NEURAL_COLS[0]; j++)
            {
                this.inputArr[j] = gridLoc[i].collider.checkRayCollision(rayCasts[j])
                
            }
            var foodObj = gridLoc[i].collider.checkObjCollision(this.transform.pos)
            if (foodObj)
            {
                if (this.energy < 80) this.energy = 100
                foodObj.delete()
            }
            
        }
    }
    outOfBounds()
    {
        if (this.transform.pos.x > AREA_WIDTH) this.transform.pos.x = 10
        if (this.transform.pos.x < 0) this.transform.pos.x = AREA_WIDTH - 10
        if (this.transform.pos.y > AREA_HEIGHT) this.transform.pos.y = 10
        if (this.transform.pos.y < 0) this.transform.pos.y = AREA_HEIGHT - 10   
    }
    delete()
    {
        this.superDelete()
        delete this.energy
        delete this.outputArr
        delete this.inputArr
        this.net.delete()
    }
}
class Food extends Object
{
    constructor(divHolder)
    {
        super(divHolder)
        this.div.classList.add("food")
        this.transform.randPosition()
        this.pos = this.transform.pos
        this.collider = new Collider(this.transform, 10, 10, this)
        this.addToGrid()
        
    }
    update()
    {

    }
    addToGrid()
    {
        playAreaGrid[Math.floor(this.pos.x/100)][Math.floor(this.pos.y/100)].push(this)
    }
    delete()
    {
        var g = playAreaGrid[Math.floor(this.pos.x/100)][Math.floor(this.pos.y/100)]
        for (var i = 0; i < g.length; i++)
        {
            if (g[i] == this) g.splice(i, 1)
        }
        this.superDelete()
        this.collider.delete()
    }
}

class Transform {
    constructor(x, y, div)
    {
        this.pos = new Vector2(x, y)
        this.r = 0
        this.div = div
        
    }
    display()
    {
        this.div.style.left = Math.floor(this.pos.x.toString()) + "px"
        this.div.style.top = Math.floor(this.pos.y.toString()) + "px"
        this.div.style.transform = "rotate(" + this.r.toString() + "rad)"
    }
    move(speed, rotV)
    {
        this.pos.add(new Vector2(speed * Math.cos(this.r) * DELTA_TIME, speed * Math.sin(this.r) * DELTA_TIME))
        this.r += rotV  * DELTA_TIME
        this.r = this.r % (2 * Math.PI)  
        this.display()
    }
    setPosition(x, y)
    {
        this.pos.x = x
        this.pos.y = y
    }
    randPosition()
    {
        this.pos.x = Math.random() * AREA_WIDTH
        this.pos.y = Math.random() * AREA_HEIGHT

        this.display()
    }
    delete()
    {
        this.pos.delete()
        delete this.r
        delete this.div
    }
}

class Collider
{
    constructor(transform, w, h, foodRef)
    { 
        this.foodRef = foodRef
        this.transform = transform
        this.w = w
        this.h = h
        this.boundingBox = this.generateBoundingBox()
    }
    update()
    {
        
    }
    generateBoundingBox()
    {
        var out = 
        {
            l1: {
                a : this.transform.pos.getSum(new Vector2(this.w/2, this.h/2)), 
                b : this.transform.pos.getSum(new Vector2(-this.w/2, -this.h/2))    
            },
            l2: {
                a : this.transform.pos.getSum(new Vector2(this.w/2, -this.h/2)), 
                b : this.transform.pos.getSum(new Vector2(-this.w/2, this.h/2))   
            } 
        }
        return out
    }
    checkRayCollision(ray)
    {
        return Vector2.prototype.doesIntersect(ray, this.boundingBox.l1) || Vector2.prototype.doesIntersect(ray, this.boundingBox.l2)
    }
    checkObjCollision(objPos)
    {
        if (Vector2.prototype.distance(this.transform.pos, objPos) < COLLISION_DETECT_RANGE) return this.foodRef
    }
    delete()
    {
        delete this.foodRef
        delete this.transform
        delete this.w
        delete this.h
        delete this.boundingBox
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
    doesIntersect(line1, line2)
    {
        /* This is a slight bit hard to think about but bascially listedccw returns true if its params are listed in a counter-clockwise
         *  direction, and false if not. If two line segments are intersection and you connected the points with an arc, you would have to 
         *  connect a -> d -> b in the opposite direction as a -> c -> b
         */
        //acd - bcd - abc - abd
        return Vector2.prototype.listedccw(line1.a,line2.a,line2.b) != Vector2.prototype.listedccw(line1.b,line2.a,line2.b) 
            && Vector2.prototype.listedccw(line1.a,line1.b,line2.a) != Vector2.prototype.listedccw(line1.a,line1.b,line2.b)
    }
    listedccw(a,b,c)
    {
        return (c.y-a.y)*(b.x-a.x) > (b.y-a.y)*(c.x-a.x)
    }
    delete()
    {
        delete this.x
        delete this.y
    }
}

class NeuralNet
{
    constructor(parent)
    {
        this.cols = new Array(NEURAL_COLS.length)
        if (parent)
        {
            
            for (var i = 1; i < NEURAL_COLS.length; i++)
            {
                this.cols[i] = new Array(NEURAL_COLS[i]);
                for (var j = 0; j < NEURAL_COLS[i]; j++)
                {
                    
                    this.cols[i][j] = new Array(NEURAL_COLS[i-1])
                    for (var k = 0; k < NEURAL_COLS[i-1]; k++)
                    {
                        this.cols[i][j][k] = parent.cols[i][j][k] + ((Math.random() * 2 - 1) * LEARNING_FACTOR)
                        
                    }
                      
                }
            }
        } else
        {
            for (var i = 1; i < NEURAL_COLS.length; i++)
            {
                this.cols[i] = new Array(NEURAL_COLS[i]);
                for (var j = 0; j < NEURAL_COLS[i]; j++)
                {
                    
                    this.cols[i][j] = new Array(NEURAL_COLS[i-1])
                    for (var k = 0; k < NEURAL_COLS[i-1]; k++)
                    {
                        // if (bestInShow) this.cols[i][j][k] = bestInShow.cols[i][j][k]
                        // else this.cols[i][j][k] = (Math.random() * 2) - 1
                        this.cols[i][j][k] = (Math.random() * 2) - 1
                        //console.log("At Col " + i + ", Node " + j + " Connection " + k + ": " + this.cols[i][j][k]) 
                    }
                      
                }
            }
        }
    }
    delete()
    {
        delete this.cols
    }
}