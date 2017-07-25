import { platformBrowser } from '@angular/platform-browser';
import { ProdConfig } from './blocks/config/prod.config';
import { BenchAdminConsoleAppModuleNgFactory } from '../../../../build/aot/src/main/webapp/app/app.module.ngfactory';

ProdConfig();

platformBrowser().bootstrapModuleFactory(BenchAdminConsoleAppModuleNgFactory)
.then((success) => console.log(`Application started`))
.catch((err) => console.error(err));
