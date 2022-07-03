const auth_link = "https://www.strava.com/oauth/token";

function getActivities(res) {
    const activitiesLink = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`;

    fetch(activitiesLink)
        .then((res) => res.json())
        .then((data) => {
            var map = L.map("map").setView([11.017720, 107.173920], 15);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);

            data.forEach(ele => {
                let coordinates = L.Polyline.fromEncoded(ele.map.summary_polyline).getLatLngs();
                console.log(coordinates);
                L.polyline(
                    coordinates,
                    {
                        color: 'green',
                        weight: 5,
                        opacity: 7,
                        lineJoin: 'round'
                    }
                ).addTo(map)
            });
        });
}

function reAuthorize() {
    fetch(auth_link, {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            client_id: "89041",
            client_secret: "bba96a405eeaefa81764972282f55186c6d9387d",
            refresh_token: "f2fb792bdfea7b563f72d3049f6ae414f85a0fc6",
            grant_type: "refresh_token",
        }),
    })
        .then((res) => res.json())
        .then((res) => getActivities(res));
}

reAuthorize();
