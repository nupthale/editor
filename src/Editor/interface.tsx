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

export enum NodeViewEnum {
  HEADER = 'header',
  HIGHLIGHT = 'highlight',
  LIST = 'list',
  LIST_HEAD = 'list_head',
  LIST_BODY = 'list_body',
  MENTION = 'mention',
  TABLE = 'table',
  TEXT_BLOCK = 'textBlock',
  TEXT_BLOCK_HEAD = 'textBlock_head',
  TEXT_BLOCK_BODY = 'textBlock_body',
  TITLE = 'title',
}