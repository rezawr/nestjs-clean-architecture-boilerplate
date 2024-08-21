import { migration, wait } from './bootstrap';

wait()
  .then(() => migration())
  .then(() => process.exit())
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
