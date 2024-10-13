// core/services/base.service.ts
import { CoreService } from "src/core/core.service";

export class BaseService {
  protected readonly _mapperService;
  protected readonly _emailService;
  protected readonly _authService;
  constructor(public readonly coreService: CoreService) {
    this._mapperService = coreService.getMapperSerivce();
    this._emailService = coreService.getEmailService();
    this._authService = coreService.getAuthService();
  }
}
