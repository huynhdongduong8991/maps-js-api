let map;

function initMap() {
    const myLatLng = { lat: 13.760835165053019, lng: 109.22077537298439 };

    const options = {
        center: myLatLng,
        zoom: 15
    }

    const map = new google.maps.Map(document.getElementById("map"), options);

    $.getJSON("data.json", function (json) {

        for (var i = 0; i < json.length; i++) {

            var obj = json[i];

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(obj.lat, obj.lng),
                map: map,
                title: obj.title
            });

            var clicker = addClicker(marker, obj.title);
        }
    });

    function addClicker(marker, content) {
        google.maps.event.addListener(marker, 'click', function () {

            const infoWindow = new google.maps.InfoWindow({
                content: content
            });

            if (infoWindow) {
                infoWindow.close();
            }

            infoWindow.open(map, marker)
        });
    }

    google.maps.event.addDomListener(window, 'load', initMap);

    const contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<div id="bodyContent">' +
        "<p><h1> Khu vực cảnh báo </h1></p>" +
        "</div>" +
        "</div>";

    const infoWindow = new google.maps.InfoWindow({
        content: contentString
    });

    function placeMarkerAndPanTo(latLng, map) {
        const marker = new google.maps.Marker({
            position: latLng,
            map
        });

        map.panTo(latLng);

        marker.addListener('click', () => {
            infoWindow.open({
                anchor: marker,
                map,
                shouldFocus: false
            });
        });

    }

    map.addListener('click', (e) => {
        placeMarkerAndPanTo(e.latLng, map);
    });

}