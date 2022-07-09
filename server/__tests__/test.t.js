const request = require("supertest");
const app = require("../server");



describe('Test Functions', function () {


    test('responds to api/fuel/gethistory/:uid', () => {

        return request(app)
            .get("/api/fuel/gethistory/34")
            .then(response => {
                
                expect(response.statusCode).toBe(200);

                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            uid: "34",
                            address: expect.any(String),
                            date: expect.any(String),
                            gallonsRequested: expect.any(Number),
                            suggested: expect.any(Number),
                            total: expect.any(Number)
                        })
                    ])
                )
            })

    })

    test('responds to api/fuel/getprice', () => {

        return request(app)
            .post("/api/fuel/getprice")
            .expect("Content-Type", /json/)
            .send({
                state: "TX",
                previousHistory: true,
                gallonsRequested: 1342
            })
            .then(response => {
                
                expect(response.statusCode).toBe(200);

                expect(response.body).toEqual(
                    expect.objectContaining({
                        suggested: expect.any(Number),
                        total: expect.any(Number)
                    })
                    
                )
            })

    })


    
})