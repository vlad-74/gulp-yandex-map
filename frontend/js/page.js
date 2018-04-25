import { getForm } from './form';
import { loadjscssfile } from './create';

loadjscssfile("/styles/index.css", "css") 
loadjscssfile("https://api-maps.yandex.ru/2.1/?lang=ru-RU", "js");
loadjscssfile("https://yandex.st/jquery/2.2.3/jquery.min.js", "js");

setTimeout(() => { ymaps.ready(init);}, 500);

function init () {
    var myMap = new ymaps.Map('map', {center: [55.76, 37.64], zoom: 10}, {searchControlProvider: 'yandex#search'});
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
    }).done(function(data) {
        objectManager.add(data);
    });
    
    function onObjectEvent (e) {
        var objectId = e.get('objectId');
        modalWindow(objectId, e.originalEvent.currentTarget._objectsById);
    }
    
    function onClusterEvent (e) {
        var objectId = e.get('objectId');
        if (e.get('type') == 'mouseenter') {
            objectManager.clusters.setClusterOptions(objectId, { preset: 'islands#yellowClusterIcons'});
        } else {
            objectManager.clusters.setClusterOptions(objectId, { preset: 'islands#blueClusterIcons' });
        }
    }

    function closeModal () {
        let textar = document.getElementsByTagName('textarea'),j=0;
        for (let j = 0; j < textar.length; j++) { 
            textar[j].removeEventListener('keydown', unblock, false);
        }

        var elements = document.getElementsByClassName('modal');
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }

    function unblock () {
        document.getElementById('save').disabled = false;
    }

    function modalWindow (obj, startArr) {
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
        m.innerHTML = getForm(obj, startArr);

        document.getElementById('map').appendChild(m);

        document.getElementById('exit').addEventListener('click', closeModal);
        document.getElementById('save').addEventListener('click', closeModal);

        let textar = document.getElementsByTagName('textarea'),j=0;
        for (let j = 0; j < textar.length; j++) { 
            textar[j].addEventListener('keydown', unblock);
        }

        let inputs = document.getElementsByTagName('input'),i=0;
        for (let i = 0; i < inputs.length; i++) { 
            inputs[i].disabled = true;
        }

    }
}