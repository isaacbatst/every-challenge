
// In real life I would check if the product team see this status easily changing

import { ValidationError } from "../../../errors/ValidationError";

// If so, a database persisted dynamic status could be better, allowing to edit them via some dashboard
export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  ARCHIVED = 'ARCHIVED'
}

interface TaskParams {
  title: string;
  description: string;
  status: string;
}

export interface TaskDTO {
  title: string;
  description: string;
  status: TaskStatus;
}

export interface TaskDTOWithIds extends TaskDTO { 
  id: string 
  userId: string
}

export class Task {
  private title: string;
  private description: string;
  private status: TaskStatus;

  constructor(params: TaskParams) {
    this.validateTitle(params.title);
    this.validateDescription(params.description);
    
    if(!Task.isValidStatus(params.status)){
      throw new ValidationError('INVALID_STATUS')
    }

    this.description = params.description;
    this.title = params.title;
    this.status = params.status;
  }

  private validateTitle(title: string) {
    if(title.length < 1) {
      throw new ValidationError('INVALID_TITLE_LENGTH_BELLOW_MIN')
    } 

    if(title.length > 50) {
      throw new ValidationError('INVALID_TITLE_LENGTH_ABOVE_MAX')
    }
  }

  private validateDescription(description: string) {
    if(description.length < 1) {
      throw new ValidationError('INVALID_DESCRIPTION_LENGTH_BELLOW_MIN')
    } 

    if(description.length > 200) {
      throw new ValidationError('INVALID_DESCRIPTION_LENGTH_ABOVE_MAX')
    }
  }

  static isValidStatus(status: string): status is TaskStatus {
    return status in TaskStatus
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  getStatus(): TaskStatus {
    return this.status;
  }
}