//class Animal {
  //  constructor(name, description) {
    //    this._name = name;
      //  this._description = description;
    //}

    //describe() {
     //   return '${this._name} has ${this._description} legs'
    //}

    //set name(name) {
        if (typeof name !== "string") {
            console.error("Name must be a string")
            return;
        } else if (name.length < 4) {
            console.error("Name must be at least 4 characters long")
            return;
        }
        
        else {
        //console.log("name changed")
          this._name = name
        }
    //}
    //set description(description) {
        if (isNaN(description)) {
            console.error("Description must be a number")
            return;
        } else if (description > 4) {
           
        }

        {
            this._description = description
        }
    //}
    //get name() {
      //  return 'The name is ${this._name}'
    //}
//}

//const Dog = new Animal("Theo", 4)
//const Cat = new Animal("Simba", yellow)

class Room {
    constructor(name, items, hasEnemy) {
        this._name = name;
        this._items = items;
        this._hasEnemy = hasEnemy
        this._linkedRooms = {};
    }
    linkRoom(direction, roomToLink) {
    this._linkedRooms[direction] = roomToLink;
    }
    checkIfEnemy(character) {
        if (this._hasEnemy) {
            console.log("Danger, enemy nearby!")
        }
    }
}

const Kitchen = new Room("Kitchen", ["knife","table"], true)
//This is how to link the rooms together.
LivingRoom.linkRoom("north", kitchen);

const currentCharacter = {

}

class Food {
    constructor(name, isHealthy, pricePerkg) {
        this._name = name;
        this._isHealthy = isHealthy;
        this._pricePerkg = pricePerkg
    }
    logValues() {
        return 'This ${this.name} is ${this.pricePerkg} per kg'
    }
}

