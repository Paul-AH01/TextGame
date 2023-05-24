class Room {
    constructor(name, description) {
      this._name = name;
      this._description = "";
      this._linkedRooms = {};
      this._character = null;
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
    set character(character) {
        this._character = character;
    }
    //This will describe the room
    //When using the 'X ${this._name} Y {this._other}' don't use the apostrophy next to the @
    //Use the key abouve the Tab key for the correct apostrophy ``` not '''
    describe() {
        return `Looking around the ${this._name} you can see ${this._description}.`;
    }
    getDetails() {
        const entries = Object.entries(this._linkedRooms);
        let details = []
        for (const [direction, room] of entries) {
             let text = `The${room.name} is to the ${direction}`
             details.push(text)
        }
        return details
    }
    //This allows the player to move around
    move(direction) {
        if (direction in this._linkedRooms) {
            return this._linkedRooms[direction];
        } else {
            alert("You can't go that way.")
            return this;
        }
    }
    //This links the rooms to eachother 
    linkRooms(direction, roomToLink) {
        this._linkedRooms[direction] = roomToLink;
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

    }
}

class Item {
    constructor(name) {
        this._name = name;
        this._description = description;
    }
    set name(name) {
        this._name = name;
    }
    set description(description) {
        this._description = description;
    }
}

function displayRoomInfo(room) {
    let occupantMsg = ""
    if (room.character) {
        occupantMsg = `${room.character.describe()} ${room.character.converse()}`;
    } else {
        occupantMsg = "The room is empy"
    }
    textContent = "<p>" + room.describe() + "</p>";

    document.getElementById("textArea").innerHTML = textContent;
    document.getElementById("usertext").focus()
}

function startGame() {
    let currentRoom = Kitchen
    displayRoomInfo(Kitchen)

    const directions = ["North", "South", "East", "West"]

    document.addEventListener("keydown", function(event) {
        console.log(event)
        if (event.key === "Enter") {
            const command = document.getElementById("usertext").value 
            if (direction.includes(command.toLowerCase())) {
                console.log("Hello")
                currentRoom = currentRoom.move(command.toLowerCase())
                document.getElementById("usertext").value = ""
                displayRoomInfo{currentRoom}
            } else {
                document.getElementById("usertext").value = ""
                alert("This is not a valid direction, Try again")
            }

        }
    })
}

//Move this under the classes

//Add more rooms
const Entrance = new Room("Entrance");
const MainHall = new Room("MainHall");
const Kitchen = new Room("Kitchen");
Kitchen.description = "A dimly lit room with";
const Study = new Room("Study");
const DiningHall = new Room("DiningHall");
const Hallway = new Room("Hallway");
const Upstairs = new Room("Upstairs");
const Cellar = new Room("Cellar");
const Lounge = new Room("Lounge");
Lounge.description = "A large room with a stoked fire in the corner";

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