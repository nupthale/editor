export enum PopoverTypeEnum {
  MENTION = "mention",
}

export enum MentionTypeEnum {
  USER = "user",
}

export type MentionParam = {
  type: MentionTypeEnum;
  name: string;
  id: string;
}