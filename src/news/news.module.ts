import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { NewsController } from './news.controller';
import { NewsModel } from './news.model';
import { NewsService } from './news.service';

@Module({
  controllers: [NewsController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: NewsModel,
        schemaOptions: {
          collection: 'News',
        },
      },
    ]),
  ],
  providers: [NewsService],
})
export class NewsModule {}
