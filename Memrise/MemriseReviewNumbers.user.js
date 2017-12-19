// ==UserScript==
// @name         Memrise review numbers
// @namespace    https://github.com/milankostak/Websites-tweaks/
// @version      1.0
// @description  adds back review buttons with numbers of words for review
// @author       Milan Košťák
// @match        https://www.memrise.com/home/
// @grant        none
// @updateURL    https://github.com/milankostak/Websites-tweaks/raw/master/Memrise/MemriseReviewNumbers.user.js
// @downloadURL  https://github.com/milankostak/Websites-tweaks/raw/master/Memrise/MemriseReviewNumbers.user.js
// ==/UserScript==

(function() {
    'use strict';

    function main() {
        // remove previously created buttons
        var buttons = document.querySelectorAll(".asdfasdf");
        for (var ii = 0; ii < buttons.length; ii++) {
            buttons[ii].remove();
        }

        var courses = MEMRISE.dashboard.cardsComponent.vm.courses();
        var ids = Object.keys(courses);
        for (var i = 0, j = 0; i < ids.length; i++) {
            var id = ids[i];
            var course = courses[id];
            var count = course.review();

            if (count === 0) continue;

            var link = document.createElement("a");
            link.href = "https://www.memrise.com" + course.url() + "garden/classic_review/";
            link.classList.add("button");
            link.classList.add("blue");
            link.classList.add("asdfasdf");
            link.tabIndex = j++;
            link.title = "";
            link.setAttribute("data-placement", "top");
            link.setAttribute("data-original-title", "Review words you've learned");
            link.style.marginRight = "10px";
            link.style.marginTop = "3px";

            var span = document.createElement("span");
            span.classList.add("text");
            span.innerHTML = "Review ("+count+")";
            link.appendChild(span);

            document.querySelector("#course-"+id+" .course-actions").appendChild(link);
        }
    }

    // observe content for changes
    var targetNode = document.getElementById('content');

    var callback = function() {
        // disconnect to avoid loop because the content is being changed inside the main function
        disconnect();
        main();
        // connect the observer back
        connect();
    };

    var observer = new MutationObserver(callback);

    var connect = function() {
        observer.observe(targetNode, { attributes: true, childList: true, subtree: true });
    };
    var disconnect = function() {
        observer.disconnect();
    };

    connect();
})();