// ==UserScript==
// @name         Memrise review numbers
// @namespace    https://github.com/milankostak/Websites-tweaks/
// @version      1.0.1
// @description  adds back review buttons with numbers of words for review
// @author       Milan Košťák
// @match        https://www.memrise.com/home/
// @grant        none
// @updateURL    https://github.com/milankostak/Websites-tweaks/raw/master/Memrise/MemriseReviewNumbers.user.js
// @downloadURL  https://github.com/milankostak/Websites-tweaks/raw/master/Memrise/MemriseReviewNumbers.user.js
// ==/UserScript==

(function() {
    'use strict';

    var customClass = "asdfasdf";

    function main() {
        // remove previously created buttons
        var buttons = document.querySelectorAll("."+customClass);
        for (var ii = 0; ii < buttons.length; ii++) {
            buttons[ii].remove();
        }

        var courses = MEMRISE.dashboard.cardsComponent.vm.courses();
        var ids = Object.keys(courses);
        for (var i = 0, j = 0; i < ids.length; i++) {
            var id = ids[i];
            var course = courses[id];
            var count = course.review();

            // skip when there are no words for review
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
            link.addEventListener("click", function() {
                console.log("click");
            });

            var span = document.createElement("span");
            span.classList.add("text");
            span.innerHTML = "Review ("+count+")";
            link.appendChild(span);

            document.querySelector("#course-"+id+" .course-actions").appendChild(link);
        }
    }


    var observerCallback = function(mutationsList) {
        // direct click on the button didn't work because the observer was called
        // when the button is clicked don't call main() function
        var block = false;
        for (var mutation of mutationsList) {
            if (mutation.target.classList.contains(customClass)) {
                block = true;
                break;
            }
        }
        if (!block) {
            // disconnect to avoid loop because the content is being changed inside the main function
            disconnect();
            main();
            // connect the observer back
            connect();
        }
    };

    // observe content for changes
    // used as trigger for calling main() function
    var targetNode = document.getElementById('content');
    var observer = new MutationObserver(observerCallback);

    var connect = function() {
        observer.observe(targetNode, { attributes: true, childList: true, subtree: true });
    };

    var disconnect = function() {
        observer.disconnect();
    };

    connect();
})();