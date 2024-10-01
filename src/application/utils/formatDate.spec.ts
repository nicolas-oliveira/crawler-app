import formatDate from './formatDate';

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = '2022-05-20';
    const formattedDate = formatDate(date);
    expect(formattedDate).toEqual('20-05-2022');
  });
});