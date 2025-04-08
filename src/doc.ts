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

export const comments = {
    'refId1': ['commentId1', 'commentId2'],
    'refId2': ['commentId3', 'commentId4'],
};