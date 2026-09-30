import type { QuartzComponent, QuartzComponentConstructor } from "@quartz-community/types";
import style from "./styles/flow-field.scss";
// @ts-ignore
import script from "./scripts/flow-field.inline";

export default (() => {
  // Renders nothing; the script adds a fixed canvas behind the page
  const FlowField: QuartzComponent = () => null;
  FlowField.css = style;
  FlowField.afterDOMLoaded = script;
  return FlowField;
}) satisfies QuartzComponentConstructor;
