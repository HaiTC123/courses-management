// core/services/base.service.ts
import { CoreService } from "src/core/core.service";

export class BaseService {
  protected readonly _mapperService;
  constructor(public readonly coreService: CoreService) {
    this._mapperService = coreService.getMapperSerivce();
  }
}
