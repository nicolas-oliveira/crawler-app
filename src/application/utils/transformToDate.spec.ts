import transformToDate from './transformToDate';

describe('transformToDate', () => {
  it('should correctly parse a date string to a Date object', () => {
    const dateString = '2022-04-20';
    const expectedDate = new Date(2022, 3, 20); // Note: Month is 0-indexed in JS Dates

    const result = transformToDate(dateString);

    expect(result).toEqual(expectedDate);
  });
});