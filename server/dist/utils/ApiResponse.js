export class ApiResponse {
    success;
    message;
    statusCode;
    data;
    constructor({ message, statusCode, data = undefined, success = true, }) {
        this.success = success;
        this.message = message;
        this.statusCode = statusCode;
        this.data = data ?? null;
    }
}
