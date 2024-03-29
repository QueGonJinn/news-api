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
import { CreatPageDto } from './dto/create-page.dto';
import { FindPageDto } from './dto/find-page.dto';
import { NOT_FOUND_PAGE_ERROR } from './page.constants';

import { PageModel } from './page.model';
import { PageService } from './page.service';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreatPageDto) {
    return this.pageService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const page = await this.pageService.findById(id);
    if (!page) {
      throw new NotFoundException(NOT_FOUND_PAGE_ERROR);
    }
    return page;
  }

  @Get('byAlias/:alias')
  async getByAlias(@Param('alias') alias: string) {
    const page = await this.pageService.findByAlias(alias);
    if (!page) {
      throw new NotFoundException(NOT_FOUND_PAGE_ERROR);
    }
    return page;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedPage = await this.pageService.findById(id);
    if (!deletedPage) {
      throw new NotFoundException(NOT_FOUND_PAGE_ERROR);
    }
    return deletedPage;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async pathc(@Param('id') id: string, @Body() dto: CreatPageDto) {
    const updatedPage = await this.pageService.updateById(id, dto);
    if (!updatedPage) {
      throw new NotFoundException(NOT_FOUND_PAGE_ERROR);
    }
    return updatedPage;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindPageDto) {
    return this.pageService.findByCategory(dto.firstCategory);
  }

  @Post('textSearch/:text')
  async textSearch(@Param('text') text: string) {
    return this.pageService.findByText(text);
  }
}
