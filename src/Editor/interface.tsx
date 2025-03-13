export enum PopoverTypeEnum {
  MENTION = "mention",
}

export enum MentionTypeEnum {
  USER = "user",
}

export type MentionParam = {
  type: MentionTypeEnum;
  info: Record<string, any>;
}