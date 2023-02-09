import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { IdValidationPipe } from 'src/pipes/ad-validation.pipe';
import { CreateNewsDto } from './dto/create-news.dto';
import { FindNewsDto } from './dto/find-news.dto';
import { NEWS_NOT_FOUND_ERROR } from './news.constans';
import { NewsModel } from './news.model';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateNewsDto) {
    return this.newsService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string): Promise<NewsModel> {
    const news = await this.newsService.findById(id);
    if (!news) {
      throw new NotFoundException(NEWS_NOT_FOUND_ERROR);
    }
    return news;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedNews = await this.newsService.deleteById(id);
    if (!deletedNews) {
      throw new NotFoundException(NEWS_NOT_FOUND_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async pathc(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: NewsModel,
  ) {
    const updatedNews = await this.newsService.updateById(id, dto);
    if (!updatedNews) {
      throw new NotFoundException(NEWS_NOT_FOUND_ERROR);
    }
    return updatedNews;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindNewsDto) {
    return this.newsService.findNews(dto);
  }
}
