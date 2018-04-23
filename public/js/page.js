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
/***/ (function(module, exports) {

	'use strict';

	var cssStyle = document.createElement('style');
	cssStyle.type = 'text/css';
	cssStyle.innerHTML = '\nhtml, body, #map { width: 100%; height: 100%; padding: 0; margin: 0; font-family: Verdana, Arial, Helvetica, sans-serif;} \n#map { min-width: 320px; min-height: 480px; }\np { text-align: center; font-size: 16pt; }\nlabel { width: 100px; font-size: 12pt; }\ninput { width: 450px; border-radius: 7px; font-size: 11pt; }\ntextarea { width: 448px; border-radius: 10px;}\n.form-group div { display: flex; width: 100%; padding: 5px 0;}\n.flex { display: flex;  justify-content: space-between; margin: 25px 10px;}\n#divModal { position: absolute; top: 0; width: 100%; height: 100%; z-index: 100; background-color: yellow; opacity: 0.5 }\n#spanModal { line-height: 30px; cursor: pointer; color: yellow; position: absolute; top: 10px; right: 10px; width: 30px; height: 30px; border-radius: 50%; z-index: 110; background-color: blue; text-align: center; }\n#formModal { position: absolute; top: 100px; left: 35%; top: 25%; width: 600px; height: 400px; padding: 20px; z-index: 300; border-radius: 2%; background-color: LightBlue; }\n#exit { background: #3498db; border-radius: 10px; color: #ffffff; font-size: 12pt; padding: 5px 10px; text-decoration: none; cursor: pointer;}\n#exit:hover { background: #3cb0fd; text-decoration: none; cursor: pointer; }\n#save {background: #d9345d; border-radius: 10px; color: #ffffff; font-size: 12pt;  padding: 5px 10px text-decoration: none; cursor: pointer; }\n#save:hover { background: #fc3c73; text-decoration: none; cursor: pointer; }\n#save[disabled] { cursor: default; background-color: grey; }\n#map1 { width: 100%; height: 100%;  min-width: 320px; min-height: 480px; }\n';
	document.getElementsByTagName('head')[0].appendChild(cssStyle);

	var s2 = document.createElement('script');
	s2.type = 'text/javascript';
	s2.async = false;
	s2.src = 'https://api-maps.yandex.ru/2.1/?lang=ru-RU';
	document.getElementsByTagName('head')[0].appendChild(s2);

	var s = document.createElement('script');
	s.type = 'text/javascript';
	s.async = false;
	s.src = 'https://yandex.st/jquery/2.2.3/jquery.min.js';
	document.getElementsByTagName('head')[0].appendChild(s);

	setTimeout(function () {
	    ymaps.ready(init);
	}, 500);

	function init() {
	    var myMap = new ymaps.Map('map', {
	        center: [55.76, 37.64],
	        zoom: 10
	    }, {
	        searchControlProvider: 'yandex#search'
	    }),
	        objectManager = new ymaps.ObjectManager({
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

	    var myMap1 = new ymaps.Map('map1', {
	        center: [55.76, 37.64],
	        zoom: 10
	    }, {
	        searchControlProvider: 'yandex#search'
	    }),
	        objectManager1 = new ymaps.ObjectManager({
	        // Чтобы метки начали кластеризоваться, выставляем опцию.
	        clusterize: true,
	        // ObjectManager принимает те же опции, что и кластеризатор.
	        gridSize: 32,
	        clusterDisableClickZoom: false,

	        geoObjectOpenBalloonOnClick: false,
	        clusterOpenBalloonOnClick: false
	    });
	    objectManager1.objects.events.add(['click'], onObjectEvent);
	    objectManager1.clusters.events.add(['click'], onClusterEvent);
	    objectManager1.objects.options.set('preset', 'islands#greenDotIcon');
	    objectManager1.clusters.options.set('preset', 'islands#greenClusterIcons');
	    myMap1.geoObjects.add(objectManager1);

	    $.ajax({
	        url: './data.json'
	    }).done(function (data) {
	        objectManager.add(data);
	        objectManager1.add(data);
	    });

	    // console.log(myMap.getZoom();
	    // myMap.center = myMap.getBounds();

	    function onObjectEvent(e) {
	        var objectId = e.get('objectId');
	        modalWindow(objectId, e.originalEvent.currentTarget._objectsById);
	    }

	    function onClusterEvent(e) {
	        var objectId = e.get('objectId');
	        if (e.get('type') == 'mouseenter') {
	            objectManager.clusters.setClusterOptions(objectId, {
	                preset: 'islands#yellowClusterIcons'
	            });
	        } else {
	            objectManager.clusters.setClusterOptions(objectId, {
	                preset: 'islands#blueClusterIcons'
	            });
	        }
	    }

	    function closeModal() {
	        var inputs = document.getElementsByTagName('input'),
	            i = 0;
	        for (var _i = 0; _i < inputs.length; _i++) {
	            inputs[_i].removeEventListener('keydown', unblock, false);
	        }

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
	                for (var _i2 = 0; _i2 < res.length; _i2++) {
	                    switch (_i2) {
	                        case 0:
	                            nameValue = res[_i2] + '</div>';
	                            break;
	                        case 1:
	                            adresValue = res[_i2] + '</div>';
	                            break;
	                        case 2:
	                            descValue = res[_i2] + '</div>';
	                            break;
	                        case 3:
	                            telValue = res[_i2] + '</div>';
	                            break;
	                    }
	                }
	            }
	        });

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
	        m.innerHTML = '\n        <p> ' + (linkValue || '') + ' </p>\n        <div class=\'form-group\'>\n            ' + (nameValue || '') + ' \n        </div>\n        <div class=\'form-group\'>\n            ' + (adresValue || '') + ' \n        </div>\n        <div class=\'form-group\'>\n        ' + (descValue || '') + ' \n        </div>\n        <div class=\'form-group\'>\n            ' + (telValue || '') + ' \n        </div>\n        <div class=\'flex\'>\n            <button id=\'exit\'> \u0412\u044B\u0439\u0442\u0438 </button> \n            <button disabled id=\'save\'> \u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C </button>\n        </div>\n        ';
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
	        for (var _i3 = 0; _i3 < inputs.length; _i3++) {
	            inputs[_i3].addEventListener('keydown', unblock);
	        }
	    }
	}

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5N2NhMjFhNGVkOTJlMzg0YzNhZSIsIndlYnBhY2s6Ly8vZnJvbnRlbmQvanMvcGFnZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvanMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOTdjYTIxYTRlZDkyZTM4NGMzYWUiLCJ2YXIgY3NzU3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG5jc3NTdHlsZS50eXBlID0gJ3RleHQvY3NzJztcclxuY3NzU3R5bGUuaW5uZXJIVE1MID0gYFxyXG5odG1sLCBib2R5LCAjbWFwIHsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTsgcGFkZGluZzogMDsgbWFyZ2luOiAwOyBmb250LWZhbWlseTogVmVyZGFuYSwgQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjt9IFxyXG4jbWFwIHsgbWluLXdpZHRoOiAzMjBweDsgbWluLWhlaWdodDogNDgwcHg7IH1cclxucCB7IHRleHQtYWxpZ246IGNlbnRlcjsgZm9udC1zaXplOiAxNnB0OyB9XHJcbmxhYmVsIHsgd2lkdGg6IDEwMHB4OyBmb250LXNpemU6IDEycHQ7IH1cclxuaW5wdXQgeyB3aWR0aDogNDUwcHg7IGJvcmRlci1yYWRpdXM6IDdweDsgZm9udC1zaXplOiAxMXB0OyB9XHJcbnRleHRhcmVhIHsgd2lkdGg6IDQ0OHB4OyBib3JkZXItcmFkaXVzOiAxMHB4O31cclxuLmZvcm0tZ3JvdXAgZGl2IHsgZGlzcGxheTogZmxleDsgd2lkdGg6IDEwMCU7IHBhZGRpbmc6IDVweCAwO31cclxuLmZsZXggeyBkaXNwbGF5OiBmbGV4OyAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuOyBtYXJnaW46IDI1cHggMTBweDt9XHJcbiNkaXZNb2RhbCB7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAwOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlOyB6LWluZGV4OiAxMDA7IGJhY2tncm91bmQtY29sb3I6IHllbGxvdzsgb3BhY2l0eTogMC41IH1cclxuI3NwYW5Nb2RhbCB7IGxpbmUtaGVpZ2h0OiAzMHB4OyBjdXJzb3I6IHBvaW50ZXI7IGNvbG9yOiB5ZWxsb3c7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAxMHB4OyByaWdodDogMTBweDsgd2lkdGg6IDMwcHg7IGhlaWdodDogMzBweDsgYm9yZGVyLXJhZGl1czogNTAlOyB6LWluZGV4OiAxMTA7IGJhY2tncm91bmQtY29sb3I6IGJsdWU7IHRleHQtYWxpZ246IGNlbnRlcjsgfVxyXG4jZm9ybU1vZGFsIHsgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IDEwMHB4OyBsZWZ0OiAzNSU7IHRvcDogMjUlOyB3aWR0aDogNjAwcHg7IGhlaWdodDogNDAwcHg7IHBhZGRpbmc6IDIwcHg7IHotaW5kZXg6IDMwMDsgYm9yZGVyLXJhZGl1czogMiU7IGJhY2tncm91bmQtY29sb3I6IExpZ2h0Qmx1ZTsgfVxyXG4jZXhpdCB7IGJhY2tncm91bmQ6ICMzNDk4ZGI7IGJvcmRlci1yYWRpdXM6IDEwcHg7IGNvbG9yOiAjZmZmZmZmOyBmb250LXNpemU6IDEycHQ7IHBhZGRpbmc6IDVweCAxMHB4OyB0ZXh0LWRlY29yYXRpb246IG5vbmU7IGN1cnNvcjogcG9pbnRlcjt9XHJcbiNleGl0OmhvdmVyIHsgYmFja2dyb3VuZDogIzNjYjBmZDsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyBjdXJzb3I6IHBvaW50ZXI7IH1cclxuI3NhdmUge2JhY2tncm91bmQ6ICNkOTM0NWQ7IGJvcmRlci1yYWRpdXM6IDEwcHg7IGNvbG9yOiAjZmZmZmZmOyBmb250LXNpemU6IDEycHQ7ICBwYWRkaW5nOiA1cHggMTBweCB0ZXh0LWRlY29yYXRpb246IG5vbmU7IGN1cnNvcjogcG9pbnRlcjsgfVxyXG4jc2F2ZTpob3ZlciB7IGJhY2tncm91bmQ6ICNmYzNjNzM7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgY3Vyc29yOiBwb2ludGVyOyB9XHJcbiNzYXZlW2Rpc2FibGVkXSB7IGN1cnNvcjogZGVmYXVsdDsgYmFja2dyb3VuZC1jb2xvcjogZ3JleTsgfVxyXG4jbWFwMSB7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7ICBtaW4td2lkdGg6IDMyMHB4OyBtaW4taGVpZ2h0OiA0ODBweDsgfVxyXG5gXHJcbmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoY3NzU3R5bGUpO1xyXG5cclxudmFyIHMyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbnMyLnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcclxuczIuYXN5bmMgPSBmYWxzZTtcclxuczIuc3JjID0gICdodHRwczovL2FwaS1tYXBzLnlhbmRleC5ydS8yLjEvP2xhbmc9cnUtUlUnO1xyXG5kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHMyKTtcclxuXHJcbnZhciBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbnMudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xyXG5zLmFzeW5jID0gZmFsc2U7XHJcbnMuc3JjID0gICdodHRwczovL3lhbmRleC5zdC9qcXVlcnkvMi4yLjMvanF1ZXJ5Lm1pbi5qcyc7XHJcbmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQocyk7XHJcblxyXG5zZXRUaW1lb3V0KCgpID0+IHsgeW1hcHMucmVhZHkoaW5pdCk7fSwgNTAwKTtcclxuXHJcbmZ1bmN0aW9uIGluaXQgKCkge1xyXG4gICAgdmFyIG15TWFwID0gbmV3IHltYXBzLk1hcCgnbWFwJywge1xyXG4gICAgICAgIGNlbnRlcjogWzU1Ljc2LCAzNy42NF0sXHJcbiAgICAgICAgem9vbTogMTBcclxuICAgIH0sIHtcclxuICAgICAgICBzZWFyY2hDb250cm9sUHJvdmlkZXI6ICd5YW5kZXgjc2VhcmNoJ1xyXG4gICAgfSksXHJcbiAgICBvYmplY3RNYW5hZ2VyID0gbmV3IHltYXBzLk9iamVjdE1hbmFnZXIoe1xyXG4gICAgICAgIC8vINCn0YLQvtCx0Ysg0LzQtdGC0LrQuCDQvdCw0YfQsNC70Lgg0LrQu9Cw0YHRgtC10YDQuNC30L7QstCw0YLRjNGB0Y8sINCy0YvRgdGC0LDQstC70Y/QtdC8INC+0L/RhtC40Y4uXHJcbiAgICAgICAgY2x1c3Rlcml6ZTogdHJ1ZSxcclxuICAgICAgICAvLyBPYmplY3RNYW5hZ2VyINC/0YDQuNC90LjQvNCw0LXRgiDRgtC1INC20LUg0L7Qv9GG0LjQuCwg0YfRgtC+INC4INC60LvQsNGB0YLQtdGA0LjQt9Cw0YLQvtGALlxyXG4gICAgICAgIGdyaWRTaXplOiAzMixcclxuICAgICAgICBjbHVzdGVyRGlzYWJsZUNsaWNrWm9vbTogZmFsc2UsXHJcblxyXG4gICAgICAgIGdlb09iamVjdE9wZW5CYWxsb29uT25DbGljazogZmFsc2UsXHJcbiAgICAgICAgY2x1c3Rlck9wZW5CYWxsb29uT25DbGljazogZmFsc2VcclxuICAgIH0pO1xyXG4gICAgb2JqZWN0TWFuYWdlci5vYmplY3RzLmV2ZW50cy5hZGQoWydjbGljayddLCBvbk9iamVjdEV2ZW50KTtcclxuICAgIG9iamVjdE1hbmFnZXIuY2x1c3RlcnMuZXZlbnRzLmFkZChbJ2NsaWNrJ10sIG9uQ2x1c3RlckV2ZW50KTtcclxuXHJcbiAgICAvLyDQp9GC0L7QsdGLINC30LDQtNCw0YLRjCDQvtC/0YbQuNC4INC+0LTQuNC90L7Rh9C90YvQvCDQvtCx0YrQtdC60YLQsNC8INC4INC60LvQsNGB0YLQtdGA0LDQvCxcclxuICAgIC8vINC+0LHRgNCw0YLQuNC80YHRjyDQuiDQtNC+0YfQtdGA0L3QuNC8INC60L7Qu9C70LXQutGG0LjRj9C8IE9iamVjdE1hbmFnZXIuXHJcbiAgICBvYmplY3RNYW5hZ2VyLm9iamVjdHMub3B0aW9ucy5zZXQoJ3ByZXNldCcsICdpc2xhbmRzI2dyZWVuRG90SWNvbicpO1xyXG4gICAgb2JqZWN0TWFuYWdlci5jbHVzdGVycy5vcHRpb25zLnNldCgncHJlc2V0JywgJ2lzbGFuZHMjZ3JlZW5DbHVzdGVySWNvbnMnKTtcclxuICAgIG15TWFwLmdlb09iamVjdHMuYWRkKG9iamVjdE1hbmFnZXIpO1xyXG5cclxuICAgIHZhciBteU1hcDEgPSBuZXcgeW1hcHMuTWFwKCdtYXAxJywge1xyXG4gICAgICAgIGNlbnRlcjogWzU1Ljc2LCAzNy42NF0sXHJcbiAgICAgICAgem9vbTogMTBcclxuICAgIH0sIHtcclxuICAgICAgICBzZWFyY2hDb250cm9sUHJvdmlkZXI6ICd5YW5kZXgjc2VhcmNoJ1xyXG4gICAgfSksXHJcbiAgICBvYmplY3RNYW5hZ2VyMSA9IG5ldyB5bWFwcy5PYmplY3RNYW5hZ2VyKHtcclxuICAgICAgICAvLyDQp9GC0L7QsdGLINC80LXRgtC60Lgg0L3QsNGH0LDQu9C4INC60LvQsNGB0YLQtdGA0LjQt9C+0LLQsNGC0YzRgdGPLCDQstGL0YHRgtCw0LLQu9GP0LXQvCDQvtC/0YbQuNGOLlxyXG4gICAgICAgIGNsdXN0ZXJpemU6IHRydWUsXHJcbiAgICAgICAgLy8gT2JqZWN0TWFuYWdlciDQv9GA0LjQvdC40LzQsNC10YIg0YLQtSDQttC1INC+0L/RhtC40LgsINGH0YLQviDQuCDQutC70LDRgdGC0LXRgNC40LfQsNGC0L7RgC5cclxuICAgICAgICBncmlkU2l6ZTogMzIsXHJcbiAgICAgICAgY2x1c3RlckRpc2FibGVDbGlja1pvb206IGZhbHNlLFxyXG5cclxuICAgICAgICBnZW9PYmplY3RPcGVuQmFsbG9vbk9uQ2xpY2s6IGZhbHNlLFxyXG4gICAgICAgIGNsdXN0ZXJPcGVuQmFsbG9vbk9uQ2xpY2s6IGZhbHNlXHJcbiAgICB9KTtcclxuICAgIG9iamVjdE1hbmFnZXIxLm9iamVjdHMuZXZlbnRzLmFkZChbJ2NsaWNrJ10sIG9uT2JqZWN0RXZlbnQpO1xyXG4gICAgb2JqZWN0TWFuYWdlcjEuY2x1c3RlcnMuZXZlbnRzLmFkZChbJ2NsaWNrJ10sIG9uQ2x1c3RlckV2ZW50KTtcclxuICAgIG9iamVjdE1hbmFnZXIxLm9iamVjdHMub3B0aW9ucy5zZXQoJ3ByZXNldCcsICdpc2xhbmRzI2dyZWVuRG90SWNvbicpO1xyXG4gICAgb2JqZWN0TWFuYWdlcjEuY2x1c3RlcnMub3B0aW9ucy5zZXQoJ3ByZXNldCcsICdpc2xhbmRzI2dyZWVuQ2x1c3Rlckljb25zJyk7XHJcbiAgICBteU1hcDEuZ2VvT2JqZWN0cy5hZGQob2JqZWN0TWFuYWdlcjEpO1xyXG5cclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnLi9kYXRhLmpzb24nXHJcbiAgICB9KS5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICBvYmplY3RNYW5hZ2VyLmFkZChkYXRhKTtcclxuICAgICAgICBvYmplY3RNYW5hZ2VyMS5hZGQoZGF0YSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBjb25zb2xlLmxvZyhteU1hcC5nZXRab29tKCk7XHJcbiAgICAvLyBteU1hcC5jZW50ZXIgPSBteU1hcC5nZXRCb3VuZHMoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBvbk9iamVjdEV2ZW50IChlKSB7XHJcbiAgICAgICAgdmFyIG9iamVjdElkID0gZS5nZXQoJ29iamVjdElkJyk7XHJcbiAgICAgICAgbW9kYWxXaW5kb3cob2JqZWN0SWQsIGUub3JpZ2luYWxFdmVudC5jdXJyZW50VGFyZ2V0Ll9vYmplY3RzQnlJZCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIG9uQ2x1c3RlckV2ZW50IChlKSB7XHJcbiAgICAgICAgdmFyIG9iamVjdElkID0gZS5nZXQoJ29iamVjdElkJyk7XHJcbiAgICAgICAgaWYgKGUuZ2V0KCd0eXBlJykgPT0gJ21vdXNlZW50ZXInKSB7XHJcbiAgICAgICAgICAgIG9iamVjdE1hbmFnZXIuY2x1c3RlcnMuc2V0Q2x1c3Rlck9wdGlvbnMob2JqZWN0SWQsIHtcclxuICAgICAgICAgICAgICAgIHByZXNldDogJ2lzbGFuZHMjeWVsbG93Q2x1c3Rlckljb25zJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBvYmplY3RNYW5hZ2VyLmNsdXN0ZXJzLnNldENsdXN0ZXJPcHRpb25zKG9iamVjdElkLCB7XHJcbiAgICAgICAgICAgICAgICBwcmVzZXQ6ICdpc2xhbmRzI2JsdWVDbHVzdGVySWNvbnMnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZU1vZGFsICgpIHtcclxuICAgICAgICBsZXQgaW5wdXRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0JyksaT0wO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRzLmxlbmd0aDsgaSsrKSB7IFxyXG4gICAgICAgICAgICBpbnB1dHNbaV0ucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHVuYmxvY2ssIGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0ZXh0YXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGV4dGFyZWEnKSxqPTA7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0ZXh0YXIubGVuZ3RoOyBqKyspIHsgXHJcbiAgICAgICAgICAgIHRleHRhcltqXS5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdW5ibG9jaywgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW9kYWwnKTtcclxuICAgICAgICB3aGlsZShlbGVtZW50cy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgZWxlbWVudHNbMF0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50c1swXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVuYmxvY2sgKCkge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzYXZlJykuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtb2RhbFdpbmRvdyAob2JqLCBzdGFydEFycikge1xyXG4gICAgICAgIHZhciBsaW5rVmFsdWU7XHJcbiAgICAgICAgdmFyIG5hbWVWYWx1ZTtcclxuICAgICAgICB2YXIgYWRyZXNWYWx1ZTtcclxuICAgICAgICB2YXIgZGVzY1ZhbHVlO1xyXG4gICAgICAgIHZhciB0ZWxWYWx1ZTtcclxuICAgICAgICBPYmplY3Qua2V5cyhzdGFydEFycikubWFwKFxyXG4gICAgICAgICAgICBrZXkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gb2JqICsgJycpIHtcclxuICAgICAgICAgICAgICAgICAgICBsaW5rVmFsdWUgPSBzdGFydEFycltrZXldLnByb3BlcnRpZXMuYmFsbG9vbkNvbnRlbnRIZWFkZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlua1ZhbHVlID0gbGlua1ZhbHVlLmxlbmd0aCA8IDkwID8gJ9CY0L3RhNC+0YDQvNCw0YbQuNGPINC+0LEg0L7RgNCz0LDQvdC40LfQsNGG0LjQuCcgOiBsaW5rVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0ciA9IHN0YXJ0QXJyW2tleV0ucHJvcGVydGllcy5iYWxsb29uQ29udGVudEJvZHk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlcyA9IHN0ci5zcGxpdCgnPC9kaXY+Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZVZhbHVlID0gcmVzW2ldICsgJzwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRyZXNWYWx1ZSA9IHJlc1tpXSArICc8L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NWYWx1ZSA9IHJlc1tpXSArICc8L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbFZhbHVlID0gcmVzW2ldICsgJzwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIHZhciBkbXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBkbXcuaWQgPSAnZGl2TW9kYWwnO1xyXG4gICAgICAgIGRtdy5jbGFzc05hbWUgPSAnbW9kYWwnO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKS5hcHBlbmRDaGlsZChkbXcpO1xyXG5cclxuICAgICAgICB2YXIgc3AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgc3AuaWQgPSAnc3Bhbk1vZGFsJztcclxuICAgICAgICBzcC5jbGFzc05hbWUgPSAnbW9kYWwnO1xyXG4gICAgICAgIHNwLmlubmVySFRNTCA9ICdYJztcclxuICAgICAgICBzcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlTW9kYWwpO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKS5hcHBlbmRDaGlsZChzcCk7XHJcblxyXG4gICAgICAgIHZhciBtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgbS5pZCA9ICdmb3JtTW9kYWwnO1xyXG4gICAgICAgIG0uY2xhc3NOYW1lID0gJ21vZGFsJztcclxuICAgICAgICBtLmlubmVySFRNTCA9IGBcclxuICAgICAgICA8cD4gJHtsaW5rVmFsdWUgfHwgJyd9IDwvcD5cclxuICAgICAgICA8ZGl2IGNsYXNzPSdmb3JtLWdyb3VwJz5cclxuICAgICAgICAgICAgJHtuYW1lVmFsdWUgfHwgJyd9IFxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9J2Zvcm0tZ3JvdXAnPlxyXG4gICAgICAgICAgICAke2FkcmVzVmFsdWUgfHwgJyd9IFxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9J2Zvcm0tZ3JvdXAnPlxyXG4gICAgICAgICR7ZGVzY1ZhbHVlIHx8ICcnfSBcclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPSdmb3JtLWdyb3VwJz5cclxuICAgICAgICAgICAgJHt0ZWxWYWx1ZSB8fCAnJ30gXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz0nZmxleCc+XHJcbiAgICAgICAgICAgIDxidXR0b24gaWQ9J2V4aXQnPiDQktGL0LnRgtC4IDwvYnV0dG9uPiBcclxuICAgICAgICAgICAgPGJ1dHRvbiBkaXNhYmxlZCBpZD0nc2F2ZSc+INCh0L7RhdGA0LDQvdC40YLRjCA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLmFwcGVuZENoaWxkKG0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhpdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VNb2RhbCk7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NhdmUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlTW9kYWwpO1xyXG5cclxuICAgICAgICBsZXQgdGV4dGFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RleHRhcmVhJyksaj0wO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGV4dGFyLmxlbmd0aDsgaisrKSB7IFxyXG4gICAgICAgICAgICB0ZXh0YXJbal0uYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHVuYmxvY2spO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGlucHV0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbnB1dCcpLGk9MDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0cy5sZW5ndGg7IGkrKykgeyBcclxuICAgICAgICAgICAgaW5wdXRzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB1bmJsb2NrKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGZyb250ZW5kL2pzL3BhZ2UuanMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFtQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBREE7QUFIQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFSQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFEQTtBQUhBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVpBO0FBY0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQW1CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==