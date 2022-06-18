import { Form } from '../classes/Form.js';

describe('Form class', () => {
    let form;

    beforeEach(() => {
        form = new Form();
    })
    it('initializes form instance', () => {
        expect(form).toBeDefined();
    });
})