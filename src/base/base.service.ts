// core/services/base.service.ts
import { CoreService } from "src/core/core.service";

export class BaseService {
  protected readonly _mapperService;
  protected readonly _emailService;
  constructor(public readonly coreService: CoreService) {
    this._mapperService = coreService.getMapperSerivce();
    this._emailService = coreService.getEmailService();
  }
}
