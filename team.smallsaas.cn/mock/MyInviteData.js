export default {

    'GET /api/MyInviteData':

    {
        "code": 200, "data": {
            "current": "1",
            "total": "4",
            "hitCount": false,
            "pages": "1",
            "optimizeCountSql": true,
            "size": "10",
            "records": [{
                "code": 64535164,
                "phone": "13319975000",
                "level": null,
                "name": "二级代理商",
                "id": "53",
                "status": "Unauthorized"
            },
          {
                "code": 64535167,
                "phone": "13819975000",
                "level": "TERTIARY_AGENT",
                "name": "二级代理商",
                "id": "56",
                "status": "Authorized"
            },
            {
                "code": 64535166,
                "phone": "15019975000",
                "level": "SECONDARY_AGENT",
                "name": "二级代理商",
                "id": "64",
                "status": "Authorized"
            },
            {
                "code": 64535134,
                "phone": "15019975000",
                "level": "SECONDARY_AGENT",
                "agentName": "二级代理商",
                "id": "65",
                "status": "Authorized"
            }],
            "searchCount": true,
            "orders": []
        },
        "message": "Success"
    }

}