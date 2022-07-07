import { Timeline, TimelineItem, TimelineGroup } from "vis-timeline";

declare global {
  interface Window {
    timeline: Timeline;
    items: DataSet<TimelineItem>;
    groups: DataSet<TimelineGroup>;
  }
}
