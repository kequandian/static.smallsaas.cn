import type { touchGridLayout } from '@/utils/touchGridLayout';
import React from 'react';

type GridLayoutPorp = {
  cols: ReturnType<typeof touchGridLayout>;
  renderEach?: (id: string) => React.ReactNode;
};

const GridLayout: React.FC<GridLayoutPorp> = ({ cols, renderEach }) => {
  return (
    <div
      className="absolute left-0 right-0 top-0  bottom-0"
      style={{ margin: `calc(var(--spacing, 0) * ${cols.cssVar.margin})` }}
    >
      {cols.nodes.map((item, index) => (
        <div className="absolute" key={index} style={{ ...item }}>
          <div
            className="absolute left-0 right-0 top-0 bottom-0"
            style={{ margin: `calc(var(--spacing, 0) * ${cols.cssVar.margin})` }}
          >
            <div
              className="w-full h-full"
              style={{ padding: `calc(var(--spacing, 0) * ${cols.cssVar.spacing})` }}
            >
              {item?.children && <GridLayout cols={item.children} renderEach={renderEach} />}

              {item.id && renderEach && renderEach(item.id)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridLayout;
