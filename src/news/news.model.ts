import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface News extends Base {}
export class NewsModel extends TimeStamps {
  @prop()
  title: string;

  @prop()
  lid: string;

  @prop()
  author: string;

  @prop()
  image: string;

  @prop()
  description: string;

  @prop()
  condition: boolean;

  @prop({ type: () => [String] })
  categories: string[];

  @prop({ type: () => [String] })
  tag: string[];
}
