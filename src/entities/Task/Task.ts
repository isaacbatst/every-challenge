// In real life I would check if the product team see this status easily changing
// If so, a database persisted status could be better, allowing to edit them via some dashboard
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

export class Task {
  private title: string;
  private description: string;
  private status: TaskStatus;

  constructor(params: TaskParams) {
    this.validateTitle(params.title);
    this.validateDescription(params.description);
    
    if(!this.isValidStatus(params.status)){
      throw new Error('INVALID_STATUS')
    }

    this.description = params.description;
    this.title = params.title;
    this.status = params.status;
  }

  private validateTitle(title: string) {
    if(title.length < 1) {
      throw new Error('INVALID_TITLE_LENGTH_BELLOW_MIN')
    } 

    if(title.length > 50) {
      throw new Error('INVALID_TITLE_LENGTH_ABOVE_MAX')
    }
  }

  private validateDescription(description: string) {
    if(description.length < 1) {
      throw new Error('INVALID_DESCRIPTION_LENGTH_BELLOW_MIN')
    } 

    if(description.length > 200) {
      throw new Error('INVALID_DESCRIPTION_LENGTH_ABOVE_MAX')
    }
  }

  private isValidStatus(status: string): status is TaskStatus {
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