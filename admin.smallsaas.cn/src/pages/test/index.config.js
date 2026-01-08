
module.exports = {
  layout: 'Content',
  title: '学习源管理',
  items: [
    {
      layout: 'Empty',
      component: 'Search',
      config: {
        type: "default",
        share: 'role',
        fields: [
          { field: 'name', label: '学习源id', type: 'search' },
        ],
      },
    },
    {
      layout: 'Empty',
      component: 'Table',
      config: {
        share: 'role',
        API: {
          method: 'post',
          listAPI: '/launcherV1/xuexi-center/xuexiSource/getList',
          // deleteAPI: '/api/adm/roles/(id)'
          //deleteAPI: '/api/adm/roles/(id)/(version)'
        },
        actions: [
          {
            title: '添加', type: 'path',
            options: {
              path: '/sys/role-add'
            }
          }
        ],

        fields: [
          { field: 'id', label: '学习源id' },
          { field: 'tips', label: '描述' },
          { field: 'operation' }
        ],
        operation: [
          {
            title: '编辑', type: 'path',
            options: {
              outside: true,
              path: '/sys/role-edit',
              queryData: (records) => {
                const data = {
                  id: records.id,
                }
                return data
              }
            },
          },
          {
            title: '删除', type: 'delete',
            expect: {
              field: 'madeBy',
              value: 'USER',
            },
          }
        ]
      },
    },
  ],
};
