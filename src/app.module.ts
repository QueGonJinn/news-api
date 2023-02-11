import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PageModule } from './page/page.module';
import { NewsModule } from './news/news.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMongoConfig } from './configs/mongo.config';
import { TypegooseModule } from 'nestjs-typegoose';
import { FilesModule } from './files/files.module';
import { SitemapModule } from './sitemap/sitemap.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    AuthModule,
    PageModule,
    NewsModule,
    FilesModule,
    SitemapModule,
  ],
})
export class AppModule {}
