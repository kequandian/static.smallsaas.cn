import React, { useRef } from 'react';
import { useSize } from 'ahooks';
import useLayout from 'zero-element-boot/lib/components/hooks/useLayout';
import ContainerContext from 'zero-element-boot/lib/components/AutoX/ContainerContext';

/**
 * 列表属性{template}包括 [布局, Cart, 分隔线, 数据转换 [,子组件] ]
 * 简单列表仅向子组件传递数据源以及 子组件属性
 * @param {*} props 
 * @param {object} layout  布局
 * @param {array}} items,dataSource
 */
export default function GroupedList(props) {
  const { children,  layout,  dataSource={}, navigation, onItemClick, groupKeyStyle ,...rest} = props;
  
  const [layoutRef, { getClassName }] = useLayout();

  const containerRef = useRef();
  const size = useSize(containerRef);

  // ensure only child [NamedLayout, Presenter ...]
  const Child = React.Children.only(children);

  return (
    <ContainerContext.Provider value={size}>
    {
        Object.keys(dataSource).map((groupKey, g) => {
            const dataSourceItem = dataSource[groupKey];
            return (<div key={g}>

            {/* 分组标题风格 */}
              <div style={groupKeyStyle
                // {color: '#00ffaa', marginTop: '40px'}
            }>
                {groupKey}
              </div>

              {/* 分组风格 */}
              <div
                  style={{
                    overflow: 'auto',
                    position: 'relative',
                  }}
                  className={getClassName()}
                  ref={containerRef}
                >
                  {
                    dataSourceItem.map((item, i) => {
                      return (
                        <div key={i} >
                          {
                            React.isValidElement(Child) ?
                              React.cloneElement(Child, {
                                  ...rest,
                                  ...item,
                                  layout: layout,
                                  // key: i,
                                  ref: layoutRef,
                                  onItemClick: onItemClick,
                                  isLastItem: dataSource.length == (i+1) ? true : false,
                                  index: i
                              })
                            : <Child key={i}  {...item }{...rest} layout={layout} ref={layoutRef} index={i} />
                          }
                        </div>)
                      })
                  }
              </div>
          </div>)
      })
    }
    </ContainerContext.Provider>
  )
}

function tips(dataSource) {
  return <div>GroupedList 数据无效</div>;
}

