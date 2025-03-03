class ApiResponse<T> {
  success: boolean;
  path: string;
  method: string;
  statusCode: number;
  status: string;
  data: T;
  errors: string[];
  message: string;

  constructor(data: T, statusCode: number, path: string, method: string, errors: string[], message: string) {
    this.success = statusCode >= 200 && statusCode <= 299; 
    this.data = data;
    this.statusCode = statusCode;
    this.status = this.statusMessageByCode(this.statusCode);
    this.path = path;
    this.method = method;
    this.message = message;
    this.errors = errors;
  }

  statusMessageByCode(code: number) {
    const messages = {
      200: 'OK',
      201: 'CREATED',
      400: 'BAD REQUEST',
      401: 'UNAUTHORIZED',
      403: 'FORBIDDEN',
      404: 'NOT FOUND',
    };

    return messages[code];
  }
}

export { ApiResponse };