export class ApiResponse<T> {
  public success: boolean;
  public message: string;
  public statusCode: number;
  public data: T | null;

  constructor({
    message,
    statusCode,
    data = undefined,
    success = true,
  }: {
    message: string;
    statusCode: number;
    data?: T;
    success?: boolean;
  }) {
    this.success = success;
    this.message = message;
    this.statusCode = statusCode;
    this.data = data ?? null;
  }
}
