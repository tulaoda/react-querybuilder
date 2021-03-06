import generateValidQuery from './generateValidQuery';

describe('generateValidQuery', () => {
  describe('when initial query, with ID, is provided', () => {
    const queryWithID = {
      id: 'g-12345',
      combinator: 'and',
      rules: [
        {
          id: 'r-12345',
          field: 'firstName',
          value: 'Test',
          operator: '='
        }
      ]
    };

    it('should not generate new ID if query provides ID', () => {
      const validQuery = generateValidQuery(queryWithID);
      expect(validQuery.id).to.equal('g-12345');
      expect(validQuery.rules[0].id).to.equal('r-12345');
    });
  });

  describe('when initial query, without ID, is provided', () => {
    const queryWithoutID = {
      combinator: 'and',
      rules: [
        {
          field: 'firstName',
          value: 'Test without ID',
          operator: '='
        }
      ]
    };

    it('should generate IDs if missing in query', () => {
      expect(queryWithoutID).to.not.haveOwnProperty('id');
      const validQuery = generateValidQuery(queryWithoutID);
      expect(validQuery).haveOwnProperty('id');
      expect(validQuery.rules[0]).haveOwnProperty('id');
    });
  });
});
