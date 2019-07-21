// ==UserScript==
// @name         Duolingo Crown Filter
// @namespace    https://github.com/milankostak/Websites-tweaks/
// @version      1.1.1
// @description  Filter skills by crown count
// @author       Milan Košťák
// @match        https://www.duolingo.com/
// @grant        none
// @updateURL    https://github.com/milankostak/Websites-tweaks/raw/master/Duolingo/DuolingoCrownFilter.user.js
// @downloadURL  https://github.com/milankostak/Websites-tweaks/raw/master/Duolingo/DuolingoCrownFilter.user.js
// ==/UserScript==

(function() {
    'use strict';
    //debugger;
    let nodes = document.querySelectorAll("._2PyWM");

    let checkpoints = document.querySelectorAll(".HVmLo");

    function show(i) {
        applyStyle(i, "block");
    }

    function showAll() {
        for (let i = 0; i < nodes.length; i++) {
            show(i);
        }
        changeCheckpoints("inline-block");
    }

    function hide(i) {
        applyStyle(i, "none");
    }

    function applyStyle(i, value) {
        nodes[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = value;
    }

    function changeCheckpoints(state) {
        checkpoints.forEach(el => {el.parentNode.parentNode.parentNode.style.display = state});
    }

    for (let i = -1; i <= 5; i++) {
        let a = document.createElement("a");
        a.href = "#";
        a.style.padding = "8px 20px";
        a.style.border = "2px solid #dadada";
        a.style.top = "15px";
        a.style.borderRadius = "50px";
        a.style.color = "#999";
        a.style.margin = "12px 12px 25px 0";
        a.style.display = "inline-block";
        a.onmouseenter = function() {
            a.style.background = "rgba(0,0,0,.05)";
            a.style.color = "#3c3c3c";
        };
        a.onmouseleave = function() {
            a.style.background = "transparent";
            a.style.color = "#999";
        };
        if (i === -1) {
            a.innerHTML = "Show all";
            a.onclick = showAll;
        } else if (i === 0) {
            a.innerHTML = i;
            a.onclick = function() {
                for (let j = 0; j < nodes.length; j++) {
                    if (nodes[j].nextSibling === null) show(j);
                    else hide(j);
                }
                changeCheckpoints("none");
            };
        } else {
            a.innerHTML = i;
            a.onclick = function() {
                for (let j = 0; j < nodes.length; j++) {
                    if (nodes[j].nextSibling !== null && nodes[j].nextSibling.innerText == i) show(j);
                    else hide(j);
                }
                changeCheckpoints("none");
            };
        }
        document.querySelector(".w8Lxd").append(a);
    }
    document.querySelector(".w8Lxd").style.height = "80px";
})();