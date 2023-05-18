// create Player class

class Player {
    constructor(){
        this.positionX = 50; // property: horizontal movement in %
        this.positionY = 0; // property: vertical movement in %
        this.width = 20;  // property for object width in %
        this.height = 20;  // property for object height in %

        this.createDomElement(); // reference to createDomElement method below
        
        this.domElement; // to be able to be reached from every scope
   
    }

    //whenever new Player (new instance), then the player object is being created with a method
    createDomElement(){

        this.domElement = document.createElement("div"); // using stored element from constructor

        this.domElement.id = "player";
        this.domElement.style.width = this.width + "vw"; // give element in browser width with .style
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";
        
        //this.domElement.innerText = "This is the player";

        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.domElement);
    }
    

    //method for when player moves left
    moveLeft(){
        this.positionX = this.positionX -= 1;
        this.domElement.style.left = this.positionX + "vw"; //changing css and div/html when moving
    } 

    //method for when player moves right
    moveRight(){
        this.positionX = this.positionX += 1;
        this.domElement.style.left = this.positionX + "vw"; // .left auch hier weil wir uns immer von unten links bewegen
    } 
}

class Obstacle {
    constructor(){
        this.positionX = 50; // property: horizontal movement in %
        this.positionY = 100; // property: vertical movement in %
        this.width = 20;  // property for object width in %
        this.height = 10;  // property for object height in %

        this.domElement;

        this.createDomElement();
   
    }
    createDomElement() {

        this.domElement = document.createElement("div"); // using stored element from constructor

        this.domElement.className = "obstacle";
        this.domElement.style.width = this.width + "vw"; // give element in browser width with .style
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";
        
        //this.domElement.innerText = "This is the player";

        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.domElement);
    }



    moveDown(){
        this.positionY = this.positionY -= 1; // -5 is faster than -1
        this.domElement.style.bottom = this.positionY + "vh"; // apply movement changes also in css
    }

}

// new instance = calls class Player function
const player = new Player();

// to be able to be accessed in this scope(setInterval)
const obstaclesArray = []; // store instances of the class Obstacle = array

// creating new obstacle instances every few seconds stored in an array because it will be many obstacles
setInterval(() => {
    const newObstacle = new Obstacle();
    obstaclesArray.push(newObstacle);
}, 4000)



// intervall in dem sich jedes Objekt nach unten bewegt, alle 0,6 Sekunden
setInterval(() => {
    obstaclesArray.forEach((obstacleInstance) => {
        obstacleInstance.moveDown(); // using method moveDown 
    }); 
}, 60)


// add eventListeners to player
document.addEventListener("keydown", (event) => {
// for when player presses a certain key on keyboard 'arrowLeft' and 'arrowRight' 
    if (event.code === "ArrowLeft") {
        player.moveLeft();
    } else if (event.code === "ArrowRight") {
        player.moveRight();
    }
})
