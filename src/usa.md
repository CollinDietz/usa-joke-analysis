# USA

```js
import { feature } from "npm:topojson-client";

const us = await FileAttachment("./data/us-states.json").json();
const states = feature(us, us.objects.states);

const state_name = states.features.map((d) => d.properties.name);
state_name.sort();
display(state_name);
const state_order = state_name.reduce((acc, d, i) => {
  acc[d] = i;
  return acc;
}, {});

const plot = Plot.plot({
  projection: "albers-usa",
  width,
  marks: [
    Plot.geo(states, {
      fill: (d) => {
        const lightShade = "#add8e6"; // Light blue
        const darkShade = "#00008b"; // Dark blue

        const interpolateColor = d3.interpolate(darkShade, lightShade);
        return interpolateColor(state_order[d.properties.name] / 50);
      },
      stroke: "black",
    }),
    Plot.text(states.features, {
      x: (d) => d3.geoCentroid(d)[0],
      y: (d) => d3.geoCentroid(d)[1],
      text: (d) => state_order[d.properties.name],
      fill: "white",
      stroke: "black",
      fontSize: 10,
      textAnchor: "middle",
    }),
  ],
});

display(plot);
```
