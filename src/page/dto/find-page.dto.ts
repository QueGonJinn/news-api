import { IsEnum } from 'class-validator';
import { NewsCategory } from '../page.model';

export class FindPageDto {
  @IsEnum(NewsCategory)
  firstCategory: NewsCategory;
}
