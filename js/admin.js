const crp = document.querySelector("#crp")
const cmr = document.querySelector("#cmr")
const cms = document.querySelector("#cms")
const cge = document.querySelector("#cge")
const crk = document.querySelector("#crk")
crp.addEventListener("click", function () {
    if (sessionStorage.getItem("rp") == true) {
        console.log("off")
        sessionStorage.setItem("rp", false)
    } else {
        console.log("on")
        sessionStorage.setItem("rp", true)
    }
    console.log(sessionStorage.getItem("rp"))
})