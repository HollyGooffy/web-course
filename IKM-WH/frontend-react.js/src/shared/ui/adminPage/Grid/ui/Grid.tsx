import {GridProps} from "./grid-props.ts";
import style from "./Grid.module.css";
import {DEFAULT_GAP, DEFAULT_MARGIN_BOTTOM, DEFAULT_MIN_WIDTH} from "@shared/lib/constant/grid";

export const Grid: React.FC<GridProps> = ({
                                              children,
                                              columns = 'auto-fill',
                                              minWidth = DEFAULT_MIN_WIDTH,
                                              gap = DEFAULT_GAP,
                                              marginBottom = DEFAULT_MARGIN_BOTTOM,
                                              className = '',
                                              style: customStyle = {}
                                          }) => {
    const getGridTemplateColumns = () => {
        if (typeof columns === 'number') {
            return `repeat(${columns}, 1fr)`;
        }
        return `repeat(${columns}, minmax(${minWidth}, 1fr))`;
    };

    const gridStyle = {
        gridTemplateColumns: getGridTemplateColumns(),
        gap,
        marginBottom,
        ...customStyle
    };

    return (
        <div
            className={`${style.grid} ${className}`}
            style={gridStyle}
        >
            {children}
        </div>
    );
};