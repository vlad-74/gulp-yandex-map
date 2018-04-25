/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _form = __webpack_require__(1);

	var _create = __webpack_require__(2);

	(0, _create.loadjscssfile)("/styles/index.css", "css");
	(0, _create.loadjscssfile)("https://api-maps.yandex.ru/2.1/?lang=ru-RU", "js");
	(0, _create.loadjscssfile)("https://yandex.st/jquery/2.2.3/jquery.min.js", "js");

	setTimeout(function () {
	    ymaps.ready(init);
	}, 500);

	function init() {
	    var myMap = new ymaps.Map('map', { center: [55.76, 37.64], zoom: 10 }, { searchControlProvider: 'yandex#search' });
	    var objectManager = new ymaps.ObjectManager({
	        // Чтобы метки начали кластеризоваться, выставляем опцию.
	        clusterize: true,
	        // ObjectManager принимает те же опции, что и кластеризатор.
	        gridSize: 32,
	        clusterDisableClickZoom: false,

	        geoObjectOpenBalloonOnClick: false,
	        clusterOpenBalloonOnClick: false
	    });

	    objectManager.objects.events.add(['click'], onObjectEvent);
	    objectManager.clusters.events.add(['click'], onClusterEvent);

	    // Чтобы задать опции одиночным объектам и кластерам,
	    // обратимся к дочерним коллекциям ObjectManager.
	    objectManager.objects.options.set('preset', 'islands#greenDotIcon');
	    objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');

	    myMap.geoObjects.add(objectManager);

	    $.ajax({
	        url: './data.json'
	    }).done(function (data) {
	        objectManager.add(data);
	    });

	    function onObjectEvent(e) {
	        var objectId = e.get('objectId');
	        modalWindow(objectId, e.originalEvent.currentTarget._objectsById);
	    }

	    function onClusterEvent(e) {
	        var objectId = e.get('objectId');
	        if (e.get('type') == 'mouseenter') {
	            objectManager.clusters.setClusterOptions(objectId, { preset: 'islands#yellowClusterIcons' });
	        } else {
	            objectManager.clusters.setClusterOptions(objectId, { preset: 'islands#blueClusterIcons' });
	        }
	    }

	    function closeModal() {
	        var textar = document.getElementsByTagName('textarea'),
	            j = 0;
	        for (var _j = 0; _j < textar.length; _j++) {
	            textar[_j].removeEventListener('keydown', unblock, false);
	        }

	        var elements = document.getElementsByClassName('modal');
	        while (elements.length > 0) {
	            elements[0].parentNode.removeChild(elements[0]);
	        }
	    }

	    function unblock() {
	        document.getElementById('save').disabled = false;
	    }

	    function modalWindow(obj, startArr) {
	        var dmw = document.createElement('div');
	        dmw.id = 'divModal';
	        dmw.className = 'modal';
	        document.getElementById('map').appendChild(dmw);

	        var sp = document.createElement('span');
	        sp.id = 'spanModal';
	        sp.className = 'modal';
	        sp.innerHTML = 'X';
	        sp.addEventListener('click', closeModal);
	        document.getElementById('map').appendChild(sp);

	        var m = document.createElement('div');
	        m.id = 'formModal';
	        m.className = 'modal';
	        m.innerHTML = (0, _form.getForm)(obj, startArr);

	        document.getElementById('map').appendChild(m);

	        document.getElementById('exit').addEventListener('click', closeModal);
	        document.getElementById('save').addEventListener('click', closeModal);

	        var textar = document.getElementsByTagName('textarea'),
	            j = 0;
	        for (var _j2 = 0; _j2 < textar.length; _j2++) {
	            textar[_j2].addEventListener('keydown', unblock);
	        }

	        var inputs = document.getElementsByTagName('input'),
	            i = 0;
	        for (var _i = 0; _i < inputs.length; _i++) {
	            inputs[_i].disabled = true;
	        }
	    }
	}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getForm = getForm;
	function getForm(obj, startArr) {
	    var linkValue;
	    var nameValue;
	    var adresValue;
	    var descValue;
	    var telValue;
	    Object.keys(startArr).map(function (key) {
	        if (key === obj + '') {
	            linkValue = startArr[key].properties.balloonContentHeader;
	            linkValue = linkValue.length < 90 ? 'Информация об организации' : linkValue;
	            var str = startArr[key].properties.balloonContentBody;
	            var res = str.split('</div>');
	            for (var i = 0; i < res.length; i++) {
	                switch (i) {
	                    case 0:
	                        nameValue = res[i] + '</div>';
	                        break;
	                    case 1:
	                        adresValue = res[i] + '</div>';
	                        break;
	                    case 2:
	                        descValue = res[i] + '</div>';
	                        break;
	                    case 3:
	                        telValue = res[i] + '</div>';
	                        break;
	                }
	            }
	        }
	    });
	    return '\n      <p> ' + (linkValue || '') + ' </p>\n      <div class=\'form-group\'>\n          ' + (nameValue || '') + ' \n      </div>\n      <div class=\'form-group\'>\n          ' + (adresValue || '') + ' \n      </div>\n      <div class=\'form-group\'>\n      ' + (descValue || '') + ' \n      </div>\n      <div class=\'form-group\'>\n          ' + (telValue || '') + ' \n      </div>\n      <div class=\'flex\'>\n          <button id=\'exit\'> \u0412\u044B\u0439\u0442\u0438 </button> \n          <button disabled id=\'save\'> \u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C </button>\n      </div>\n      ';
		}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.loadjscssfile = loadjscssfile;
	function loadjscssfile(filename, filetype) {
		if (filetype == "js") {
			var fileref = document.createElement('script');
			fileref.setAttribute("type", "text/javascript");
			fileref.setAttribute("src", filename);
		} else if (filetype == "css") {
			var fileref = document.createElement("link");
			fileref.setAttribute("rel", "stylesheet");
			fileref.setAttribute("type", "text/css");
			fileref.setAttribute("href", filename);
		}
		if (typeof fileref != "undefined") document.getElementsByTagName("head")[0].appendChild(fileref);
		}

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmN2Q5OGE2ZTczYmQ5YTZiNTAyOCIsIndlYnBhY2s6Ly8vZnJvbnRlbmQvanMvcGFnZS5qcyIsIndlYnBhY2s6Ly8vZnJvbnRlbmQvanMvZm9ybS5qcyIsIndlYnBhY2s6Ly8vZnJvbnRlbmQvanMvY3JlYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmN2Q5OGE2ZTczYmQ5YTZiNTAyOCIsImltcG9ydCB7IGdldEZvcm0gfSBmcm9tICcuL2Zvcm0nO1xyXG5pbXBvcnQgeyBsb2FkanNjc3NmaWxlIH0gZnJvbSAnLi9jcmVhdGUnO1xyXG5cclxubG9hZGpzY3NzZmlsZShcIi9zdHlsZXMvaW5kZXguY3NzXCIsIFwiY3NzXCIpIFxyXG5sb2FkanNjc3NmaWxlKFwiaHR0cHM6Ly9hcGktbWFwcy55YW5kZXgucnUvMi4xLz9sYW5nPXJ1LVJVXCIsIFwianNcIik7XHJcbmxvYWRqc2Nzc2ZpbGUoXCJodHRwczovL3lhbmRleC5zdC9qcXVlcnkvMi4yLjMvanF1ZXJ5Lm1pbi5qc1wiLCBcImpzXCIpO1xyXG5cclxuc2V0VGltZW91dCgoKSA9PiB7IHltYXBzLnJlYWR5KGluaXQpO30sIDUwMCk7XHJcblxyXG5mdW5jdGlvbiBpbml0ICgpIHtcclxuICAgIHZhciBteU1hcCA9IG5ldyB5bWFwcy5NYXAoJ21hcCcsIHtjZW50ZXI6IFs1NS43NiwgMzcuNjRdLCB6b29tOiAxMH0sIHtzZWFyY2hDb250cm9sUHJvdmlkZXI6ICd5YW5kZXgjc2VhcmNoJ30pO1xyXG4gICAgdmFyIG9iamVjdE1hbmFnZXIgPSBuZXcgeW1hcHMuT2JqZWN0TWFuYWdlcih7XHJcbiAgICAgICAgLy8g0KfRgtC+0LHRiyDQvNC10YLQutC4INC90LDRh9Cw0LvQuCDQutC70LDRgdGC0LXRgNC40LfQvtCy0LDRgtGM0YHRjywg0LLRi9GB0YLQsNCy0LvRj9C10Lwg0L7Qv9GG0LjRji5cclxuICAgICAgICBjbHVzdGVyaXplOiB0cnVlLFxyXG4gICAgICAgIC8vIE9iamVjdE1hbmFnZXIg0L/RgNC40L3QuNC80LDQtdGCINGC0LUg0LbQtSDQvtC/0YbQuNC4LCDRh9GC0L4g0Lgg0LrQu9Cw0YHRgtC10YDQuNC30LDRgtC+0YAuXHJcbiAgICAgICAgZ3JpZFNpemU6IDMyLFxyXG4gICAgICAgIGNsdXN0ZXJEaXNhYmxlQ2xpY2tab29tOiBmYWxzZSxcclxuXHJcbiAgICAgICAgZ2VvT2JqZWN0T3BlbkJhbGxvb25PbkNsaWNrOiBmYWxzZSxcclxuICAgICAgICBjbHVzdGVyT3BlbkJhbGxvb25PbkNsaWNrOiBmYWxzZVxyXG4gICAgfSk7XHJcblxyXG4gICAgb2JqZWN0TWFuYWdlci5vYmplY3RzLmV2ZW50cy5hZGQoWydjbGljayddLCBvbk9iamVjdEV2ZW50KTtcclxuICAgIG9iamVjdE1hbmFnZXIuY2x1c3RlcnMuZXZlbnRzLmFkZChbJ2NsaWNrJ10sIG9uQ2x1c3RlckV2ZW50KTtcclxuXHJcbiAgICAvLyDQp9GC0L7QsdGLINC30LDQtNCw0YLRjCDQvtC/0YbQuNC4INC+0LTQuNC90L7Rh9C90YvQvCDQvtCx0YrQtdC60YLQsNC8INC4INC60LvQsNGB0YLQtdGA0LDQvCxcclxuICAgIC8vINC+0LHRgNCw0YLQuNC80YHRjyDQuiDQtNC+0YfQtdGA0L3QuNC8INC60L7Qu9C70LXQutGG0LjRj9C8IE9iamVjdE1hbmFnZXIuXHJcbiAgICBvYmplY3RNYW5hZ2VyLm9iamVjdHMub3B0aW9ucy5zZXQoJ3ByZXNldCcsICdpc2xhbmRzI2dyZWVuRG90SWNvbicpO1xyXG4gICAgb2JqZWN0TWFuYWdlci5jbHVzdGVycy5vcHRpb25zLnNldCgncHJlc2V0JywgJ2lzbGFuZHMjZ3JlZW5DbHVzdGVySWNvbnMnKTtcclxuXHJcbiAgICBteU1hcC5nZW9PYmplY3RzLmFkZChvYmplY3RNYW5hZ2VyKTtcclxuXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy4vZGF0YS5qc29uJ1xyXG4gICAgfSkuZG9uZShmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgb2JqZWN0TWFuYWdlci5hZGQoZGF0YSk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgZnVuY3Rpb24gb25PYmplY3RFdmVudCAoZSkge1xyXG4gICAgICAgIHZhciBvYmplY3RJZCA9IGUuZ2V0KCdvYmplY3RJZCcpO1xyXG4gICAgICAgIG1vZGFsV2luZG93KG9iamVjdElkLCBlLm9yaWdpbmFsRXZlbnQuY3VycmVudFRhcmdldC5fb2JqZWN0c0J5SWQpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBvbkNsdXN0ZXJFdmVudCAoZSkge1xyXG4gICAgICAgIHZhciBvYmplY3RJZCA9IGUuZ2V0KCdvYmplY3RJZCcpO1xyXG4gICAgICAgIGlmIChlLmdldCgndHlwZScpID09ICdtb3VzZWVudGVyJykge1xyXG4gICAgICAgICAgICBvYmplY3RNYW5hZ2VyLmNsdXN0ZXJzLnNldENsdXN0ZXJPcHRpb25zKG9iamVjdElkLCB7IHByZXNldDogJ2lzbGFuZHMjeWVsbG93Q2x1c3Rlckljb25zJ30pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG9iamVjdE1hbmFnZXIuY2x1c3RlcnMuc2V0Q2x1c3Rlck9wdGlvbnMob2JqZWN0SWQsIHsgcHJlc2V0OiAnaXNsYW5kcyNibHVlQ2x1c3Rlckljb25zJyB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VNb2RhbCAoKSB7XHJcbiAgICAgICAgbGV0IHRleHRhciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCd0ZXh0YXJlYScpLGo9MDtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRleHRhci5sZW5ndGg7IGorKykgeyBcclxuICAgICAgICAgICAgdGV4dGFyW2pdLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB1bmJsb2NrLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgZWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtb2RhbCcpO1xyXG4gICAgICAgIHdoaWxlKGVsZW1lbnRzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICBlbGVtZW50c1swXS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnRzWzBdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdW5ibG9jayAoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NhdmUnKS5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1vZGFsV2luZG93IChvYmosIHN0YXJ0QXJyKSB7XHJcbiAgICAgICAgdmFyIGRtdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGRtdy5pZCA9ICdkaXZNb2RhbCc7XHJcbiAgICAgICAgZG13LmNsYXNzTmFtZSA9ICdtb2RhbCc7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLmFwcGVuZENoaWxkKGRtdyk7XHJcblxyXG4gICAgICAgIHZhciBzcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBzcC5pZCA9ICdzcGFuTW9kYWwnO1xyXG4gICAgICAgIHNwLmNsYXNzTmFtZSA9ICdtb2RhbCc7XHJcbiAgICAgICAgc3AuaW5uZXJIVE1MID0gJ1gnO1xyXG4gICAgICAgIHNwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VNb2RhbCk7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLmFwcGVuZENoaWxkKHNwKTtcclxuXHJcbiAgICAgICAgdmFyIG0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBtLmlkID0gJ2Zvcm1Nb2RhbCc7XHJcbiAgICAgICAgbS5jbGFzc05hbWUgPSAnbW9kYWwnO1xyXG4gICAgICAgIG0uaW5uZXJIVE1MID0gZ2V0Rm9ybShvYmosIHN0YXJ0QXJyKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLmFwcGVuZENoaWxkKG0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhpdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VNb2RhbCk7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NhdmUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlTW9kYWwpO1xyXG5cclxuICAgICAgICBsZXQgdGV4dGFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RleHRhcmVhJyksaj0wO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGV4dGFyLmxlbmd0aDsgaisrKSB7IFxyXG4gICAgICAgICAgICB0ZXh0YXJbal0uYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHVuYmxvY2spO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGlucHV0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbnB1dCcpLGk9MDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0cy5sZW5ndGg7IGkrKykgeyBcclxuICAgICAgICAgICAgaW5wdXRzW2ldLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGZyb250ZW5kL2pzL3BhZ2UuanMiLCJleHBvcnQgZnVuY3Rpb24gZ2V0Rm9ybSAoIG9iaiwgc3RhcnRBcnIpIHtcclxuICAgIHZhciBsaW5rVmFsdWU7XHJcbiAgICB2YXIgbmFtZVZhbHVlO1xyXG4gICAgdmFyIGFkcmVzVmFsdWU7XHJcbiAgICB2YXIgZGVzY1ZhbHVlO1xyXG4gICAgdmFyIHRlbFZhbHVlO1xyXG4gICAgT2JqZWN0LmtleXMoc3RhcnRBcnIpLm1hcChcclxuICAgICAgICBrZXkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoa2V5ID09PSBvYmogKyAnJykge1xyXG4gICAgICAgICAgICAgICAgbGlua1ZhbHVlID0gc3RhcnRBcnJba2V5XS5wcm9wZXJ0aWVzLmJhbGxvb25Db250ZW50SGVhZGVyO1xyXG4gICAgICAgICAgICAgICAgbGlua1ZhbHVlID0gbGlua1ZhbHVlLmxlbmd0aCA8IDkwID8gJ9CY0L3RhNC+0YDQvNCw0YbQuNGPINC+0LEg0L7RgNCz0LDQvdC40LfQsNGG0LjQuCcgOiBsaW5rVmFsdWU7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RyID0gc3RhcnRBcnJba2V5XS5wcm9wZXJ0aWVzLmJhbGxvb25Db250ZW50Qm9keTtcclxuICAgICAgICAgICAgICAgIHZhciByZXMgPSBzdHIuc3BsaXQoJzwvZGl2PicpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZVZhbHVlID0gcmVzW2ldICsgJzwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRyZXNWYWx1ZSA9IHJlc1tpXSArICc8L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NWYWx1ZSA9IHJlc1tpXSArICc8L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbFZhbHVlID0gcmVzW2ldICsgJzwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9ICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICAgIHJldHVybiAgICAgICBgXHJcbiAgICAgIDxwPiAke2xpbmtWYWx1ZSB8fCAnJ30gPC9wPlxyXG4gICAgICA8ZGl2IGNsYXNzPSdmb3JtLWdyb3VwJz5cclxuICAgICAgICAgICR7bmFtZVZhbHVlIHx8ICcnfSBcclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9J2Zvcm0tZ3JvdXAnPlxyXG4gICAgICAgICAgJHthZHJlc1ZhbHVlIHx8ICcnfSBcclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9J2Zvcm0tZ3JvdXAnPlxyXG4gICAgICAke2Rlc2NWYWx1ZSB8fCAnJ30gXHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPSdmb3JtLWdyb3VwJz5cclxuICAgICAgICAgICR7dGVsVmFsdWUgfHwgJyd9IFxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz0nZmxleCc+XHJcbiAgICAgICAgICA8YnV0dG9uIGlkPSdleGl0Jz4g0JLRi9C50YLQuCA8L2J1dHRvbj4gXHJcbiAgICAgICAgICA8YnV0dG9uIGRpc2FibGVkIGlkPSdzYXZlJz4g0KHQvtGF0YDQsNC90LjRgtGMIDwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgYFxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGZyb250ZW5kL2pzL2Zvcm0uanMiLCJleHBvcnQgZnVuY3Rpb24gbG9hZGpzY3NzZmlsZShmaWxlbmFtZSwgZmlsZXR5cGUpe1xyXG5cdGlmIChmaWxldHlwZT09XCJqc1wiKXtcclxuXHRcdHZhciBmaWxlcmVmPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpXHJcblx0XHRmaWxlcmVmLnNldEF0dHJpYnV0ZShcInR5cGVcIixcInRleHQvamF2YXNjcmlwdFwiKVxyXG5cdFx0ZmlsZXJlZi5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgZmlsZW5hbWUpXHJcblx0fVxyXG5cdGVsc2UgaWYgKGZpbGV0eXBlPT1cImNzc1wiKXtcclxuXHRcdHZhciBmaWxlcmVmPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpXHJcblx0XHRmaWxlcmVmLnNldEF0dHJpYnV0ZShcInJlbFwiLCBcInN0eWxlc2hlZXRcIilcclxuXHRcdGZpbGVyZWYuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHQvY3NzXCIpXHJcblx0XHRmaWxlcmVmLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgZmlsZW5hbWUpXHJcblx0fVxyXG5cdGlmICh0eXBlb2YgZmlsZXJlZiE9XCJ1bmRlZmluZWRcIilcclxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChmaWxlcmVmKVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBmcm9udGVuZC9qcy9jcmVhdGUuanMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFDQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7QUNyR0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBWkE7QUFjQTtBQUNBO0FBQ0E7QUFFQTtBQW1CQTs7Ozs7Ozs7Ozs7QUNuREE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7OyIsInNvdXJjZVJvb3QiOiIifQ==