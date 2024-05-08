
var room = document.getElementById("objects-container");
var roomObject = new Object(room);
roomObject.transform.display()


var minigameScreenOverlay = document.getElementById("mini-game-screen")
document.getElementById("minigame-button").addEventListener("click", showGameScreen)
document.getElementById("close-game-screen-button").addEventListener("click", hideGameScreen)


var map = new RoomMap()
map.loadMap()

window.addEventListener(
    "keydown",
    (event) => {
        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }

        switch (event.key) {
            case "ArrowDown":
                roomObject.info()
                roomObject.transform.translate(0, -10);
                break;
            case "ArrowUp":
                roomObject.info()
                roomObject.transform.translate(0, 10);
                break;
            case "ArrowLeft":
                roomObject.info()
                roomObject.transform.translate(-10, 0);
                break;
            case "ArrowRight":
                roomObject.info()
                roomObject.transform.translate(10, 0);
                break;
            default:
                return; // Quit when this doesn't handle the key event.
        }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
    },
    true,
);
  
function showGameScreen()
{
    minigameScreenOverlay.classList.remove("hidden");
}

function hideGameScreen()
{
    minigameScreenOverlay.classList.add("hidden"); 
}