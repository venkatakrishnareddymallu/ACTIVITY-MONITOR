function render_visuals(data,selector){
 var spec = 
 {
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "background": "white",
  "padding": 5,
  "width": 830,
  "height": 90,
  "data": [
    {
      "name": "source_0",
      "values": data['fii_data'],
      "format": {"type": "json", "parse": {"Date": "date"}}},
    {
      "name": "source_2",
      "values": data['index_data'],
      "transform": [
        {
          "type": "extent",
          "field": "Price",
          "signal": "minmax"
        }
      ],
      "format": {"type": "json", "parse": {"Date": "date"}}
    }
  ],
  "marks": [
    {
      "type": "group",
      "encode": {
        "update": {
          "y": {"signal": "height-270"},
          "width": {"signal": "width"},
          "height": {"signal": "height"}
        }
      },
      "axes": [
        {
      "orient": "bottom",
      "scale": "x1",
      "grid": false,
      "ticks": false,
      "domainColor": "white",
      "labelAngle": 0,
      "labelPadding": 340,
      "format": "%d-%b-%y",
      "labelFont": "Open Sans",
      "title": "TIME PERIOD",
      "titleFont": "Open Sans",
      "titlePadding": 160
    },
     {
      "orient": "left",
      "scale": "y1",
      "grid": false,
      "ticks": false,
      "tickCount": 5,
      "domainColor": "white",
      "labelAngle": 0,
      "labelPadding": 5,
      "labelFont": "Open Sans",
      "title": "NIFTY 50 Index",
      "titleFont": "Open Sans"
    }
      ],
     
      "marks": [
        {
      "name": "marks3",
      "type": "line",
      "style": ["bar"],
      "from": {"data": "source_2"},
      "encode": {
        "update": {
          "x": {"scale": "x1", "field": "Date"},
          "y": {"scale": "y1", "field": "Price"},
          "stroke": {
            "value": "#ff5722"
          },
          "interpolate": {"value": "natural"}
        }
      }
    }
      ]
    },
    {
      "type": "group",
      "encode": {
        "update": {
          "width": {"signal": "width"},
          "height": {"signal": "height"}
        }
      },
      "axes": [
        {
      "orient": "left",
      "scale": "y",
      "grid": false,
      "tickColor": "white",
      "tickCount": 4,
      "domainColor": "white",
      "labelFont": "Open Sans",
      "title": "FII Activity",
      "titleFont": "Open Sans"
    }],
      "marks": [
        {
      "name": "marks",
      "type": "rect",
      "style": ["bar"],
      "from": {"data": "source_0"},
      "encode": {
        "update": {
          "x": {"scale": "x", "field": "Date"},
          "width": {"scale": "x", "band": true},
          "y": {"scale": "y", "field": "fii_net"},
          "y2": {"scale": "y", "value": 0},
          "fill": {
            "signal": "datum['fii_net'] >0 ? '#0054c6' : '#2cb9ff'"
          }
        }
      }
    }
      ]
    },
    {
      "type": "group",
      "encode": {
        "update": {
          "y": {"signal": "height+40"},
          "width": {"signal": "width"},
          "height": {"signal": "height"}
        }
      },
      "axes": [
        {
      "orient": "left",
      "scale": "y",
      "grid": false,
      "tickColor": "white",
      "tickCount": 4,
      "domainColor": "white",
      "labelFont": "Open Sans",
      "title": "DII Activity",
      "titleFont": "Open Sans"
    }],
      "marks": [
        {
      "name": "marks3",
      "type": "rect",
      "style": ["bar"],
      "from": {"data": "source_0"},
      "encode": {
        "update": {
          "x": {"scale": "x", "field": "Date"},
          "width": {"scale": "x", "band": true},
          "y": {"scale": "y", "field": "DII Net"},
          "y2": {"scale": "y", "value": 0},
          "fill": {
            "signal": "datum['DII Net'] > 0 ? '#0054c6' : '#2cb9ff'"
          }
        }
      }
    }
      ]
    }
  ],
  "scales": [
    {
      "name": "x",
      "type": "band",
      "domain": {"data": "source_0", "field": "Date", "sort": true},
      "range": [0, {"signal": "width"}],
      "paddingInner": 0.1,
      "paddingOuter": 0.05
    },
    {
      "name": "y",
      "type": "linear",
      "domain": {"data": "source_0", "field": "fii_net"},
      "range": [{"signal": "height"}, 0],
      "nice": true,
      "zero": true
    },
    {
      "name": "y2",
      "type": "linear",
      "domain": {"data": "source_0", "field": "DII Net"},
      "range": [{"signal": "height"}, 0],
      "nice": true,
      "zero": true
    },
    {
      "name": "x1",
      "type": "time",      
      "domain": {"data": "source_2", "field": "Date", "sort": true},
      "range": [0, {"signal": "width"}]
    },
    {
      "name": "y1",
      "type": "linear",
      "domain": [{"signal": "minmax[0]"}, {"signal": "minmax[1]"}],
      "range": [{"signal": "height"}, 0],
      "nice": true,
      "zero": false
    }
  ]
}
spec.data[0].values = data.fii_dii
spec.data[1].values = data['index_data']
new vega.View(vega.parse(spec))
  .logLevel(vega.Warn)
  .initialize(selector)
  .hover()
  .renderer('svg')
  .run()
}
