let hasPickedUpSword = false

class Room {
    constructor(name, description) {
      this._name = name;
      this._description = "";
      this._linkedRooms = {};
      this._character = null;
      this._item = null;
    }
    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    get character() {
        return this._character;
    }
    set description(description) {
        this._description = description
    }
    set item(itemNew) {
        this._item = itemNew._name._name;
    }
    set character(character) {
        this._character = character;
    }
    //This will describe the room
    //When using the 'X ${this._name} Y {this._other}' don't use the apostrophy next to the @
    //Use the key abouve the Tab key for the correct apostrophy ``` not '''
    describe() {
        return `Looking around the ${this._name} you can see ${this._description}.`;
    }
     //This links the rooms to eachother 
     linkRooms(direction, roomToLink) {
        this._linkedRooms[direction] = roomToLink;
    }
    getDetails() {
        const entries = Object.entries(this._linkedRooms);
        let details = []
        for (const [direction, room] of entries) {
             let text = `The${room.name} is to the ${direction}`;
             details.push(text);
        }
        return details;
    }
    //This allows the player to move around
    move(direction) {
        if (this._item !== null) {
            alert("You need to pick up the item in the room first");
            return this;
        }
        if (direction in this._linkedRooms) {
            return this._linkedRooms[direction];
        } else {
            alert("You can't go that way.");
            alert(this._name)
            return this;
        }
    }
}


class Character {
    constructor(name) {
        this._name = name;
        this._description = "";
        this._conversation = "";
    }
    set name(name) {
        this._name = name;
    }
    set description(description) {
        this._description = description;
    }
    set conversation(conversation) {
        this._conversation = conversation;
    }
    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    get conversation() {
        return this._conversation;
    }
    describe() {
        return `You have met ${this._name}, ${this._description}`
    }
    converse() {
        return `${this._name} says ${this._conversation}`
    }
}

class Item {
    constructor(name) {
        this._name = name;
        this._description = "";
    }
    set name(name) {
        this._name = name;
    }
    set description(description) {
        this._description = description;
    }
    get name() {
        return this._name
    }
    get description() {
        return this._description
    }
    describe() {
        return `The ${this._name} is ${this._description}`
    }
}

//Move this under the classes

//Add more rooms
const Entrance = new Room("Entrance");
Entrance.description =
 "";
const MainHall = new Room("MainHall");
Entrance.description = 
 "";
const Kitchen = new Room("Kitchen");
Kitchen.description =
 "A dimly lit room with";
const Study = new Room("Study");
Study.description =
 "";
const DiningHall = new Room("DiningHall");
DiningHall.description = 
 "";
const Hallway = new Room("Hallway");
Hallway.description = 
 "";
const Upstairs = new Room("Upstairs");
Upstairs.description =
 "";
const Cellar = new Room("Cellar");
Cellar.description =
 "";
const Lounge = new Room("Lounge");
Lounge.description = 
 "A large room with a stoked fire in the corner";

//Items

const Sword = new Item("Sword"); // this is a new piece of code
Sword.description = "A large sword with a jewelled hilt"; // this is a new piece of code

const Shield = new Item("Shield")
Shield.description = "A big Viking shield"

Kitchen.item = new Item(Shield)

console.log(Sword);

Hallway.item = new Item(Sword); // this is a new piece of code

//Link any additional rooms
Entrance.linkRooms("North", Hallway);
Entrance.linkRooms("East", Lounge);
Entrance.linkRooms("West", DiningHall);

Hallway.linkRooms("South", Entrance);
Hallway.linkRooms("West", Kitchen);
Hallway.linkRooms("East", Cellar);

Lounge.linkRooms("East", Study);
Lounge.linkRooms("West", Entrance);
Lounge.linkRooms("North", Upstairs);

DiningHall.linkRooms("East", Entrance);
DiningHall.linkRooms("North", Kitchen);

Kitchen.linkRooms("South", DiningHall);
Kitchen.linkRooms("East", Hallway);

Kitchen.linkRooms("East", Lounge);
Lounge.linkRooms("West",Kitchen );

const Ghoul = new
Character("Ghoul");
Ghoul.description = "A pale husk of a person";
Ghoul.conversation = "*Heavy breathing and Ghastly chants*"

Lounge.character = Ghoul

function displayRoomInfo(room) {
    console.log(room);
    let occupantMsg = "";
    let itemDesc = "";
    if (room.character !== null) {
        console.log(hasPickedUpSword);
        console.log(room.character._name)
        occupantMsg = `${room.character.describe()} ${room.character.converse()}`;
    
        if (room.character._name === "Ghoul" && hasPickedUpSword) {
            alert("You have killed the Ghoul");
            occupantMsg = "You have killed the Ghoul";
            // room.character = null;
        } else if (room.character._name === "Ghoul" && !hasPickedUpSword) {
            alert("The Ghoul has killed you");
            occupantMsg = "The Ghoul has killed you";
        }
      } else {
        occupantMsg = "The room is empty";
      }

      // item code

      if (room._item === "Sword" && !hasPickedUpSword) {
        console.log(room._item);
        itemDesc = "There is a sword in this room! Do you want to pick it up?";
        const btn = document.createElement("button");
        btn.innerHTML = "Pick up sword";
        btn.addEventListener("click", () => {
          console.log("working now");
          document.getElementById("itemDesc").innerHTML = "You picked up the sword";
          hasPickedUpSword = true;
          console.log(hasPickedUpSword)
        });
        document.body.appendChild(btn);
      } else if (room._item === "Shield") {
        itemDesc = "There is a shield in this room!"
      }
      document.getElementById("textarea").innerHTML =
      room.describe() +
      "<p>" +
      occupantMsg +
      "</p>" +
      "<p>" +
      room.getDetails() +
      "</p>";
    document.getElementById("itemDesc").innerHTML = itemDesc; // this is a new piece of code
    document.getElementById("usertext").focus();
}

function startGame() {
    let currentRoom = Entrance;
    displayRoomInfo(currentRoom);

    const directions = ["north", "south", "east", "west"];

    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            const command = document.getElementById("usertext").value.toLowerCase();
            if (command === "pick up") {
                if (currentRoom === Kitchen && !hasPickedUpShield && currentRoom._item instanceof Item && currentRoom._item.name === "Shield") {
                    hasPickedUpShield = true;
                    currentRoom._item = null;
                    document.getElementById("itemDesc").innerHTML = "You picked up the shield.";
                    document.getElementById("usertext").value = "";
                    return;
            }
            if (directions.includes(command.toLowerCase())) 
            {

            } else {
                alert("There is nothing to pick up in this room.");
            }
        } else if (directions.includes(command)) {
            if (currentRoom === Kitchen && !hasPickedUpShield) {
                alert("You need to pick up the shield in this room first.");
                return;
            }
                currentRoom = currentRoom.move(command.toLowerCase());
                document.getElementById("usertext").value = "";
                displayRoomInfo(currentRoom);
            } else {
                document.getElementById("usertext").value = "";
                alert("That is not a valid direction. Please try again");
            }
        }
    })
}

startGame();