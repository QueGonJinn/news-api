import { prop, index } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum NewsCategory {
  Technologies,
  Entertainment,
  Society,
  Health,
  Travel,
  Celebrities,
}

export interface PageModel extends Base {}
@index({ title: 'text' })
export class PageModel extends TimeStamps {
  @prop({ enum: NewsCategory })
  firstCategory: NewsCategory;

  @prop({ unique: true })
  alias: string;

  @prop({ text: true })
  title: string;

  @prop()
  category: string;
}
