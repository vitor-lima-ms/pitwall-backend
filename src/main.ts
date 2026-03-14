/* Nest.js imports */
import { ConfigService } from "@nestjs/config";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { NestFactory } from "@nestjs/core";
/* Module imports */
import { AppModule } from "./app.module";
/* Entry point */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.CORS_ORIGIN,
    },
  });

  const configService = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder().setTitle("PitWall").build();

  const swaggerDocumentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup("swagger", app, swaggerDocumentFactory);

  await app.listen(configService.get("PORT") ?? 3001);
}
/* eslint-disable @typescript-eslint/no-floating-promises */
bootstrap();
/* eslint-enable @typescript-eslint/no-floating-promises */
