import React, { useState, useEffect } from "react";
import TabNavItem from "./TabNavItem.js";
import TabContent from "./TabContent.js";
import KeplerGl from "kepler.gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { addDataToMap } from "kepler.gl/actions";
import { useDispatch } from "react-redux";
import helpers from "../../utility/helpers";

const DATA_URL =
  "Your data URL";

/*const sampleConfig = {
    "visState": {
      "filters": [],
      "layers": [
        {
          "id": "2gx5tek",
          "type": "geojson",
          "config": {
            "dataId": "nyc_census",
            "label": "NYC 2010 Census Tracts",
            "color": [
              119,
              110,
              87,
              255
            ],
            "columns": {
              "geojson": "_geojson"
            },
            "isVisible": true,
            "visConfig": {
              "opacity": 0.7,
              "thickness": 2,
              "colorRange": {
                "name": "Sunrise 8",
                "type": "sequential",
                "category": "Uber",
                "colors": [
                  "#194266",
                  "#355C7D",
                  "#63617F",
                  "#916681",
                  "#C06C84",
                  "#D28389",
                  "#E59A8F",
                  "#F8B195"
                ],
                "reversed": false
              },
              "radius": 10,
              "sizeRange": [
                0,
                10
              ],
              "radiusRange": [
                0,
                50
              ],
              "heightRange": [
                0,
                500
              ],
              "elevationScale": 11,
              "hi-precision": false,
              "stroked": false,
              "filled": true,
              "enable3d": true,
              "wireframe": false
            }
          },
          "visualChannels": {
            "colorField": {
              "name": "Population",
              "type": "integer"
            },
            "colorScale": "quantile",
            "sizeField": null,
            "sizeScale": "linear",
            "heightField": {
              "name": "Population",
              "type": "integer"
            },
            "heightScale": "linear",
            "radiusField": null,
            "radiusScale": "linear"
          }
        }
      ],
      "interactionConfig": {
        "tooltip": {
          "fieldsToShow": {
            "nyc_census": [
              "shape_area",
              "Population",
              "boro_name"
            ]
          },
          "enabled": false
        },
        "brush": {
          "size": 0.5,
          "enabled": false
        }
      },
      "layerBlending": "normal",
      "splitMaps": []
    },
    "mapState": {
      "bearing": -91.5,
      "dragRotate": true,
      "latitude": 40.70103067142986,
      "longitude": -73.91553549776309,
      "pitch": 59.10737472814099,
      "zoom": 11.977347974465932,
      "isSplit": false
    },
    "mapStyle": {
      "styleType": "voyager",
      "topLayerGroups": {},
      "visibleLayerGroups": {
        "label": false,
        "road": true,
        "border": false,
        "building": true,
        "water": true,
        "land": true
      }
    }
  }*/

const sampleConfig = {}


const Tabs = () => {
  const [activeTab, setActiveTab] = useState("mapbox");
  const dispatch = useDispatch();
  const [data, setData] = useState();

  const fetchData = async () => {
    setData(helpers.httpGet(DATA_URL));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(data);
    data &&
      dispatch(
        addDataToMap({
          datasets: {
            info: {
              label: "NYC 2010 Census Tracts",
              id: "nyc_census",
            },
            data: data,
          },
          option: {
            centerMap: true,
            readOnly: false,
          },
          config: sampleConfig,
        })
      );
  }, [dispatch, data]);

  return (
    <div className="Tabs">
      <ul className="nav">
        <TabNavItem title="Sensus" id="mapbox" activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title="Distance" id="leaflet" activeTab={activeTab} setActiveTab={setActiveTab}/>
      </ul>
 
      <div className="outlet">
        <TabContent id="mapbox" activeTab={activeTab}>
            <KeplerGl 
            id="map" 
            width={window.innerWidth/1.2} 
            height={window.innerHeight/1.2} 
            mapboxApiAccessToken="pk.eyJ1IjoicGlsZ2FvbmthcnByYW5hdiIsImEiOiJjbTQyMGVtbHIwZ3pzMnFyMmp5YjJxYjh3In0.hiTnv81K7ImeRzuDVF0tcQ" 
            />
        </TabContent>
        <TabContent id="leaflet" activeTab={activeTab}>
            
        </TabContent>
      </div>
    </div>
  );
};

export default Tabs;