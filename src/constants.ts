import { OrmModule } from './infra/orm.module';

const contexts = {
  MAIN: 'main',
} as const;

const dbModules = [OrmModule.register(contexts.MAIN)] as const;

// const dbSeeders: Record<string, Constructor<Seeder> | undefined | null> = {
//   [contexts.MAIN]: GtiDatabaseSeeder
// };

export { contexts, dbModules };
