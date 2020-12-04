const neighborhood = {
    "00": [1, 7],
    "01": [0, 2],
    "02": [1, 3],
    "03": [2, 4],
    "04": [3, 5],
    "05": [4, 6],
    "06": [5, 9],
    "07": [0, 10],
    "08": [3, 12, 13, 17],
    "09": [6, 15],
    "10": [16, 11, 7],
    "11": [10, 12],
    "12": [8, 11, 13, 17],
    "13": [8, 12, 14, 17],
    "14": [13, 15],
    "15": [9, 14, 18],
    "16": [10, 19],
    "17": [8, 12, 13, 22],
    "18": [15, 25],
    "19": [16, 20],
    "20": [19, 21],
    "21": [20, 22],
    "22": [21, 23],
    "23": [22, 24],
    "24": [23, 25],
    "25": [24, 18]
}

function Roomdata(buttonId, type) {
    this.btnId = buttonId;
    this.type = type;
    this.visited = false;
    this.solved = false;
    this.neighbor = neighborhood[this.btnId.slice(3, 5)];
    this.hp = null;
    this.desc = ``
}

class Room {
    constructor(buttonId, type) {
        this.data = new Roomdata(buttonId, type);
        this.buttonImg = document.querySelector('#' + this.data.btnId + ' > img')
        this.selector = '#' + this.data.btnId + ' > img'
        this.button = document.querySelector(this.selector)
    }

    solve() {
        this.data.solved = true
    }

    visited() {
        this.data.solved = true
    }

    refreshData() {
        sessionStorage.setItem(this.selector, this.data.JSON.stringify(this.data))
    }

    fate() {
        const min = Math.ceil(0);
        const max = Math.floor(5);
        return Math.floor(Math.random() * (max - min) + min);
    }
    swap(where) {
        this.data.btnId = where
        this.buttonImg = document.querySelector('#' + this.data.btnId + ' > img')
        this.selector = '#' + this.data.btnId + ' > img'
        this.button = document.querySelector(this.selector)
        this.buttonImg.setAttribute("src","../img/" + this.data.type + ".png")
    }
}

class De extends Room {
    constructor(buttonId) {
        super(buttonId,'de');
        this.refreshData()
    }
    resolver(){
    //    todo: sktypt kończący grę
    }
}
class Ss extends Room {
    constructor(buttonId) {
        super(buttonId,'ss');
        this.data.desc = "Spell Scroll Merchant\nYou can buy here magic scrolls. Cost 1Gem.\nDefend scroll - kill every enemy exept dragon\nSpike scroll - disable one spike trap\n forsesign scroll - discorver one room, health scroll - +2 hp\nswapscroll - replace 2 room"

        this.refreshData()


    }
    resolver(){
        if (sessionStorage.getItem("ge")){
            switch (window.prompt("What would you buy?(- gem) ['ds' - defend scroll,\n 'dt' - disable spike trap,\n 'fs' - foresight scroll,\n 'hs' - health scroll,\n 'sw' - swap scroll]")) {
                case "ds":
                    sessionStorage.setItem("ds",true)
                    break;
                case "dt":
                    sessionStorage.setItem("dt",true)
                    break;
                case "fs":
                    sessionStorage.setItem("fs",true)
                    break;
                case "hs":
                    sessionStorage.setItem("hs",true)
                    break;
                case "sw":
                    sessionStorage.setItem("sw",true)
                    break;
            }
        }
    }
}
class St extends Room{
    constructor(buttonId) {
        super(buttonId,"st");
        this.data.desc = "Spike trap\nCan be resoled with Magic rope\nIf resolved manually:\n60% resolve\n40% -2hp and resole"

    }
}
