import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheckService,
  MemoryHealthIndicator,
  SequelizeHealthIndicator,
} from '@nestjs/terminus';

/** The HealthController class checks the health of various components including the database, memory, and disk. */
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: SequelizeHealthIndicator,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
  ) {
    //console.log(db);
  }

  /**
   * The function checks the health of various components including the database, memory, and storage.
   * @returns The `check()` function is returning the result of calling the `health.check()` method
   * with an array of functions as arguments. Each function in the array is a check for a different
   * aspect of the system's health, including the status of the database, memory usage, and disk
   * storage. The `health.check()` method will return a Promise that resolves with an array of objects
   * representing the results of each check
   */
  @Get()
  async check() {
    return this.health.check([
      /* istanbul ignore next */
      () => this.db.pingCheck('database', { timeout: 300 }),
      /* istanbul ignore next */
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      /* istanbul ignore next */
      () => this.memory.checkRSS('memory_rss', 150 * 1024 * 1024),
      /* istanbul ignore next */
      () =>
        this.disk.checkStorage('storage', { thresholdPercent: 0.8, path: '/' }),
    ]);
  }
}
