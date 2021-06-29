import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.PORT || 3000;
  const nodeEnv = process.env.NODE_ENV || 'development';

  await app.listen(PORT, () => {
    console.log(`Application running in ${nodeEnv} mode on port ${PORT}`);
  });
}
bootstrap();
