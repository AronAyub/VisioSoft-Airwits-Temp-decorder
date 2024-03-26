//@AronAyub 2024

function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}

function Decoder(request) {

    if (request.path.indexOf("service") !== -1) {

        var payload = JSON.parse(request.body);

        return [
            {
                device: payload.device,
                field: "LOCATION",
                //value: "(" + payload.cloc.lat + "," + payload.cloc.lng + ")"
                value: "-1.3302908,36.8638554"
                //value: payload.location
            },
            {
                device: payload.device,
                field: "LINK_QUALITY",
                value: payload.lqi
            },
            {
                device: payload.device,
                field: "OPERATOR_NAME",
                value: payload.opName
            },
            {
                device: payload.device,
                field: "LINK_QUALITY_VALUE",
                value: payload.linkQuality
            }
        ];

    } else if (request.path.indexOf("data") !== -1) {

        var payload = request["GET"];
        var device = payload.id[0];
        var data = hexToBytes(payload.data[0]);

        var temperature = ((data[0] << 8 | data[1]) / 10) - 40;
        var humidity = data[2] / 1.0;

        return [
            {
                device: device,
                field: "TEMPERATURE",
                value: temperature
            },
            {
                device: device,
                field: "HUMIDITY",
                value: humidity
            }
        ];
    }
}