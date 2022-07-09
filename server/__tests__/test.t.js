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


    
    test('responds to api/users/login', () => {
       
        return request(app)
            .post("/api/users/login")
            .expect("Content-Type", /json/)
            .send({
                username: "tmnguyen",   
                password: "tmnguyen11"
            }) 
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toEqual(
                    expect.objectContaining({
                    username: expect.any(String),
                    password: expect.any(String),

                })
            )
            })
        })
    test('responds to api/fuel/submitquote', () => {

        return request(app)
        .post("/api/fuel/submitquote")
        .expect("Content-Type", /json/)
        .send({
            address:'1234 Test Adress Lane',
                username:'user12',
                date:"2022-04-01",
                gallonsRequested:10,
                suggested:400,
                total:500
        }) 
                
            .then(response => {
                
                expect(response.statusCode).toBe(200);

                expect(response.body).toEqual(
                   
                    expect.objectContaining({
                        /*address: expect.any(String),
                        username: expect.any(String),
                        date: expect.any(String),
                        gallonsRequested: expect.any(Number),
                        suggested: expect.any(Number),
                        total: expect.any(Number)*/
                        
                        address: ('1234 Test Adress Lane'),
                        username:('user12'),
                        date: ("2022-04-01"),
                        gallonsRequested:(10),
                        suggested: (400),
                        total: (500)
                    })
                    
                )
            })

    })
   
    test('responds to api/users/User_profile/', () => {

        return request(app)
            .post("/api/users/User_profile/")
            .expect("Content-Type", /json/)
            .send({
                name:'John Doe',
                address1:'1111 street lane',
                address2:'building 2',
                city:"Houston-04-01",
                state:"TX",
                zip:98745
        }) 
            .then(response => {
                
                expect(response.statusCode).toBe(200);

                expect(response.body).toEqual(
                    
                        expect.objectContaining({
                            name:'John Doe',
                            address1:'1111 street lane',
                            address2:'building 2',
                            city:"Houston-04-01",
                            state:"TX",
                            zip:98745
                        })
                    
                )
            })

    })




    test('responds to api/users/register', () => {
       
        return request(app)
            .post("/api/users/register")
            .expect("Content-Type", /json/)
            .send({
                username: "tmnguyen",   
                password: "tmnguyen11",
                password2: "tmnguyen11"
            }) 
            .then(response => {
                expect(response.statusCode).toBe(200);

                expect(response.body).toEqual(
                    expect.objectContaining({
                    username: expect.any(String),
                    password: expect.any(String),
                    //password2: expect.any(String)
                })
            )
        })
    })
    
})