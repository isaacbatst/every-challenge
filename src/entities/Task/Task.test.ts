import { Task, TaskStatus } from "./Task"

describe('Task', () => {
  describe('Given title bellow min length', () => {
    it('should throw INVALID_TITLE_LENGTH_BELLOW_MIN', () => {
      const taskWithTitleLengthBellowMin = {
        description: 'any-description',
        status: TaskStatus.TODO,
        title: ''
      }

      expect(() => {
        new Task(taskWithTitleLengthBellowMin)
      }).toThrow('INVALID_TITLE_LENGTH_BELLOW_MIN')
    })
  })

  describe('Given title above max length', () => {
    it('should throw INVALID_TITLE_LENGTH_ABOVE_MAX', () => {
      const taskWithTitleLengthAboveMax = {
        description: 'any-description',
        status: TaskStatus.TODO,
        title: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      }

      expect(() => {
        new Task(taskWithTitleLengthAboveMax)
      }).toThrow('INVALID_TITLE_LENGTH_ABOVE_MAX')
    })
  })

  describe('Given description bellow min length', () => {
    it('should throw INVALID_DESCRIPTION_LENGTH_BELLOW_MIN', () => {
      const taskWithDescriptionLengthBellowMin = {
        description: '',
        status: TaskStatus.TODO,
        title: 'any-title'
      }

      expect(() => {
        new Task(taskWithDescriptionLengthBellowMin)
      }).toThrow('INVALID_DESCRIPTION_LENGTH_BELLOW_MIN')
    })
  })

  describe('Given description above max length', () => {
    it('should throw INVALID_DESCRIPTION_LENGTH_ABOVE_MAX', () => {
      const taskWithDescriptionLengthAboveMax = {
        description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        status: TaskStatus.TODO,
        title: 'any-title'
      }

      expect(() => {
        new Task(taskWithDescriptionLengthAboveMax)
      }).toThrow('INVALID_DESCRIPTION_LENGTH_ABOVE_MAX')
    })
  })
})