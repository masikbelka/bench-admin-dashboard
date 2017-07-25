import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BenchAdminConsoleBenchHistoryModule } from './bench-history/bench-history.module';
import { BenchAdminConsoleBenchCommentHistoryModule } from './bench-comment-history/bench-comment-history.module';
import { BenchAdminConsoleBenchPredictionsModule } from './bench-predictions/bench-predictions.module';
import { BenchAdminConsolePredictionDetailsModule } from './prediction-details/prediction-details.module';
import { BenchAdminConsoleLocationModule } from './location/location.module';
import { BenchAdminConsoleTitleModule } from './title/title.module';
import { BenchAdminConsoleJobFunctionModule } from './job-function/job-function.module';
import { BenchAdminConsoleBillingConceptModule } from './billing-concept/billing-concept.module';
import { BenchAdminConsoleOpportunityTypeModule } from './opportunity-type/opportunity-type.module';
import { BenchAdminConsoleProjectCategoryModule } from './project-category/project-category.module';
import { BenchAdminConsoleBillingTypeModule } from './billing-type/billing-type.module';
import { BenchAdminConsoleProductionStatusModule } from './production-status/production-status.module';
import { BenchAdminConsoleLanguageLevelModule } from './language-level/language-level.module';
import { BenchAdminConsoleProbationStatusModule } from './probation-status/probation-status.module';
import { BenchAdminConsolePrimarySkillModule } from './primary-skill/primary-skill.module';
import { BenchAdminConsoleUnitModule } from './unit/unit.module';
import { BenchAdminConsoleEmployeeModule } from './employee/employee.module';
import { BenchAdminConsoleProjectModule } from './project/project.module';
import { BenchAdminConsoleProjectRoleModule } from './project-role/project-role.module';
import { BenchAdminConsoleSkillCategoryModule } from './skill-category/skill-category.module';
import { BenchAdminConsoleOpportunityModule } from './opportunity/opportunity.module';
import { BenchAdminConsoleOpportunityPositionModule } from './opportunity-position/opportunity-position.module';
import { BenchAdminConsoleProjectHistoryModule } from './project-history/project-history.module';
import { BenchAdminConsoleJobModule } from './job/job.module';
import { BenchAdminConsoleJobExecutionModule } from './job-execution/job-execution.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        BenchAdminConsoleBenchHistoryModule,
        BenchAdminConsoleBenchCommentHistoryModule,
        BenchAdminConsoleBenchPredictionsModule,
        BenchAdminConsolePredictionDetailsModule,
        BenchAdminConsoleLocationModule,
        BenchAdminConsoleTitleModule,
        BenchAdminConsoleJobFunctionModule,
        BenchAdminConsoleBillingConceptModule,
        BenchAdminConsoleOpportunityTypeModule,
        BenchAdminConsoleProjectCategoryModule,
        BenchAdminConsoleBillingTypeModule,
        BenchAdminConsoleProductionStatusModule,
        BenchAdminConsoleLanguageLevelModule,
        BenchAdminConsoleProbationStatusModule,
        BenchAdminConsolePrimarySkillModule,
        BenchAdminConsoleUnitModule,
        BenchAdminConsoleEmployeeModule,
        BenchAdminConsoleProjectModule,
        BenchAdminConsoleProjectRoleModule,
        BenchAdminConsoleSkillCategoryModule,
        BenchAdminConsoleOpportunityModule,
        BenchAdminConsoleOpportunityPositionModule,
        BenchAdminConsoleProjectHistoryModule,
        BenchAdminConsoleJobModule,
        BenchAdminConsoleJobExecutionModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BenchAdminConsoleEntityModule {}
