const classRepository = require('../../../src/repository/ClassRepository');
const Classes = require('../../../src/db/model/Classes');
const Classes_Teacher = require('../../../src/db/model/Classes_Teacher');
const Classes_Schedule = require('../../../src/db/model/Classes_Schedule');

const input = {
  classid: 1,
  subjectId: 1,
  classCode: 'COMP101',
  year: 2023,
  semester: 1,
  password: 'password',
  userId: 1,
  classesTeacher: [1, 2],
  classesSchedule: [{ day: 'Monday', start: '9:00', end: '11:00' }],
};

jest.mock('../../../src/db/model/Classes');
jest.mock('../../../src/db/model/Classes_Teacher');
jest.mock('../../../src/db/model/Classes_Schedule');

describe('ClassRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getClasses', () => {
    it('should return a list of classes', async () => {
      const mockResponse = [{ classId: 1, subjectId: 1, classCode: 'COMP101' }];
      Classes.findAll.mockResolvedValue(mockResponse);

      const result = await classRepository.getClasses();

      expect(result).toEqual(mockResponse);
    });

    it('should reject with an error if Classes.findAll fails', async () => {
      const mockError = new Error('Database error');
      Classes.findAll.mockRejectedValue(mockError);

      await expect(classRepository.getClasses()).rejects.toThrow(mockError);
    });
  });

  describe('getClass', () => {
    it('should return the correct class', async () => {
      const input = { classid: 1 };
      const expectedResponse = {
        class: {},
        teachers: [],
        schedules: [],
      };

      Classes.findAll = jest.fn().mockResolvedValue([{}]);
      Classes_Teacher.findAll = jest.fn().mockResolvedValue([]);
      Classes_Schedule.findAll = jest.fn().mockResolvedValue([]);

      const response = await classRepository.getClass(input);
      expect(response).toEqual(expectedResponse);
    });

    it('should reject with an error if there is an error in the database queries', async () => {
      const input = { classid: 1 };
      const expectedError = new Error('Test error');

      Classes.findAll = jest.fn().mockRejectedValue(expectedError);
      Classes_Teacher.findAll = jest.fn().mockRejectedValue(expectedError);
      Classes_Schedule.findAll = jest.fn().mockRejectedValue(expectedError);

      await expect(classRepository.getClass(input)).rejects.toThrow(expectedError);
    });
  });

  describe('deleteClass', () => {
    it('should resolve with the response', async () => {
      const classid = 1;
      const response = [1];
      Classes.update.mockResolvedValue(response);

      await expect(classRepository.deleteClass(classid)).resolves.toEqual(response);
      expect(Classes.update).toHaveBeenCalledWith({ deleted: true }, { where: { classId: classid } });
    });

    it('should reject with the error', async () => {
      const classid = 1;
      const error = new Error('DB error');
      Classes.update.mockRejectedValue(error);

      await expect(classRepository.deleteClass(classid)).rejects.toThrow(error);
      expect(Classes.update).toHaveBeenCalledWith({ deleted: true }, { where: { classId: classid } });
    });
  });
});