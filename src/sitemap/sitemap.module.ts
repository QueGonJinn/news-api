import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PageModule } from 'src/page/page.module';
import { SitemapController } from './sitemap.controller';

@Module({
  controllers: [SitemapController],
  imports: [PageModule, ConfigModule],
})
export class SitemapModule {}
