function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

class Space {
    constructor(universityName, size, colors, appendParent) {
        this.spaceObjects = [];
        this.universutyName = universityName;
        this.size = size;
        this.colors = colors;
        this.space = $('<canvas>', {
            id: this.universutyName,
        });
        this.space.attr('width', `${this.size[0]}`);
        this.space.attr('height', `${this.size[1]}`);
        let spacePartsCount = Math.floor(100 / this.colors.length);
        let spacePlace = '';
        for(let i = 0; i < this.colors.length; i++) {
            spacePlace += this.colors[i] + ' ' + `${spacePartsCount * i}%,`;
        }
        spacePlace = spacePlace.split(',');
        spacePlace[spacePlace.length - 1] = `${this.colors[this.colors.length - 1]} 100%`;

        this.space.css({
            background: `radial-gradient(ellipse at bottom, ${spacePlace})`
        });
        this.space.appendTo(appendParent);
    }

    bigBoom(starsQuantity, size, animationSpeedAndDepthRange) {
        for(let i = 1; i <= starsQuantity; i++) {
            let star = new Star(
                this.space,
                randInt(size[0], size[size.length - 1]),
                [randInt(1, this.space.width()), randInt(1, this.space.height())],
                'white',
                randInt(animationSpeedAndDepthRange[0], animationSpeedAndDepthRange[1])
            );
            this.spaceObjects.push(star);
        }
    }

    renderAllSpace(turn) {
        this.space[0].getContext('2d').clearRect(0, 0, this.space.width(), this.space.height());
        for(let i of this.spaceObjects) {
            i.animateObj(turn);
            i.renderObj();
        }
    }
}

class Star {
    constructor(space, radius, pos, color, animationDuration) {
        this.space = space;
        this.radius = radius;
        this.pos = pos;
        this.color = color;
        this.animationSpeed = this.space.height() / animationDuration;
    }

    animateObj(turn = 'bottom') {
        switch (turn) {
            case 'right':
                if(this.pos[0] > 0) {
                    this.pos[0] -= this.animationSpeed;
                } else {
                    this.pos[0] = this.space.width();
                }
                break;
            case 'left':
                if(this.pos[0] < this.space.width()) {
                    this.pos[0] += this.animationSpeed;
                } else {
                    this.pos[0] = 0;
                }
                break;
            case 'top':
                if(this.pos[1] < this.space.height()) {
                    this.pos[1] += this.animationSpeed;
                } else {
                    this.pos[1] = 0;
                }
                break;
            case 'bottom':
                if(this.pos[1] > 0) {
                    this.pos[1] -= this.animationSpeed;
                } else {
                    this.pos[1] = this.space.height();
                }
                break;
        }
    }

    renderObj() {
        let ctx = this.space[0].getContext('2d');
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.radius, 1, 2*Math.PI, true);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.closePath();
    }
}

function checkMouseTurn(event, turn, center) {
    let transitionX = center[0] - event.clientX > 0 ? center[0] - event.clientX : (center[0] - event.clientX) * -1;
    let transitionY = center[1] - event.clientY > 0 ? center[1] - event.clientY : (center[1] - event.clientY) * -1;
    if(transitionX > transitionY) {
        if(event.clientX < center[0]) {
            turn = 'left';
        }
        else if(event.clientX > center[0]) {
            turn = 'right';
        }
    } else {
        if(event.clientY < center[1]) {
            turn = 'top';
        }
        else if(event.clientY > center[1]) {
            turn = 'bottom';
        }
    }
    return turn;
}

window.onload = () => {
    let firstSpace = new Space('No-Milky-Way', [$(window).width(), $(window).height()], ['#013155', '#01162E'], $('.space-js.space-palace'));
    firstSpace.space.css({position: 'fixed', top: 0, left: 0});
    for(let layer = 0; layer < 4; layer++) {
        firstSpace.bigBoom(100, [layer + 1, layer + 1], [1, 1000 / layer + 1]);
    }
    let currTurn = 'top';
    let movingInterval = setInterval(() => {
        firstSpace.renderAllSpace(currTurn);
    }, 20);
    document.onmousemove = (event) => {
        currTurn = checkMouseTurn(event, currTurn, [firstSpace.size[0] / 2, firstSpace.size[1] / 2]);
    };
};