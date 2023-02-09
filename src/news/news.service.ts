import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateNewsDto } from './dto/create-news.dto';
import { FindNewsDto } from './dto/find-news.dto';
import { NewsModel } from './news.model';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(NewsModel) private readonly newsModel: ModelType<NewsModel>,
  ) {}

  async create(dto: CreateNewsDto) {
    return this.newsModel.create(dto);
  }

  async findById(id: string) {
    return this.newsModel.findById(id).exec();
  }

  async deleteById(id: string) {
    return this.newsModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: CreateNewsDto) {
    return this.newsModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findNews(dto: FindNewsDto) {
    return this.newsModel
      .aggregate([
        {
          $match: {
            categories: dto.category,
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
        {
          $limit: dto.limit,
        },
      ])
      .exec() as NewsModel;
  }
}
