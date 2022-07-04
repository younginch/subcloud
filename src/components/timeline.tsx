import { Box } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { DataSet } from "vis-data";
import { Timeline } from "vis-timeline";
import { createRoot } from "react-dom/client";
import "vis-timeline/dist/vis-timeline-graph2d.min.css";

type GroupProps = {
  group: {
    id: string;
    content: string;
  };
};

function GroupTemplate({ group }: GroupProps) {
  return (
    <div>
      <label>{group.content}</label>
    </div>
  );
}

type ItemProps = {
  item: {
    id: string;
    content: string;
  };
};

function ItemTemplate({ item }: ItemProps) {
  return (
    <div>
      <label>{item.content}</label>
      <button
        onClick={() => {
          return console.log("aaaaaa");
        }}
      >
        aaaa
      </button>
    </div>
  );
}

function VisibleFramTemplate({ item }: ItemProps) {
  return (
    <div>
      id: {item.id}
      <button
        onClick={() => {
          return console.log("aaaaaa");
        }}
      >
        aaaa
      </button>
    </div>
  );
}

export default function ReactTimeline() {
  const [items, setItems] = useState<any[]>();
  const [timeline, setTimeline] = useState<Timeline>();
  const ref = useRef(null);

  useEffect(() => {
    // create groups
    const numberOfGroups = 1;
    var groups = new DataSet();
    for (var i = 0; i < numberOfGroups; i++) {
      groups.add({
        id: i,
        // @ts-ignore
        content: `Truck ${i}`,
      });
    }

    // create items
    const numberOfItems = 1000;
    const items = new DataSet();
    const itemsPerGroup = Math.round(numberOfItems / numberOfGroups);
    for (var truck = 0; truck < numberOfGroups; truck++) {
      var date = new Date();
      for (var order = 0; order < itemsPerGroup; order++) {
        date.setHours(date.getHours() + 4 * Math.random());
        const start = new Date(date);
        date.setHours(date.getHours() + 2 + Math.floor(Math.random() * 4));
        const end = new Date(date);
        items.add({
          id: order + itemsPerGroup * truck,
          // @ts-ignore
          group: truck,
          start: start,
          end: end,
          content: "Order " + order,
        });
      }
    }
    // @ts-ignore
    setItems(items);
    // @ts-ignore
    setTimeline(new Timeline(ref.current!, items, groups, options));
  }, []);

  const options = {
    orientation: "top",
    maxHeight: 400,
    start: new Date(),
    end: new Date(1000 * 60 * 60 * 24 + new Date().valueOf()),
    editable: true,
    onInitialDrawComplete: () => {
      timeline?.setItems(items!);
    },
    template: (item: any, element: Element) => {
      if (!item) {
        return;
      }

      return ReactDOM.createPortal(
        createRoot(element).render(<ItemTemplate item={item} />)!,
        element
        // timeline.redraw()
      );
      // Works too
      // return ReactDOMServer.renderToString(<ItemTemplate item={item} />)

      // Kinda works
      // ReactDOM.render(<ItemTemplate item={item} />, element );
      // return ''
    },

    groupTemplate: (group: any, element: Element) => {
      if (!group || !group.content) {
        return;
      }
      return ReactDOM.createPortal(
        createRoot(element).render(<GroupTemplate group={group} />)!,
        element
      );
    },

    visibleFrameTemplate: (item: any, element: Element) => {
      if (!item || !element) {
        return;
      }
      if (element.className.indexOf("timeline-item-visible-frame") === -1) {
        return;
      }
      return ReactDOM.createPortal(
        createRoot(element).render(<VisibleFramTemplate item={item} />)!,
        element
      );
    },
  };

  return <Box w="100%" h="100px" id="visualization" ref={ref} />;
}
