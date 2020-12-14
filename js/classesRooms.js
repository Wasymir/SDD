import {refresh} from "./invview";
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
    this.desc = ``;
    this.autosolved = false
}

class Room {
    constructor(buttonId, type) {
        this.data = new Roomdata(buttonId, type);
        this.buttonImg = document.querySelector('#' + this.data.btnId + ' > img')
        this.selector = '#' + this.data.btnId + ' > img'
        this.button = document.querySelector(this.selector)
        this.buttonImg.setAttribute("src", "../img/" + this.data.type + ".png")
    }

    solve() {
        this.data.solved = true
        this.refreshData()
    }

    visited() {
        this.data.visited = true
    }

    refreshData() {
        if (sessionStorage.getItem("hp") > 5) {
            sessionStorage.setItem("hp", 5)
        }
        if (sessionStorage.getItem("hp") < 0) {
            sessionStorage.setItem("hp", 0)
        }
        if (this.data.autosolved && this.data.visited) {
            this.data.solved = true
        }
        sessionStorage.setItem(this.selector, this.data.JSON.stringify(this.data))
        refresh()
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
        this.buttonImg.setAttribute("src", "../img/" + this.data.type + ".png")
        this.refreshData()
    }

}

class Ex extends Room {
    constructor(buttonId) {
        super(buttonId, 'ex');
        this.data.autosolved = true
        this.refreshData()
    }

    resolver() {
        //    todo: sktypt kończący grę
    }
}

class Ss extends Room {
    constructor(buttonId) {
        super(buttonId,'ss');
        this.data.desc = "Spell Scroll Merchant\nYou can buy here magic scrolls. Cost 1Gem.\nDefend scroll - kill every enemy exept dragon\nSpike scroll - disable one spike trap\n forsesign scroll - discorver one room, health scroll - +2 hp\nswapscroll - replace 2 room"
        this.data.autosolved = true
        this.refreshData()


    }

    resolver(){
        if (sessionStorage.getItem("ge")){
            switch (window.prompt("What would you buy?(- gem) ['ds' - defend scroll,\n 'dt' - disable spike trap,\n 'fs' - foresight scroll,\n 'hs' - health scroll,\n 'sw' - swap scroll]")) {
                case "ds":
                    sessio
                    nStorage.setItem("ds", true)
                    sessionStorage.setItem("ge", false)
                    break;
                case "dt":
                    sessionStorage.setItem("dt", true)
                    sessionStorage.setItem("ge", false)
                    break;
                case "fs":
                    sessionStorage.setItem("fs", true)
                    sessionStorage.setItem("ge", false)
                    break;
                case "hs":
                    sessionStorage.setItem("hs", true)
                    sessionStorage.setItem("ge", false)
                    break;
                case "sw":
                    sessionStorage.setItem("sw", true)
                    sessionStorage.setItem("ge", false)
                    break;
                default:
                    break;
            }
            this.refreshData()
        }
    }
}

class St extends Room {
    constructor(buttonId) {
        super(buttonId, "st");
        this.data.desc = "Spike trap\nCan be resoled with Magic rope\nIf resolved manually:\n60% resolve\n40% -2hp and resole"
        this.refreshData()
    }

    resolver() {
        this.fate1 = this.fate()
        this.fate2 = this.fate()
        if ((this.fate1 + this.fate2) % 2 != 0) {
            if (sessionStorage.getItem("rp")) {
                if (window.confirm("Your fate check went wrong!\n You cen retry it by using retry potion.\nDo you want to use it? ")) {
                    sessionStorage.setItem("rp", false)
                    this.refreshData()
                    this.resolver()
                } else {
                    if (sessionStorage.getItem("ms")) {
                        sessionStorage.setItem("ms", false)
                        this.solve()
                    } else {
                        sessionStorage.setItem("hp", sessionStorage.getItem("hp") - 2)
                        this.solve()
                    }
                    this.refreshData()
                }
            } else {
                if (sessionStorage.getItem("ms")) {
                    sessionStorage.setItem("ms", false)
                    this.solve()
                } else {
                    sessionStorage.setItem("hp", sessionStorage.getItem("hp") - 2)
                    this.solve()
                }
                this.refreshData()
            }

        }

    }
}

class Pt extends Room {
    constructor(buttonId) {
        super(buttonId, "pt");
        this.data.desc = "Pit Trap\nBe aware of hole!\nCrossing unsolved cost -2hp.\nCan be solved only with Magic rope"
        this.refreshData()
    }

    resolver() {
        if (sessionStorage.getItem("mr")) {
            if (window.confirm("You will get -2hp unless you use magic rope\nUse it?")) {
                this.solve()
                sessionStorage.setItem("mr", false)
            } else {
                if (sessionStorage.getItem("ms")) {
                    sessionStorage.setItem("ms", false)
                    this.solve()
                } else {
                    sessionStorage.setItem("hp", sessionStorage.getItem("hp") - 2)
                    this.solve()
                }
                this.refreshData()
            }
        } else {
            if (sessionStorage.getItem("ms")) {
                sessionStorage.setItem("ms", false)
                this.solve()
            } else {
                sessionStorage.setItem("hp", sessionStorage.getItem("hp") - 2)
                this.solve()
            }
            this.refreshData()
        }

    }
}

class De extends Room {
    constructor() {
        super(buttonId, "de");
        this.data.desc = "Dead end\nNo way"
        this.data.autosolved = true
        this.refreshData()
    }

    resolver() {
        window.alert("You can't resolve that room.")
    }
}

class Tc extends Room {
    constructor() {
        super(buttonId, "de");
        this.data.desc = "Treasure Chest\nRandom item\n20% - Rusty Cage\n20% - Magic Rope"
        this.data.autosolved = true
        this.refreshData()
    }

    resolver() {
        this.fateCh = this.fate()
        this.items = {
            0: ["rk", "Rusty Key"],
            1: ["mr", "Magic Rope"],
            2: ["rp", "Retry Potion"],
            3: ["", "Explosion Trap (-2hp)"],
            4: ["hs", "Healt Scroll"]
        }
        if (sessionStorage.getItem("rp")) {
            if (window.confirm("You will get: " + this.items[this.fateCh][1] + "\nYou can retry fate check with Retry Potion")) {
                sessionStorage.setItem("rp", false)
                this.refreshData()
                this.resolver()
            } else {
                if (this.fateCh == 3) {
                    if (sessionStorage.getItem("ms")) {
                        sessionStorage.setItem("ms", false)
                        this.solve()
                    } else {
                        sessionStorage.setItem("hp", sessionStorage.getItem("hp") - 2)
                        this.solve()
                    }
                    this.refreshData()
                } else {
                    sessionStorage.getItem(this.items[this.fateCh][0], true)
                }
            }
        } else {
            if (this.fateCh == 3) {
                if (sessionStorage.getItem("ms")) {
                    sessionStorage.setItem("ms", false)
                    this.solve()
                } else {
                    sessionStorage.setItem("hp", sessionStorage.getItem("hp") - 2)
                    this.solve()
                }
                this.refreshData()
            } else {
                sessionStorage.getItem(this.items[this.fateCh][0], true)
            }

        }

    }
}

class Ld extends Room {
    constructor(buttonId) {
        super(buttonId, 'ld');
        this.data.desc = "Lock Door\nUse Rusty Key to resolve it"
        this.refreshData()
    }

    resolver() {
        if (sessionStorage.getItem("rs")) {
            if (window.confirm("Do you want to use Rusty Key?")) {
                sessionStorage.setItem("rp", false)
                this.visited()
            }

        } else {
            window.alert("You don't have Rusty Key?")
        }
    }
}

class Ff extends Room {
    constructor(bttonId) {
        super(bttonId, "ff");
        this.data.desc = "Fickle Fountain\nFate Check:\n40% - +2hp\n60% - -1hp"
        this.data.autosolved = true
        this.refreshData();
    }

    resolver() {
        this.fateCh = this.fate()
        if (this.fateCh == 1 || this.fateCh == 3) {
            sessionStorage.setItem("hp", sessionStorage.getItem("hp") + 2)
            this.refreshData()
        } else {
            if (sessionStorage.getItem("rp")) {
                if (window.confirm("You will get -1hp unless you use Retry Potion.\nDo you want it?")) {
                    sessionStorage.setItem("rp", false)
                    this.refreshData()
                    this.resolver()
                } else {
                    if (sessionStorage.getItem("ms")) {
                        sessionStorage.setItem("ms", false)
                        this.solve()
                    } else {
                        sessionStorage.setItem("hp", sessionStorage.getItem("hp") - 1)
                        this.solve()
                    }
                    this.refreshData()
                }
            } else {
                if (sessionStorage.getItem("ms")) {
                    sessionStorage.setItem("ms", false)
                    this.solve()
                } else {
                    sessionStorage.setItem("hp", sessionStorage.getItem("hp") - 1)
                    this.solve()
                }
                this.refreshData()
            }
        }

    }
}

class Sp extends Room {
    constructor(buttonid) {
        super(buttonid, "sp");
        this.data.desc = "Secret Passage\nGo to another Secret Passage"
        this.data.autosolved = true
        this.refreshData();
    }

    resolver() {
        //    todo: skrypt odkrywający druge sp
    }
}

class Ge extends Room {
    constructor(buttonId) {
        super(buttonId, "ge");
        this.data.desc = "Gem\nBuy a scroll!"
        this.data.autosolved = true
        this.refreshData()
    }

    resolver() {
        sessionStorage.setItem("ge", true)
        this.refreshData()
    }
}

class Ms extends Room {
    constructor(buttonId) {
        super(buttonId, "ms");
        this.data.desc = "Magic Shield\nDefend yourself with it!"
        this.data.autosolved = true
        this.refreshData()
    }

    resolver() {
        sessionStorage.setItem("ms", true)
        this.refreshData()
    }
}

class sl extends Room {
    constructor(buttonId) {
        super(buttonId, "sl");

    }

}

