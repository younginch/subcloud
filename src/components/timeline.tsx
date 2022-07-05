import { Box } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { DataSet } from "vis-data";
import { Timeline } from "vis-timeline";
import { createRoot } from "react-dom/client";
import "vis-timeline/dist/vis-timeline-graph2d.min.css";
import { SRTContent } from "@younginch/subtitle";

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

function VisibleFrameTemplate({ item }: ItemProps) {
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

type ReactTimelineProps = {
  contents: SRTContent[];
};

export default function ReactTimeline({ contents }: ReactTimelineProps) {
  const [timeline, setTimeline] = useState<Timeline>();
  const ref = useRef(null);

  useEffect(() => {
    var groups = new DataSet();
    groups.add({
      id: 1,
      // @ts-ignore
      content: `SRT 1`,
    });

    const items = new DataSet();
    contents.forEach((content, index) => {
      const start = new Date(1970, 0, 1).setSeconds(content.startTime);
      const end = new Date(1970, 0, 1).setSeconds(content.endTime);
      items.add({
        id: index,
        // @ts-ignore
        group: 1,
        start,
        end,
        content: content.toText(),
      });
    });

    const options = {
      orientation: "top",
      showMajorLabels: false,
      maxHeight: 400,
      start: new Date(),
      end: new Date(1000 * 60 * 60 * 24 + new Date().valueOf()),
      editable: true,
      onInitialDrawComplete: () => {
        // @ts-ignore
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
          createRoot(element).render(<VisibleFrameTemplate item={item} />)!,
          element
        );
      },
    };

    // @ts-ignore
    setTimeline(new Timeline(ref.current!, items, groups, options));
    timeline?.redraw();
  }, []);

  return <Box w="100%" h="100px" ref={ref} />;
}
