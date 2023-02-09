import { prop } from '@typegoose/typegoose';
import { IsArray, IsBoolean, IsString } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  title: string;

  @IsString()
  lid: string;

  @IsString()
  author: string;

  @IsString()
  image: string;

  @IsString()
  description: string;

  @IsBoolean()
  condition: boolean;

  @IsArray()
  @IsString({ each: true })
  categories: string[];

  @IsArray()
  @IsString({ each: true })
  tag: string[];
}
