// ==UserScript==
// @name         Duolingo Crown Filter
// @namespace    https://github.com/milankostak/Websites-tweaks/
// @version      1.0.1
// @description  Filter skills by crown count
// @author       Milan Košťák
// @match        https://www.duolingo.com/
// @grant        none
// @updateURL    https://github.com/milankostak/Websites-tweaks/raw/master/Duolingo/DuolingoCrownFilter.user.js
// @downloadURL  https://github.com/milankostak/Websites-tweaks/raw/master/Duolingo/DuolingoCrownFilter.user.js
// ==/UserScript==

(function() {
    'use strict';

    let nodes = document.querySelectorAll(".qLLbC");

    let buttons = document.querySelectorAll("button"),
        checkpointButtons = [...buttons].filter(e => e.innerText === "Checkpoint passed");

    function show(i) {
        nodes[i].parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "inline-block";
    }

    function showAll() {
        for (let i = 0; i < nodes.length; i++) {
            show(i);
        }
        checkpointButtons.forEach(function(el) {el.style.display = "inline-block";});
    }

    function hide(i) {
        nodes[i].parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none";
    }

    for (let i = 0; i <= 5; i++) {
        let a = document.createElement("a");
        a.href = "#";
        a.style.padding = "8px 20px";
        a.style.border = "2px solid #dadada";
        a.style.position = "relative";
        a.style.top = "15px";
        a.style.borderRadius = "50px";
        a.style.color = "#999";
        a.style.margin = "12px 12px 12px 0";
        a.style.display = "inline-block";
        a.onmouseenter = function() {
            a.style.background = "rgba(0,0,0,.05)";
            a.style.color = "#3c3c3c";
        };
        a.onmouseleave = function() {
            a.style.background = "transparent";
            a.style.color = "#999";
        };
        if (i === 0) {
            a.innerHTML = "Show all";
            a.onclick = showAll;
        } else {
            a.innerHTML = i;
            a.onclick = function() {
                for (let j = 0; j < nodes.length; j++) {
                    if (nodes[j].innerText == i) show(j);
                    else hide(j);
                }
                checkpointButtons.forEach(function(el) {el.style.display = "none";});
            };
        }
        document.querySelector(".mAsUf").append(a);
    }
})();