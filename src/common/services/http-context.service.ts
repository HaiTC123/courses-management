// common/services/http-context.service.ts
import { Request } from 'express';

export class HttpContextService {
  private static request: Request;

  static setRequest(req: Request) {
    this.request = req;
  }

  static getRequest(): Request {
    return this.request;
  }

  static clear() {
    this.request = null;
  }
}
