const request = require("supertest");
const app = require("../server");


describe('Test Functions', function () {


    test('responds to api/fuel/gethistory/:uid', () => {

        return request(app)
            .get("/api/fuel/gethistory/34")
            .then(response => {
                expect(response.statusCode).toBe(200);
            })

    })


    
})