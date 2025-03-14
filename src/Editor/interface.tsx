export enum PopoverTypeEnum {
  MENTION = "mention",
  BUBBLE_MENU = 'bubble-menu',
}

export enum MentionTypeEnum {
  USER = "user",
}

export type MentionParam = {
  type: MentionTypeEnum;
  name: string;
  id: string;
}