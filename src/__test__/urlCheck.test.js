import {checkForUrl} from '../client/js/urlChecker'


describe('Test, the function "validURL()" should exist' , () => {
    test('It should return true', async () => {
        expect(checkForUrl).toBeDefined();
    });
});


describe('Test, the function "validURL()" for valid url' , () => {
    var url = "https://api.aylien.com/api/v1";
    test('It should return true', async () => {
        const response = checkForUrl(url);
        expect(response).toBeDefined();
        expect(response).toBe(true);
    });
});
