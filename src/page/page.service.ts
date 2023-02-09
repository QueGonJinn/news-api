import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreatPageDto } from './dto/create-page.dto';
import { NewsCategory, PageModel } from './page.model';

@Injectable()
export class PageService {
  constructor(
    @InjectModel(PageModel) private readonly pageModel: ModelType<PageModel>,
  ) {}

  async create(dto: CreatPageDto) {
    return this.pageModel.create(dto);
  }

  async findById(id: string) {
    return this.pageModel.findById(id).exec();
  }

  async findByAlias(alias: string) {
    return this.pageModel.findOne({ alias }).exec();
  }

  async findByCategory(firstCategory: NewsCategory) {
    return this.pageModel
      .aggregate([
        {
          $match: {
            NewsCategory,
          },
        },
        {
          $group: {
            _id: { NewsCategory: '$NewsCategory' },
            pages: { $push: { alias: '$alias', title: '$title' } },
          },
        },
      ])
      .exec();
  }

  async findByText(text: string) {
    return this.pageModel
      .find({ $text: { $search: text, $caseSensitive: false } })
      .exec();
  }

  async deleteById(id: string) {
    return this.pageModel.findByIdAndRemove(id).exec();
  }

  async updateById(id: string, dto: CreatPageDto) {
    return this.pageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }
}
