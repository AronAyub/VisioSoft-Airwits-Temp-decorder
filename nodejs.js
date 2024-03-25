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
                value: "(" + payload.cloc.lat + "," + payload.cloc.lng + ")"
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

        var temperature = (data[0] << 8 | data[1]) / 10.0;
        var temp1;
        var temp2;
        var temp3;
        var temp4;
        var voltage;


        var battery = data[2] / 10.0;

        return [
            {
                device: device,
                field: "temp1",
                value: temp1
            },
            {
                device: device,
                field: "temp2",
                value: temp2
            },
            {
                device: device,
                field: "temp3",
                value: temp3
            },
            {
                device: device,
                field: "temp4",
                value: temp4
            },
            {
                device: device,
                field: "voltage",
                value: voltage
            }

        ];
    }
}