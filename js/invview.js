// loading elements
const hpbar = document.querySelectorAll("#hp > img")
const pl = document.querySelector("#pl")
const rp = document.querySelector("#rp")
const rk = document.querySelector("#rk")
const ms = document.querySelector("#ms")
const mr = document.querySelector('#mr')
const ds = document.querySelector("#ds")
const dt = document.querySelector("#dt")
const hs = document.querySelector("#hs")
const fs = document.querySelector("#fs")
const sw = document.querySelector("#sw")
const ge = document.querySelector("#ge")
const viewhp = function (quantity) {
    hpbar.forEach((ell) => {
        ell.setAttribute("class", "hidden")
    })
    for (let i = 0; i < quantity; i++) {
        hpbar[i].setAttribute("class", "visible")
    }
    if (quantity >= 4) {
        pl.setAttribute('src', 'img/pl.png')
    } else if (quantity >= 1) {
        pl.setAttribute('src', 'img/plhurt.png')
    } else if (quantity == 0) {
        pl.setAttribute('src', 'img/pldeadt.png')
    }
}
const viewHideItemScroll = function (itemId, view) {
    switch (itemId) {
        case 'rp':
            if (view) {
                rp.setAttribute("class", "visible")
            } else {
                rp.setAttribute("class", "hidden")
            }
            break
        case 'rk':
            if (view) {
                rk.setAttribute("class", "visible")
            } else {
                rk.setAttribute("class", "hidden")
            }
            break
        case 'ms':
            if (view) {
                ms.setAttribute("class", "visible")
            } else {
                ms.setAttribute("class", "hidden")
            }
            break
        case 'mr':
            if (view) {
                mr.setAttribute("class", "visible")
            } else {
                mr.setAttribute("class", "hidden")
            }
            break
        case 'ds':
            if (view) {
                ds.setAttribute("class", "visible")
            } else {
                ds.setAttribute("class", "hidden")
            }
            break
        case 'dt':
            if (view) {
                dt.setAttribute("class", "visible")
            } else {
                dt.setAttribute("class", "hidden")
            }
            break
        case 'fs':
            if (view) {
                fs.setAttribute("class", "visible")
            } else {
                fs.setAttribute("class", "hidden")
            }
            break
        case 'hs':
            if (view) {
                hs.setAttribute("class", "visible")
            } else {
                hs.setAttribute("class", "hidden")
            }
            break
        case 'sw':
            if (view) {
                sw.setAttribute("class", "visible")
            } else {
                sw.setAttribute("class", "hidden")
            }
            break
        case 'ge':
            if (view) {
                ge.setAttribute("class", "visible")
            } else {
                ge.setAttribute("class", "hidden")
            }
            break
    }
}
const loadHp = function () {
    if (sessionStorage.getItem("hp") === null) {viewhp(5)}
    else {viewhp(sessionStorage.getItem("hp"))}
}
const loadInventory = function () {
    if (sessionStorage.getItem("rp")) {viewHideItemScroll("rp",true)}
    else {viewHideItemScroll("rp",false)}

    if (sessionStorage.getItem("rk")) {viewHideItemScroll("rk",true)}
    else {viewHideItemScroll("rk",false)}

    if (sessionStorage.getItem("ms")) {viewHideItemScroll("ms",true)}
    else {viewHideItemScroll("ms",false)}

    if (sessionStorage.getItem("mr")) {viewHideItemScroll("mr",true)}
    else {viewHideItemScroll("ms",false)}

    if (sessionStorage.getItem("ge")) {viewHideItemScroll("ge",true)}
    else {viewHideItemScroll("ge",false)}

    if (sessionStorage.getItem("ds")) {viewHideItemScroll("ds",true)}
    else {viewHideItemScroll("ds",false)}

    if (sessionStorage.getItem("dt")) {viewHideItemScroll("dt",true)}
    else {viewHideItemScroll("dt",false)}

    if (sessionStorage.getItem("fs")) {viewHideItemScroll("fs",true)}
    else {viewHideItemScroll("fs",false)}

    if (sessionStorage.getItem("hs")) {viewHideItemScroll("hs",true)}
    else {viewHideItemScroll("hs",false)}

    if (sessionStorage.getItem("sw")) {viewHideItemScroll("sw",true)}
    else {viewHideItemScroll("sw",false)}
}
function refresh() {
    loadInventory()
    loadHp()
}
refresh()
export {refresh}

