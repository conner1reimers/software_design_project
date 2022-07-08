const fuelController = require('../controllers/fuel');


describe('Test Functions', function () {
    test('responds to api/fuel/gethistory/:uid', () => {
        const req = {param: {uid: 43}};
        const res = { 
            text: '', 
            stat: '',
            status: function(input) {
                this.stat = input;
                return {
                    json: function(input) {
                        this.text = input;
                    }
                }
            },
        }

        fuelController.getHistory(req, res);

        console.log(res.text)

        expect(res.stat).toBe(200)
    })
})