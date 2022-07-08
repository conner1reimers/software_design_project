const request = require("supertest");
const app = require("../server");


// const fuelHistoryTemplate = [
//     {
//         address: "5683 Willow Tail st",
//         date: Date.toDateString(),
//         username: 123,
//         gallonsRequested: 1002,
//         suggested: 1.675,
//         total: 1688
//     },
//     {
//         address: "5683 Willow Tail st",
//         date: Date.toDateString(),
//         username: 1234,
//         gallonsRequested: 1002,
//         suggested: 1.675,
//         total: 1688
//     },
// ];


describe('Test Functions', function () {


    test('responds to api/fuel/gethistory/:uid', () => {

        return request(app)
            .get("/api/fuel/gethistory/34")
            .then(response => {
                expect(response.statusCode).toBe(200);
                console.log(response.body);

                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({uid: "34"})
                    ])
                )
            })

    })


    
})