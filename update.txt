


const FOOD_TIMER = 0.1
const RANDOM_CRITTER_TIMER = 0.5

var allObjects = [];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// input sources
// document.getElementById("spawn-button").addEventListener('click', spawnCreature)
// document.getElementById("spawn-food-button").addEventListener('click', spawnFood)
playbackSlider = document.getElementById("playback-slider")
learningSlider = document.getElementById("learning-factor-slider")

// document.getElementById("update-button").addEventListener('click', updateSim)
document.getElementById("close-pop-button").addEventListener('click', closePop)

// outputs
const creatureDivHolder = document.getElementById('creature-holder')
const foodDivHolder = document.getElementById('food-holder')
const totalTimeDisplay = document.getElementById('total-ex-time')
const nnTimeDisplay = document.getElementById('nn-ex-time')
const playbackDisplay = document.getElementById('playback-output')
const learningDisplay = document.getElementById('learning-factor-output')
const popUpDisplay = document.getElementById('popup')

// variables for stats/input interaction
var timescale = 1
var foodTimer = 0
var critterTimer = 0
var lf = 0.1
var nnCols = [3, 3, 3, 2]

// input functions
playbackSlider.oninput = function()
{
    timescale = this.value / 100
    playbackDisplay.innerHTML = timescale
}
learningSlider.oninput = function()
{
    lf = this.value / 100
    learningDisplay.innerHTML = lf
}
function updateSim()
{
    // for (var i = allObjects.length - 1; i >= 0; i--)
    // {
    //     allObjects[i].delete()
    // }
    // get input and place into constants
    updateConstants(lf) 
}
function closePop()
{
    popUpDisplay.classList.add('hidden')
    Update()
}

var bestInShow
var longestLife = 100


var count = 0
var sum = 0

function spawnCreature()
{
    var obj = new Creature(creatureDivHolder)
    obj.transform.randPosition()
}
function spawnFood()
{
    var obj = new Food(foodDivHolder)
}

function Update()
{
    updateSim()
    // spawn new food
    if (foodTimer <= 0)
    {
        foodTimer = FOOD_TIMER * 1000
        spawnFood()
    }
    foodTimer = foodTimer - DELTA_TIME
     // spawn new creature
     if (critterTimer <= 0)
     {
        critterTimer = RANDOM_CRITTER_TIMER * 1000
        spawnCreature()
     }
     critterTimer = critterTimer - DELTA_TIME
    // call update on objects
    const sTime = Date.now()
    for (var i = 0; i < allObjects.length; i++)
    {
        var x = allObjects[i].update()
        if (x)
        {
            sum += x 
            nnTimeDisplay.innerHTML = "Ave Nueral Net Exe Time: " + (sum / count).toString() + " ns"
            count++;
        }
    }
    const eTime = Date.now()
    var t = eTime - sTime
    totalTimeDisplay.innerHTML = "Exe Time: " + (eTime - sTime).toString() + " ms"
    
    //  progress to next frame
    if (t >= DELTA_TIME) t = DELTA_TIME - 1;
    sleep((DELTA_TIME - t) / timescale).then(() => { Update() })
}





