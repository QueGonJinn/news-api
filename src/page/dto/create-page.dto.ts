import { IsEnum, IsString } from 'class-validator';
import { NewsCategory } from '../page.model';

export class CreatPageDto {
  @IsEnum(NewsCategory)
  firstCategory: NewsCategory;

  @IsString()
  alias: string;

  @IsString()
  title: string;

  @IsString()
  category: string;
}
