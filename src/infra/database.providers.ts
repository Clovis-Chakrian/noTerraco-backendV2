import { DataSource } from 'typeorm';
import { EntitiesSubscriber } from './entities.subscriber';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '12345678',
        database: 'postgres',
        entities: [__dirname + '/../**/*.schema{.ts,.js}'],
        subscribers: [EntitiesSubscriber],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
