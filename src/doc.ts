import { nanoid } from 'nanoid';

import { schema } from './Editor/plugins/schema';
import { MentionTypeEnum } from './Editor/interface';

export const doc = [
    schema.node('title', null, [schema.text('👨👩飞书合同操作手册大全👧👦')]),
    schema.node('body', null, [
        schema.node('paragraph', { id: nanoid(8) }, [
                schema.text('任务处理', [
                    schema.mark('comment', { id: 'refId1' }),
                ]),
                schema.text('信息展示优化，用户可以点击列表中的任务或者操作列的处理按钮'),
                schema.text('触发任务详情的展示。', [
                    schema.mark('comment', { id: 'refId2' }),
                ]),
            ],
        ),
        schema.node('heading', { level: 1, id: nanoid(8) }, [schema.text('💡 操作指南')]),
        schema.node('heading', { level: 3, id: nanoid(8) }, [schema.text('✅ 合同申请篇')]),
        schema.node('heading', { level: 3, id: nanoid(8) }, [schema.text('✅ 合同审批篇')]),
        schema.node('heading', { level: 3, id: nanoid(8) }, [schema.text('✅ 合同管理篇')]),
        schema.node('heading', { level: 1, id: nanoid(8) }, [schema.text('🎬 视频专区'), schema.node('mention', { id: nanoid(8), type: MentionTypeEnum.USER, name: '韩雪'  }), schema.text(' ')]),
        schema.node('heading', { level: 2, id: nanoid(8) }, [schema.text('❓ 热门问题')]),
        schema.node('paragraph', { id: nanoid(8) }, [schema.text('1. 任务处理信息展示优化，用户可以点击列表中的任务或者操作列的处理按钮，触发任务详情的展示。')]),
        schema.node('paragraph', { id: nanoid(8) }, [schema.text('2. 客户信息展示优化，将原有信息进行分类，按模块在左侧边栏展示。'), schema.node('mention', { id: nanoid(8), type: MentionTypeEnum.USER, name: 'Leona Wang'  }, []), schema.text('将原有信息进行分类，按模块在左侧边栏展示。')]),
        schema.node('highlight', { id: nanoid(8) }, [schema.node('paragraph', { id: nanoid(8) }, [schema.text('1. 任务处理信息展示优化，用户可以点击列表中的任务或者操作列的处理按钮，触发任务详情的展示。')])]),
        schema.node(
            'list',
            { id: nanoid(8), order: true }, 
            [
                schema.node('list_head', { id: nanoid(8) }, [
                    schema.text('任务处理信息展示优化任务处理信息展示优化任务处理信息展示优化任务处理信息展示优化任务处理信息展示优化任务处理信息展示优化任务处理信息展示优化任务处理信息展示优化任务处理信息展示优化')
                ]),
            ]
        ),
        schema.node(
            'list',
            { id: nanoid(8), order: true }, 
            [
                schema.node('list_head', { id: nanoid(8) }, [
                    schema.text('父级任务')
                ]),
                schema.node('list_body', { id: nanoid(8) }, [
                    schema.node(
                        'list',
                        { id: nanoid(8), order: true }, 
                        [
                            schema.node('list_head', { id: nanoid(8) }, [
                                schema.text('123')
                            ]),
                        ]
                    ),
                ]),
            ]
        ),
        schema.node(
            'list',
            { id: nanoid(8), order: true }, 
            [
                schema.node('list_head', { id: nanoid(8) }, [
                    schema.text('将原有信息进行分类，按模块在左侧边栏展示。')
                ]),
                schema.node('list_body', { id: nanoid(8) }, [
                    schema.node(
                        'list',
                        { id: nanoid(8), order: true, }, 
                        [
                            schema.node('list_head', { id: nanoid(8) }, [
                                schema.text('first parargraph', [
                                    schema.mark('background', { color: '#fed4a4cc' }),
                                    schema.mark('color', { color: '#de7802' }),
                                ])
                            ]),
                        ]
                    ),
                    schema.node(
                        'list',
                        { id: nanoid(8), order: true, }, 
                        [
                            schema.node('list_head', { id: nanoid(8) }, [
                                schema.text('second paragraph')
                            ]),
                        ]
                    ),
                ]),
            ]
        ),
        schema.node(
            'list',
            { id: nanoid(8), order: true }, 
            [
                schema.node('list_head', { id: nanoid(8), showIndex: false }, []),
                schema.node('list_body', { id: nanoid(8) }, [
                    schema.node(
                        'list',
                        { id: nanoid(8), order: true, }, 
                        [
                            schema.node('list_head', { id: nanoid(8) }, [
                                schema.text('2')
                            ]),
                            schema.node('list_body', { id: nanoid(8) }, [
                                schema.node(
                                    'list',
                                    { id: nanoid(8), order: true, }, 
                                    [
                                        schema.node('list_head', { id: nanoid(8) }, [
                                            schema.text('3')
                                        ]),
                                    ]
                                ),
                            ])
                        ]
                    ),
                ]),
            ]
        ),

        // table
        schema.node('table', { id: nanoid(8), colWidth: ['100', '100'] }, [
            schema.node('table_row', { id: nanoid(8) }, [
                schema.node('table_cell', { id: nanoid(8) }, [
                    schema.node('paragraph', { id: nanoid(8) }, [schema.text('1')])
                ]),
                schema.node('table_cell', { id: nanoid(8) }, [
                    schema.node('paragraph', { id: nanoid(8) }, [schema.text('2')])
                ]),
            ]),
            schema.node('table_row', { id: nanoid(8) }, [
                schema.node('table_cell', { id: nanoid(8) }, [
                    schema.node('paragraph', { id: nanoid(8) }, [schema.text('3')])  
                ]),
                schema.node('table_cell', { id: nanoid(8) }, [
                    schema.node('paragraph', { id: nanoid(8) })  
                ])
            ]),
        ]),
    ]),
];

export const docComments = {
    'refId1': ['commentId1', 'commentId2'],
    'refId2': ['commentId3', 'commentId4'],
};

export const commentInfoMap = {
    'commentId1': {
        id: 'commentId1',
        refDoc: '任务处理',
        comments: [
            { id: '1', user: '王凯', content: '思维 理念 成长 搜集 完美', createTime: '2022-01-01' },
            { id: '2', user: '小米', content: '感谢！分享我的结果～是「学习专注追求竞争回顾」，且战略思维最高，影响力其次。', createTime: '2022-01-02' },
            { id: '3', user: 'Adam', content: '感觉重合度很高hhh 😂', createTime: '2022-01-02' },
        ],
    },
    'commentId2': {
        id: 'commentId2',
        refDoc: '任务处理',
        comments: [
            { id: '1', user: '张瑞', content: '很好的案例~', createTime: '2022-01-01' },
            { id: '2', user: '李先森', content: '期待你的成果，🥳', createTime: '2022-01-02' },
            { id: '3', user: 'Adam', content: '建立个人知识库Wiki， 沉淀个人思考', createTime: '2022-01-02' },
        ],
    },
    'commentId3': {
        id: 'commentId3',
        refDoc: '触发任务详情的展示。',
        comments: [
            { id: '1', user: '陈明宇', content: '这个功能设计得很合理，提高了操作效率', createTime: '2022-01-01' },
            { id: '2', user: '林思远', content: '建议可以增加批量处理的功能，对于大量任务会更方便', createTime: '2022-01-02' },
            { id: '3', user: '张雨晴', content: '界面交互很流畅，使用体验不错 👍', createTime: '2022-01-02' },
        ],
    },
    'commentId4': {
        id: 'commentId4',
        refDoc: '触发任务详情的展示。',
        comments: [
            { id: '1', user: '赵子涵', content: '产品体验越来越好了，期待后续更新 🎉', createTime: '2022-01-01' },
            { id: '2', user: '吴思琪', content: '操作流程简单直观，新手也能快速上手', createTime: '2022-01-02' },
            { id: '3', user: '刘天成', content: '希望能增加一些快捷键支持，提升效率 ⌨️', createTime: '2022-01-02' },
        ],
    },
};