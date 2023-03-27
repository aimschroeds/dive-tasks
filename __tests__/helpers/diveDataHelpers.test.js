import {
    validateDiveData,
    convertUnits,
    formatStartTime,
    formatEndTime,
    calculateBottomTime,
    calculatePressureUsed,
  } from '../../helpers/diveDataHelpers';
  
  describe('validateDiveData', () => {
    it('validates correct dive data', () => {
      const diveData = {
        startTime: new Date('2023-05-01T12:00:00Z'),
        endTime: new Date('2023-05-01T13:00:00Z'),
        startPressure: 200,
        endPressure: 100,
        maxDepth: 30,
        waterTemperature: 25,
        visibility: 10,
      };
      const result = validateDiveData(diveData);
      expect(result).toEqual({ isValid: true });
    });
  
  });
  
  describe('convertUnits', () => {
    it('converts imperial units to metric units', () => {
      const imperialDiveData = {
        maxDepth: 98.4,
        waterTemperature: 77,
        visibility: 32.8,
        startPressure: 2900,
        endPressure: 1450,
      };
      const expectedMetricDiveData = {
        maxDepth: 30,
        waterTemperature: 25,
        visibility: 10,
        startPressure: 200,
        endPressure: 100,
      };
      const result = convertUnits(imperialDiveData, false);
      expect(result).toMatchObject(expectedMetricDiveData);
    });

  });
  
  describe('formatStartTime and formatEndTime', () => {
    const startTime = new Date('2023-05-01T12:00:00Z');
    const endTime = new Date('2023-05-01T13:00:00Z');
    const formattedStartTime = formatStartTime(startTime);
    const formattedEndTime = formatEndTime(endTime);
  
    it('formats start time correctly', () => {
      expect(formattedStartTime).toContain('Start Time:');
    });
  
    it('formats end time correctly', () => {
      expect(formattedEndTime).toContain('End Time:');
    });
  });
  
  describe('calculateBottomTime', () => {
    it('calculates bottom time correctly', () => {
      const startTime = { seconds: 1620081600, nanoseconds: 0 };
      const endTime = { seconds: 1620085200, nanoseconds: 0 };
      const bottomTime = calculateBottomTime(startTime, endTime);
      expect(bottomTime).toBe(60);
    });
  });
  
  describe('calculatePressureUsed', () => {
    it('calculates pressure used correctly', () => {
      const startPressure = 200;
      const endPressure = 100;
      const pressureUsed = calculatePressureUsed(startPressure, endPressure);
      expect(pressureUsed).toBe(100);
    });
  });
  