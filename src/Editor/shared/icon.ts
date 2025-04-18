import { 
    Type,
    Heading1, 
    Heading2, 
    Heading3, 
    Heading4, 
    Heading5, 
    Heading6,
    List,
    ListOrdered,
    ListTodo,
    ListCollapse,
    Table,
    Ban,
    InspectionPanel,
    Image,
    Video,
} from 'lucide';

import { ListTypeEnum } from '../plugins/nodes/list/interface';
import { BaseBlockView } from '../plugins/nodes/_common/baseBlockView';

import { NodeViewEnum } from '../interface';

const headingMap = {
    1: Heading1,
    2: Heading2,
    3: Heading3,
    4: Heading4,
    5: Heading5,
    6: Heading6,
};

const listMap = {
    [ListTypeEnum.BULLET]: List,
    [ListTypeEnum.ORDERED]: ListOrdered,
    [ListTypeEnum.TODO]: ListTodo,
    [ListTypeEnum.TOGGLE]: ListCollapse,
};

export const getNodeViewIcon = (nodeView: BaseBlockView | null) => {
    const node = nodeView?.node;

    if (!node) return Ban;

    switch (node.type.name) {
        case NodeViewEnum.HEADER:
            return headingMap[node.attrs.level] || Heading1;
        
        case NodeViewEnum.HIGHLIGHT:
            return InspectionPanel; 
            
        case NodeViewEnum.LIST:    
            return listMap[node.firstChild?.attrs.type] || List;

        case NodeViewEnum.LIST_HEAD:
            return listMap[node?.attrs.type] || List;    

        case NodeViewEnum.TABLE:
            return Table;

        case NodeViewEnum.TEXT_BLOCK:
        case NodeViewEnum.TEXT_BLOCK_HEAD:    
            return Type;

        case NodeViewEnum.IMAGE:
            return Image;
        case NodeViewEnum.VIDEO:
            return Video;

        default:
            return Ban;    
    }
};