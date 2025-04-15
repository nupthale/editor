export enum PopoverTypeEnum {
  MENTION = "mention",
  BUBBLE_MENU = 'bubble-menu',
  FLOAT_MENU = 'float-menu',
}

export enum MentionTypeEnum {
  USER = "user",
}

export type MentionParam = {
  type: MentionTypeEnum;
  name: string;
  id: string;
}

export type CommentInfoType = {
  refDoc: string;
  id: string;
  comments: {
    id: string;
    user: string;
    content: string;
    createTime: string;
  }[];
}


export interface UserType {
  name: string;
  id: string;
}