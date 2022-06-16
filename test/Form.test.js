import { jest } from '@jest/globals';
import { Form } from '../classes/Form';


describe('Form class', () => {
    it('initializes form instance', () => {
        const form = new Form();
        expect(form).toBeDefined();
    })
})