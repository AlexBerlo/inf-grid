import "./App.css";
import React, { useEffect } from "react";
import faker from "faker";
import { InfiniteLoader, AutoSizer, List } from "react-virtualized";

function App() {
  const ITEMS_COUNT = 98;
  const ITEM_SIZE = 320;

  const [list, setList] = React.useState([]);
  const [count, setCount] = React.useState(1);
  const [rowCount, setRowCount] = React.useState(1);

  React.useEffect(() => {
    loadMoreRows(0, 2000);
    console.log(list);
  }, []);

  const isRowLoaded = (index) => index < list.length && list[index] !== null;

  const loadMoreRows = (startIndex, stopIndex) => {
    console.log("loading more items");
    return new Promise((resolve) => {
      setTimeout(() => {
        const newData = [...list];
        for (let idx = startIndex; idx < stopIndex; idx++) {
          newData[idx] = faker.lorem.sentence();
        }
        setList(newData);
        resolve();
      }, 500);
    });
  };

  const Item = (props) => {
    const { name, idx } = props;
    return (
      <div
        style={{
          width: "300px",
          height: "300px",
          border: "1px solid red",
          margin: "20px 20px 0px 0px",
          boxSizing: "border-box",
        }}
      >
        <p>{name}</p>
        <p>{idx}</p>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="App-body">
        <div className="App-body-left"></div>
        <div className="App-body-right">
          {/* <InfiniteLoader
            isRowLoaded={isRowLoaded}
            rowCount={list.length}
            loadMoreRows={loadMoreRows}
            threshold={35}
          >
            {({ onRowsRendered, ref }) => ( */}
          <AutoSizer>
            {({ height, width }) => {
              const itemsPerRow = Math.floor(width / ITEM_SIZE);
              const rowCount = Math.ceil(list.length / itemsPerRow);

              return (
                <List
                  className="List"
                  width={width}
                  height={height}
                  rowCount={rowCount}
                  //onRowsRendered={onRowsRendered}
                  //ref={ref}
                  rowHeight={ITEM_SIZE}
                  rowRenderer={({ index, key, style }) => {
                    const items = [];
                    const fromIndex = index * itemsPerRow;
                    const toIndex = Math.min(
                      fromIndex + itemsPerRow,
                      list.length
                    );

                    for (let i = fromIndex; i < toIndex; i++) {
                      items.push(
                        <div key={i}>
                          <Item name={list[i]} idx={i} />
                        </div>
                      );
                    }

                    return (
                      <div className="Row" key={key} style={style}>
                        {items}
                      </div>
                    );
                  }}
                />
              );
            }}
          </AutoSizer>
          {/* )}
          </InfiniteLoader> */}
        </div>
      </div>
    </div>
  );
}

export default App;
