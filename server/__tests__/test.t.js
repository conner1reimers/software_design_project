const request = require("supertest");
const app = require("../server");
var randomstring = require("randomstring");

describe('Test Functions', function () {


    test('responds to api/fuel/gethistory/:uid', () => {

        return request(app)
            .get("/api/fuel/gethistory/1")
            .then(response => {
                
                expect(response.statusCode).toBe(200);

                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            delivery_address: expect.any(String),
                            delivery_date: expect.any(String),
                            gallons: expect.any(Number),
                            suggested: expect.any(Number),
                            total: expect.any(Number),
                            uid: expect.any(Number),
                            id: expect.any(Number)
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
                username: "test123",   
                password: "test123"
            }) 
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toEqual(
                    expect.objectContaining({
                        hasPreviousPurchase: expect.any(Boolean),
                        uid: expect.any(Number),
                        userInfo: expect.any(Object)
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
            uid: 1,
            suggested:400,
            total:500
        }) 
                
            .then(response => {
                
                expect(response.statusCode).toBe(200);

                expect(response.body).toEqual(
                   
                    expect.objectContaining({
                        msg: expect.stringMatching("Successful insert to database")
                    })
                    
                )
            })

    })
    
    test('responds to api/user/checkcookie', () => {

        return request(app)
        .get("/api/users/checkcookie")
        .set('Cookie', ['sid=282c3ac1-26c6-449b-bb26-e1b21fcdd229'])
            .then(response => {
                
                expect(response.statusCode).toBe(200);

                expect(response.body).toEqual(
                   
                    expect.objectContaining({
                        msg: expect.stringMatching("cookie found"),
                        hasPreviousPurchase: expect.any(Boolean),
                        uid: expect.any(Number),
                        userInfo: expect.any(Object)
                    })
                    
                )
            })

    })

    test('responds to api/user/logout', () => {
        return request(app)
        .get("/api/users/logout")
            .then(response => {
                
                expect(response.statusCode).toBe(200);

                expect(response.body).toEqual(
                    expect.objectContaining({
                        msg: expect.stringMatching("no cookie")
                    })
                )
            })
    })
    
   
    test('responds to api/users/User_profile/', () => {

        return request(app)
            .post("/api/users/User_profile/")
            .expect("Content-Type", /json/)
            .send({
                uid: 1,
                name:'John Doe',
                address1:'1111 street lane',
                address2:'building 2',
                city:"Houston-04-01",
                state:"TX",
                infoSet: true,
                zip:98745
        }) 
            .then(response => {
                
                expect(response.statusCode).toBe(200);

                expect(response.body).toEqual(
                    
                        expect.objectContaining({
                            msg: "successful user info insert"
                        })
                    
                )
            })

    })




    test('responds to api/users/register', () => {
        const testUsername = randomstring.generate(10);
        const testPass = randomstring.generate(10);
        return request(app)
            .post("/api/users/register")
            .expect("Content-Type", /json/)
            .send({
                username: testUsername,   
                password: testPass,
                password2: testPass
            }) 
            .then(response => {
                expect(response.statusCode).toBe(200);

                expect(response.body).toEqual(
                    expect.objectContaining({
                    id: expect.any(Number),
                    msg: expect.stringMatching("Successfully Created an Account"),
                })
            )
        })
    })
    
})

describe('Fail Functions', function () {
    test('responds to api/users/User_profile/', () => {
        return request(app)
            .post("/api/users/User_profile/")
            .expect("Content-Type", /json/)
            .send({
                name:'f',
                address1:'',
                address2:'building 2',
                city:"Houston-04-01",
                state:"fgdf",
                zip:98745
            }) 
            .then(response => {
                expect(response.statusCode).toBe(422);})

    })
    test('1 responds to fails api/users/User_profile/', () => {
        return request(app)
            .post("/api/users/User_profile/")
            .expect("Content-Type", /json/)
            .send({
                uid: 1,
                name:'fredrick tempt',
                address1:'48377 tss street',
                address2:'building 2',
                city:"Houston-04-01",
                state:"fgdf",
                zip:3
            }) 
            .then(response => {
                expect(response.statusCode).toBe(422);})

    })
    test('2 responds to and fails api/users/User_profile/', () => {
        return request(app)
            .post("/api/users/User_profile/")
            .expect("Content-Type", /json/)
            .send({
                uid: 3,
                name:'fredrick tempt',
                address1:'',
                address2:'building 2',
                city:"Houston-04-01",
                state:"fgdf",
                zip:34242
            }) 
            .then(response => {
                expect(response.statusCode).toBe(422);})

    })
    test('3 responds to and fails api/users/User_profile/', () => {
        return request(app)
            .post("/api/users/User_profile/")
            .expect("Content-Type", /json/)
            .send({
                uid: 3,
                name:'fredrick tempt',
                address1:'13135 street',
                address2:'building 2',
                city:"",
                state:"TX",
                zip:34242
            }) 
            .then(response => {
                expect(response.statusCode).toBe(422);})

    })

    test('responds to api/users/login', () => {
        return request(app)
            .post("/api/users/login")
            .expect("Content-Type", /json/)
            .send({
                username:'f',
                password:'',
            }) 
            .then(response => {expect(response.statusCode).toBe(422);})
    })
    test('responds to fails 2 api/users/login', () => {
        return request(app)
            .post("/api/users/login")
            .expect("Content-Type", /json/)
            .send({
                username:'ftest222',
                password:'ftest222',
            }) 
            .then(response => {expect(response.statusCode).toBe(422);})
    })
    test('responds to fails 3 api/users/login', () => {
        return request(app)
            .post("/api/users/login")
            .expect("Content-Type", /json/)
            .send({
                username:'ftest222',
                password:'asd',
            }) 
            .then(response => {expect(response.statusCode).toBe(422);})
    })
    test('1 responds to and fails api/users/register', () => {
        return request(app)
            .post("/api/users/register")
            .expect("Content-Type", /json/)
            .send({
                username:'testusername',
                password:'testpass',
                password2: 'ptestpas22'
            }) 
            .then(response => {expect(response.statusCode).toBe(422);})
    })
    test('2 responds to and fails api/users/register', () => {
        return request(app)
            .post("/api/users/register")
            .expect("Content-Type", /json/)
            .send({
                username:'jkx',
                password:'testpass',
                password2: 'testpass'
            }) 
            .then(response => {expect(response.statusCode).toBe(422);})
    })
    test('3 responds to and fails api/users/register', () => {
        return request(app)
            .post("/api/users/register")
            .expect("Content-Type", /json/)
            .send({
                username:'username',
                password:'tx',
                password2: 'tx'
            }) 
            .then(response => {expect(response.statusCode).toBe(422);})
    })
    test('responds to and fails api/fuel/getprice', () => {
        return request(app)
            .post("/api/fuel/getprice")
            .expect("Content-Type", /json/)
            .send({
                state: "TX",
                previousHistory: true,
                gallonsRequested: "not num"
            })
            .then(response => {expect(response.statusCode).toBe(422);})
    })
    test('1 responds to and fails api/fuel/submitquote', () => {

        return request(app)
        .post("/api/fuel/submitquote")
        .expect("Content-Type", /json/)
        .send({
            address:'1234 Test Adress Lane',
            uid:3,
            date:"2022-04-01",
            gallonsRequested:431,
            suggested:555,
            total:"not num"
        })
        .then(response => {expect(response.statusCode).toBe(422); })
    })
    test('2 responds to and fails api/fuel/submitquote', () => {

        return request(app)
        .post("/api/fuel/submitquote")
        .expect("Content-Type", /json/)
        .send({
            address:'1234 Test Adress Lane',
            uid:2,
            date:"2022-04-01",
            gallonsRequested:"not num",
            suggested:555,
            total:652
        })
        .then(response => {expect(response.statusCode).toBe(422); })
    })
    test('3 responds to and fails api/fuel/submitquote', () => {

        return request(app)
        .post("/api/fuel/submitquote")
        .expect("Content-Type", /json/)
        .send({
            address:'1234 Test Adress Lane',
            uid:2,
            date:"2022-04-01",
            gallonsRequested:241,
            suggested:"not num",
            total:652
        })
        .then(response => {expect(response.statusCode).toBe(422); })
    })
    test('4 responds to and fails api/fuel/submitquote', () => {

        return request(app)
        .post("/api/fuel/submitquote")
        .expect("Content-Type", /json/)
        .send({
            address:'1234 Test Adress Lane',
            uid:5,
            date:"2022-04-01",
            gallonsRequested:241,
            suggested:413,
            total:"not num"
        })
        .then(response => {expect(response.statusCode).toBe(422); })
    })
    test('5 responds to and fails api/fuel/submitquote', () => {

        return request(app)
        .post("/api/fuel/submitquote")
        .expect("Content-Type", /json/)
        .send({
            address:'1234 Test Adress Lane',
            uid:'user12',
            date:1,
            gallonsRequested:241,
            suggested:413,
            total:44
        })
        .then(response => {expect(response.statusCode).toBe(422); })
    })


    
})