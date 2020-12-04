
function Player() {
    this.hp = 5
    this.itemrp = false
    this.itemmr = false
    this.itemrk = false
    this.itemms = false
    this.refreshData = function () {
        sessionStorage.setItem("hp", this.hp)
        sessionStorage.setItem("rp", this.itemrp)
        sessionStorage.setItem("mr", this.itemmr)
        sessionStorage.setItem("rk", this.itemrk)
        sessionStorage.setItem("ms", this.itemms)
    }
    this.loadData = function () {
        this.itemrp = sessionStorage.getItem("rp")
        this.itemmr = sessionStorage.getItem("mr")
        this.itemrk = sessionStorage.getItem("rk")
        this.itemms = sessionStorage.getItem("ms")
        this.hp = sessionStorage.setItem("hp")


    }
    this.isDead = function () {
        if (this.hp == 0) {
            return true
        } else {
            return false
        }
    }

    this.damage = function (value) {
        if (this.itemms) {
            this.itemms = false
            this.refreshData()
            return false
        } else {
            this.hp -= value
            if (this.hp < 0) {
                this.hp = 0
            }
            return this.isDead()
        }
    }
}