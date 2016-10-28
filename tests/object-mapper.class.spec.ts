import { ObjectMapper } from '..';

describe('ObjectMapper', () => {
    it('should exist', () => {
        expect(ObjectMapper).toBeDefined();
    });

    it('should be a constructor', () => {
        const mapper = new ObjectMapper();
        expect(mapper).toBeDefined();
    });
});
