import { IsNumber, IsString } from 'class-validator';

export class FindNewsDto {
  @IsString()
  category: string;

  @IsNumber()
  limit: number;
}
