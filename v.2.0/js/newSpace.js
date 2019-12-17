function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

class Space {
    constructor(coubSize) {
        this.coubSize = coubSize;
        let freePlace = [];
        for(let i = 0; i < 3; i++) {
            freePlace.push(this.coubSize / 100 * 10);
        }
        this.capturedPlace = [freePlace];
    }
}

class SpaceObject {
    constructor(parentSpace, mass = 'default') {
        if(mass == 'default') {
            mass = randInt(1, Math.pow(parentSpace.coubSize, 3) - parentSpace.capturedPlace[0].reduce((x, y, z) => x * y * z));
        }
        this.mass = mass;
        let massLog = Math.log(this.mass, 3);
        this.volume = [];
        for(let y = 0; y < massLog; y++) {
            this.volume[y] = randInt(0, 1) ? [] : 0;
            for(let x = 0; x < massLog; x++) {
                if(this.volume[y]) {
                    this.volume[y][x] = randInt(0, 1) ? [] : 0;
                    if(this.volume[y][x]) {
                        for(let z = 0; z < massLog; z++) {
                            this.volume[y][x][z] = randInt(0, 1) ? 1 : 0;
                        }
                    }
                }
            }
        }
        this.limits = [this.volume.length, 0, 0];
        let preLimit = [];
        for(let i of this.volume) {
            preLimit.push()
            for(let k of i) {
                if(k != 0) {

                }
            }
            this.limits[1]
        }
    }
}