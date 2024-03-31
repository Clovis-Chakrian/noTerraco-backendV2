export class GenericReturnDto {
  public success: boolean;
  public data: any;
  public errors: string[];

  constructor(success: boolean, data: any, errors: string[]) {
    this.success = success;
    this.data = data;
    this.errors = errors;
  }
}