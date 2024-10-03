// core/services/base.service.ts
import { CoreService } from "src/core/core.service";

export class BaseService {
  constructor(public readonly coreService: CoreService) {}

  get mapper() {
    return this.coreService.mapper;
  }
}
