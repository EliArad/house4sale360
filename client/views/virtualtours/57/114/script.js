TDV.PlayerAPI.defineScript({ "definitions": [
 {
  "class": "Panorama",
  "pitch": 0,
  "hfovMin": 60,
  "hfov": 360,
  "id": "panorama_4DA735EA_45A3_3529_41C2_DEF02D0720E2",
  "partial": false,
  "hfovMax": 120,
  "frames": [
   {
    "top": {
     "class": "ImageResource",
     "levels": [
      {
       "height": 1904,
       "url": "media/panorama_4DA735EA_45A3_3529_41C2_DEF02D0720E2_u_hq.jpeg",
       "width": 1904,
       "class": "ImageResourceLevel"
      },
      {
       "height": 800,
       "url": "media/panorama_4DA735EA_45A3_3529_41C2_DEF02D0720E2_u.jpeg",
       "width": 800,
       "class": "ImageResourceLevel"
      }
     ]
    },
    "front": {
     "class": "ImageResource",
     "levels": [
      {
       "height": 1904,
       "url": "media/panorama_4DA735EA_45A3_3529_41C2_DEF02D0720E2_f_hq.jpeg",
       "width": 1904,
       "class": "ImageResourceLevel"
      },
      {
       "height": 800,
       "url": "media/panorama_4DA735EA_45A3_3529_41C2_DEF02D0720E2_f.jpeg",
       "width": 800,
       "class": "ImageResourceLevel"
      }
     ]
    },
    "right": {
     "class": "ImageResource",
     "levels": [
      {
       "height": 1904,
       "url": "media/panorama_4DA735EA_45A3_3529_41C2_DEF02D0720E2_r_hq.jpeg",
       "width": 1904,
       "class": "ImageResourceLevel"
      },
      {
       "height": 800,
       "url": "media/panorama_4DA735EA_45A3_3529_41C2_DEF02D0720E2_r.jpeg",
       "width": 800,
       "class": "ImageResourceLevel"
      }
     ]
    },
    "class": "CubicPanoramaFrame",
    "back": {
     "class": "ImageResource",
     "levels": [
      {
       "height": 1904,
       "url": "media/panorama_4DA735EA_45A3_3529_41C2_DEF02D0720E2_b_hq.jpeg",
       "width": 1904,
       "class": "ImageResourceLevel"
      },
      {
       "height": 800,
       "url": "media/panorama_4DA735EA_45A3_3529_41C2_DEF02D0720E2_b.jpeg",
       "width": 800,
       "class": "ImageResourceLevel"
      }
     ]
    },
    "thumbnailUrl": "media/panorama_4DA735EA_45A3_3529_41C2_DEF02D0720E2_t.jpg",
    "bottom": {
     "class": "ImageResource",
     "levels": [
      {
       "height": 1904,
       "url": "media/panorama_4DA735EA_45A3_3529_41C2_DEF02D0720E2_d_hq.jpeg",
       "width": 1904,
       "class": "ImageResourceLevel"
      },
      {
       "height": 800,
       "url": "media/panorama_4DA735EA_45A3_3529_41C2_DEF02D0720E2_d.jpeg",
       "width": 800,
       "class": "ImageResourceLevel"
      }
     ]
    },
    "left": {
     "class": "ImageResource",
     "levels": [
      {
       "height": 1904,
       "url": "media/panorama_4DA735EA_45A3_3529_41C2_DEF02D0720E2_l_hq.jpeg",
       "width": 1904,
       "class": "ImageResourceLevel"
      },
      {
       "height": 800,
       "url": "media/panorama_4DA735EA_45A3_3529_41C2_DEF02D0720E2_l.jpeg",
       "width": 800,
       "class": "ImageResourceLevel"
      }
     ]
    },
    "overlays": [
     {
      "areas": [
       {
        "mapColor": "#FF0000",
        "class": "HotspotPanoramaOverlayArea",
        "click": "this.setMediaBehaviour(this.mainPlayList, 1, this.panorama_4DA735EA_45A3_3529_41C2_DEF02D0720E2)"
       }
      ],
      "maps": [
       {
        "yaw": -63.176384125428704,
        "pitch": -27.85987261146497,
        "roll": 0,
        "hfov": 12.763688475379631,
        "image": {
         "class": "ImageResource",
         "levels": [
          {
           "height": 106,
           "url": "media/panorama_4DA735EA_45A3_3529_41C2_DEF02D0720E2_0_HS_0_0_0_map.gif",
           "width": 120,
           "class": "ImageResourceLevel"
          }
         ]
        },
        "class": "HotspotPanoramaOverlayMap"
       }
      ],
      "items": [
       {
        "image": {
         "class": "ImageResource",
         "levels": [
          {
           "height": 213,
           "url": "media/panorama_4DA735EA_45A3_3529_41C2_DEF02D0720E2_0_HS_0_0.png",
           "width": 240,
           "class": "ImageResourceLevel"
          }
         ]
        },
        "pitch": -27.85987261146497,
        "hfov": 12.763688475379631,
        "yaw": -63.176384125428704,
        "roll": 0,
        "class": "HotspotPanoramaOverlayImage"
       }
      ],
      "class": "HotspotPanoramaOverlay",
      "useHandCursor": true,
      "rollOverDisplay": false
     }
    ]
   }
  ],
  "thumbnailUrl": "media/panorama_4DA735EA_45A3_3529_41C2_DEF02D0720E2_t.jpg",
  "label": "myhouse",
  "vfov": 180
 },
 {
  "viewerArea": "this.MainViewer",
  "class": "PanoramaPlayer",
  "touchControlMode": "drag_rotation",
  "mouseControlMode": "drag_acceleration",
  "id": "MainViewerPanoramaPlayer"
 },
 {
  "automaticZoomSpeed": 10,
  "class": "PanoramaCamera",
  "initialPosition": {
   "yaw": 0,
   "pitch": 0,
   "class": "PanoramaCameraPosition"
  },
  "initialSequence": {
   "movements": [
    {
     "yawSpeed": 8.95,
     "yawDelta": 18.5,
     "easing": "cubic_in",
     "class": "DistancePanoramaCameraMovement"
    },
    {
     "yawSpeed": 8.95,
     "yawDelta": 323,
     "easing": "linear",
     "class": "DistancePanoramaCameraMovement"
    },
    {
     "yawSpeed": 8.95,
     "yawDelta": 18.5,
     "easing": "cubic_out",
     "class": "DistancePanoramaCameraMovement"
    }
   ],
   "restartMovementOnUserInteraction": false,
   "class": "PanoramaCameraSequence"
  },
  "id": "panorama_4DA735EA_45A3_3529_41C2_DEF02D0720E2_camera"
 },
 {
  "class": "Panorama",
  "pitch": 0,
  "hfovMin": 60,
  "hfov": 360,
  "id": "panorama_43207491_45A1_0BF5_41CF_86EB1B69E7C4",
  "partial": false,
  "hfovMax": 120,
  "frames": [
   {
    "top": {
     "class": "ImageResource",
     "levels": [
      {
       "height": 1904,
       "url": "media/panorama_43207491_45A1_0BF5_41CF_86EB1B69E7C4_u_hq.jpeg",
       "width": 1904,
       "class": "ImageResourceLevel"
      },
      {
       "height": 800,
       "url": "media/panorama_43207491_45A1_0BF5_41CF_86EB1B69E7C4_u.jpeg",
       "width": 800,
       "class": "ImageResourceLevel"
      }
     ]
    },
    "front": {
     "class": "ImageResource",
     "levels": [
      {
       "height": 1904,
       "url": "media/panorama_43207491_45A1_0BF5_41CF_86EB1B69E7C4_f_hq.jpeg",
       "width": 1904,
       "class": "ImageResourceLevel"
      },
      {
       "height": 800,
       "url": "media/panorama_43207491_45A1_0BF5_41CF_86EB1B69E7C4_f.jpeg",
       "width": 800,
       "class": "ImageResourceLevel"
      }
     ]
    },
    "right": {
     "class": "ImageResource",
     "levels": [
      {
       "height": 1904,
       "url": "media/panorama_43207491_45A1_0BF5_41CF_86EB1B69E7C4_r_hq.jpeg",
       "width": 1904,
       "class": "ImageResourceLevel"
      },
      {
       "height": 800,
       "url": "media/panorama_43207491_45A1_0BF5_41CF_86EB1B69E7C4_r.jpeg",
       "width": 800,
       "class": "ImageResourceLevel"
      }
     ]
    },
    "class": "CubicPanoramaFrame",
    "back": {
     "class": "ImageResource",
     "levels": [
      {
       "height": 1904,
       "url": "media/panorama_43207491_45A1_0BF5_41CF_86EB1B69E7C4_b_hq.jpeg",
       "width": 1904,
       "class": "ImageResourceLevel"
      },
      {
       "height": 800,
       "url": "media/panorama_43207491_45A1_0BF5_41CF_86EB1B69E7C4_b.jpeg",
       "width": 800,
       "class": "ImageResourceLevel"
      }
     ]
    },
    "thumbnailUrl": "media/panorama_43207491_45A1_0BF5_41CF_86EB1B69E7C4_t.jpg",
    "bottom": {
     "class": "ImageResource",
     "levels": [
      {
       "height": 1904,
       "url": "media/panorama_43207491_45A1_0BF5_41CF_86EB1B69E7C4_d_hq.jpeg",
       "width": 1904,
       "class": "ImageResourceLevel"
      },
      {
       "height": 800,
       "url": "media/panorama_43207491_45A1_0BF5_41CF_86EB1B69E7C4_d.jpeg",
       "width": 800,
       "class": "ImageResourceLevel"
      }
     ]
    },
    "left": {
     "class": "ImageResource",
     "levels": [
      {
       "height": 1904,
       "url": "media/panorama_43207491_45A1_0BF5_41CF_86EB1B69E7C4_l_hq.jpeg",
       "width": 1904,
       "class": "ImageResourceLevel"
      },
      {
       "height": 800,
       "url": "media/panorama_43207491_45A1_0BF5_41CF_86EB1B69E7C4_l.jpeg",
       "width": 800,
       "class": "ImageResourceLevel"
      }
     ]
    },
    "overlays": [
     {
      "areas": [
       {
        "mapColor": "#FF0000",
        "class": "HotspotPanoramaOverlayArea",
        "click": "this.setMediaBehaviour(this.mainPlayList, 2, this.panorama_43207491_45A1_0BF5_41CF_86EB1B69E7C4)"
       }
      ],
      "maps": [
       {
        "yaw": 80.48407643312102,
        "pitch": -5.159235668789809,
        "roll": 0,
        "hfov": 45.01287756616086,
        "image": {
         "class": "ImageResource",
         "levels": [
          {
           "height": 200,
           "url": "media/panorama_43207491_45A1_0BF5_41CF_86EB1B69E7C4_0_HS_0_1_0_map.gif",
           "width": 97,
           "class": "ImageResourceLevel"
          }
         ]
        },
        "class": "HotspotPanoramaOverlayMap"
       }
      ],
      "items": [
       {
        "image": {
         "class": "ImageResource",
         "levels": [
          {
           "height": 1626,
           "url": "media/panorama_43207491_45A1_0BF5_41CF_86EB1B69E7C4_0_HS_0_0.png",
           "width": 790,
           "class": "ImageResourceLevel"
          }
         ]
        },
        "pitch": -5.159235668789809,
        "hfov": 45.01287756616086,
        "yaw": 80.48407643312102,
        "roll": 0,
        "class": "HotspotPanoramaOverlayImage"
       }
      ],
      "class": "HotspotPanoramaOverlay",
      "useHandCursor": true,
      "rollOverDisplay": false
     },
     {
      "areas": [
       {
        "mapColor": "#FF0000",
        "class": "HotspotPanoramaOverlayArea",
        "click": "this.setMediaBehaviour(this.mainPlayList, 0, this.panorama_43207491_45A1_0BF5_41CF_86EB1B69E7C4)"
       }
      ],
      "maps": [
       {
        "yaw": -12.169244767970879,
        "pitch": -40.24203821656051,
        "roll": 0,
        "hfov": 16.777809106024304,
        "image": {
         "class": "ImageResource",
         "levels": [
          {
           "height": 84,
           "url": "media/panorama_43207491_45A1_0BF5_41CF_86EB1B69E7C4_0_HS_1_0_0_map.gif",
           "width": 183,
           "class": "ImageResourceLevel"
          }
         ]
        },
        "class": "HotspotPanoramaOverlayMap"
       }
      ],
      "items": [
       {
        "image": {
         "class": "ImageResource",
         "levels": [
          {
           "height": 168,
           "url": "media/panorama_43207491_45A1_0BF5_41CF_86EB1B69E7C4_0_HS_1_0.png",
           "width": 366,
           "class": "ImageResourceLevel"
          }
         ]
        },
        "pitch": -40.24203821656051,
        "hfov": 16.777809106024304,
        "yaw": -12.169244767970879,
        "roll": 0,
        "class": "HotspotPanoramaOverlayImage"
       }
      ],
      "class": "HotspotPanoramaOverlay",
      "useHandCursor": true,
      "rollOverDisplay": false
     }
    ]
   }
  ],
  "thumbnailUrl": "media/panorama_43207491_45A1_0BF5_41CF_86EB1B69E7C4_t.jpg",
  "label": "living room",
  "vfov": 180
 },
 {
  "automaticZoomSpeed": 10,
  "class": "PanoramaCamera",
  "initialPosition": {
   "yaw": 0,
   "pitch": 0,
   "class": "PanoramaCameraPosition"
  },
  "initialSequence": {
   "movements": [
    {
     "yawSpeed": 8.95,
     "yawDelta": 18.5,
     "easing": "cubic_in",
     "class": "DistancePanoramaCameraMovement"
    },
    {
     "yawSpeed": 8.95,
     "yawDelta": 323,
     "easing": "linear",
     "class": "DistancePanoramaCameraMovement"
    },
    {
     "yawSpeed": 8.95,
     "yawDelta": 18.5,
     "easing": "cubic_out",
     "class": "DistancePanoramaCameraMovement"
    }
   ],
   "restartMovementOnUserInteraction": false,
   "class": "PanoramaCameraSequence"
  },
  "id": "panorama_43207491_45A1_0BF5_41CF_86EB1B69E7C4_camera"
 },
 {
  "class": "Panorama",
  "pitch": 0,
  "hfovMin": 90,
  "hfov": 360,
  "id": "panorama_43A74D7A_45A1_1537_41BE_7BF5C66DAA77",
  "partial": false,
  "hfovMax": 121,
  "frames": [
   {
    "top": {
     "class": "ImageResource",
     "levels": [
      {
       "height": 1904,
       "url": "media/panorama_43A74D7A_45A1_1537_41BE_7BF5C66DAA77_u_hq.jpeg",
       "width": 1904,
       "class": "ImageResourceLevel"
      },
      {
       "height": 800,
       "url": "media/panorama_43A74D7A_45A1_1537_41BE_7BF5C66DAA77_u.jpeg",
       "width": 800,
       "class": "ImageResourceLevel"
      }
     ]
    },
    "front": {
     "class": "ImageResource",
     "levels": [
      {
       "height": 1904,
       "url": "media/panorama_43A74D7A_45A1_1537_41BE_7BF5C66DAA77_f_hq.jpeg",
       "width": 1904,
       "class": "ImageResourceLevel"
      },
      {
       "height": 800,
       "url": "media/panorama_43A74D7A_45A1_1537_41BE_7BF5C66DAA77_f.jpeg",
       "width": 800,
       "class": "ImageResourceLevel"
      }
     ]
    },
    "right": {
     "class": "ImageResource",
     "levels": [
      {
       "height": 1904,
       "url": "media/panorama_43A74D7A_45A1_1537_41BE_7BF5C66DAA77_r_hq.jpeg",
       "width": 1904,
       "class": "ImageResourceLevel"
      },
      {
       "height": 800,
       "url": "media/panorama_43A74D7A_45A1_1537_41BE_7BF5C66DAA77_r.jpeg",
       "width": 800,
       "class": "ImageResourceLevel"
      }
     ]
    },
    "class": "CubicPanoramaFrame",
    "back": {
     "class": "ImageResource",
     "levels": [
      {
       "height": 1904,
       "url": "media/panorama_43A74D7A_45A1_1537_41BE_7BF5C66DAA77_b_hq.jpeg",
       "width": 1904,
       "class": "ImageResourceLevel"
      },
      {
       "height": 800,
       "url": "media/panorama_43A74D7A_45A1_1537_41BE_7BF5C66DAA77_b.jpeg",
       "width": 800,
       "class": "ImageResourceLevel"
      }
     ]
    },
    "thumbnailUrl": "media/panorama_43A74D7A_45A1_1537_41BE_7BF5C66DAA77_t.jpg",
    "bottom": {
     "class": "ImageResource",
     "levels": [
      {
       "height": 1904,
       "url": "media/panorama_43A74D7A_45A1_1537_41BE_7BF5C66DAA77_d_hq.jpeg",
       "width": 1904,
       "class": "ImageResourceLevel"
      },
      {
       "height": 800,
       "url": "media/panorama_43A74D7A_45A1_1537_41BE_7BF5C66DAA77_d.jpeg",
       "width": 800,
       "class": "ImageResourceLevel"
      }
     ]
    },
    "left": {
     "class": "ImageResource",
     "levels": [
      {
       "height": 1904,
       "url": "media/panorama_43A74D7A_45A1_1537_41BE_7BF5C66DAA77_l_hq.jpeg",
       "width": 1904,
       "class": "ImageResourceLevel"
      },
      {
       "height": 800,
       "url": "media/panorama_43A74D7A_45A1_1537_41BE_7BF5C66DAA77_l.jpeg",
       "width": 800,
       "class": "ImageResourceLevel"
      }
     ]
    }
   }
  ],
  "thumbnailUrl": "media/panorama_43A74D7A_45A1_1537_41BE_7BF5C66DAA77_t.jpg",
  "label": "entrance",
  "vfov": 180
 },
 {
  "automaticZoomSpeed": 10,
  "class": "PanoramaCamera",
  "initialPosition": {
   "yaw": 0,
   "pitch": 0,
   "class": "PanoramaCameraPosition",
   "hfov": 102
  },
  "initialSequence": {
   "movements": [
    {
     "yawSpeed": 8.95,
     "yawDelta": 18.5,
     "easing": "cubic_in",
     "class": "DistancePanoramaCameraMovement"
    },
    {
     "yawSpeed": 8.95,
     "yawDelta": 323,
     "easing": "linear",
     "class": "DistancePanoramaCameraMovement"
    },
    {
     "yawSpeed": 8.95,
     "yawDelta": 18.5,
     "easing": "cubic_out",
     "class": "DistancePanoramaCameraMovement"
    }
   ],
   "restartMovementOnUserInteraction": false,
   "class": "PanoramaCameraSequence"
  },
  "id": "panorama_43A74D7A_45A1_1537_41BE_7BF5C66DAA77_camera"
 },
 {
  "id": "mainPlayList",
  "items": [
   {
    "media": "this.panorama_4DA735EA_45A3_3529_41C2_DEF02D0720E2",
    "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
    "class": "PanoramaPlayListItem",
    "camera": "this.panorama_4DA735EA_45A3_3529_41C2_DEF02D0720E2_camera",
    "player": "this.MainViewerPanoramaPlayer"
   },
   {
    "media": "this.panorama_43207491_45A1_0BF5_41CF_86EB1B69E7C4",
    "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
    "class": "PanoramaPlayListItem",
    "camera": "this.panorama_43207491_45A1_0BF5_41CF_86EB1B69E7C4_camera",
    "player": "this.MainViewerPanoramaPlayer"
   },
   {
    "media": "this.panorama_43A74D7A_45A1_1537_41BE_7BF5C66DAA77",
    "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 0)",
    "class": "PanoramaPlayListItem",
    "camera": "this.panorama_43A74D7A_45A1_1537_41BE_7BF5C66DAA77_camera",
    "player": "this.MainViewerPanoramaPlayer"
   }
  ],
  "class": "PlayList"
 }
], "children": [
 {
  "playbackBarHeadBackgroundColor": [
   "#111111",
   "#666666"
  ],
  "toolTipFontFamily": "Arial",
  "progressBarOpacity": 1,
  "toolTipShadowHorizontalLength": 0,
  "progressBottom": 0,
  "progressHeight": 10,
  "toolTipBorderSize": 1,
  "toolTipPaddingTop": 4,
  "progressBorderSize": 0,
  "shadow": false,
  "paddingTop": 0,
  "borderSize": 0,
  "playbackBarHeadBackgroundColorDirection": "vertical",
  "playbackBarProgressBackgroundColor": [
   "#3399FF"
  ],
  "toolTipFontStyle": "normal",
  "progressBorderRadius": 0,
  "playbackBarProgressBackgroundColorRatios": [
   0
  ],
  "playbackBarHeadShadowOpacity": 0.7,
  "progressBackgroundColorRatios": [
   0
  ],
  "toolTipShadowColor": "#333333",
  "minHeight": 50,
  "playbackBarLeft": 0,
  "toolTipOpacity": 1,
  "playbackBarBorderColor": "#FFFFFF",
  "playbackBarHeadHeight": 15,
  "toolTipShadowVerticalLength": 0,
  "playbackBarHeadBackgroundColorRatios": [
   0,
   1
  ],
  "minWidth": 100,
  "borderRadius": 0,
  "progressBarBorderColor": "#000000",
  "progressBarBackgroundColorRatios": [
   0
  ],
  "playbackBarHeadOpacity": 1,
  "paddingRight": 0,
  "toolTipPaddingBottom": 4,
  "toolTipPaddingLeft": 6,
  "playbackBarHeadShadowBlurRadius": 3,
  "playbackBarBottom": 5,
  "progressBorderColor": "#000000",
  "progressBackgroundColorDirection": "vertical",
  "progressBarBackgroundColor": [
   "#3399FF"
  ],
  "progressBackgroundColor": [
   "#FFFFFF"
  ],
  "toolTipFontColor": "#606060",
  "playbackBarProgressBackgroundColorDirection": "vertical",
  "playbackBarBackgroundColor": [
   "#FFFFFF"
  ],
  "playbackBarHeight": 10,
  "width": "100%",
  "playbackBarHeadWidth": 6,
  "height": "100%",
  "playbackBarProgressBorderSize": 0,
  "id": "MainViewer",
  "playbackBarBackgroundColorDirection": "vertical",
  "playbackBarRight": 0,
  "paddingLeft": 0,
  "toolTipFontSize": 12,
  "progressBarBorderRadius": 0,
  "playbackBarHeadShadowHorizontalLength": 0,
  "progressBarBorderSize": 0,
  "toolTipBorderColor": "#767676",
  "transitionMode": "blending",
  "playbackBarHeadShadowVerticalLength": 0,
  "playbackBarProgressBorderRadius": 0,
  "toolTipBackgroundColor": "#F6F6F6",
  "toolTipTextShadowBlurRadius": 3,
  "toolTipBorderRadius": 3,
  "toolTipShadowSpread": 0,
  "playbackBarBorderRadius": 0,
  "toolTipShadowOpacity": 1,
  "playbackBarProgressBorderColor": "#000000",
  "playbackBarHeadBorderRadius": 0,
  "toolTipTextShadowColor": "#000000",
  "class": "ViewerArea",
  "playbackBarProgressOpacity": 1,
  "toolTipShadowBlurRadius": 3,
  "toolTipPaddingRight": 6,
  "paddingBottom": 0,
  "playbackBarBorderSize": 0,
  "playbackBarHeadBorderColor": "#000000",
  "playbackBarBackgroundOpacity": 1,
  "progressLeft": 0,
  "playbackBarHeadShadowColor": "#000000",
  "playbackBarHeadBorderSize": 0,
  "progressRight": 0,
  "progressOpacity": 1,
  "progressBarBackgroundColorDirection": "vertical",
  "toolTipTextShadowOpacity": 0,
  "playbackBarHeadShadow": true,
  "toolTipFontWeight": "normal",
  "progressBackgroundOpacity": 1,
  "playbackBarOpacity": 1
 }
], 
 "contentOpaque": false,
 "width": "100%",
 "paddingLeft": 0,
 "overflow": "visible",
 "scrollBarWidth": 10,
 "shadow": false,
 "paddingTop": 0,
 "borderSize": 0,
 "mouseWheelEnabled": true,
 "backgroundPreloadEnabled": true,
 "scrollBarColor": "#000000",
 "height": "100%",
 "minHeight": 20,
 "class": "Player",
 "scrollBarOpacity": 0.5,
 "minWidth": 20,
 "borderRadius": 0,
 "paddingBottom": 0,
 "start": "this.mainPlayList.set('selectedIndex', 0)",
 "paddingRight": 0,
 "scripts": {
  "getPlayListWithMedia": function(media, onlySelected){    var playLists = window.tdvplayer.getByClassName('PlayList');   for(var i = 0, count = playLists.length; i<count; ++i){       var playList = playLists[i];       if(onlySelected && playList.get('selectedIndex') == -1)           continue;       var items = playList.get('items');       for(var j = 0, countJ = items.length; j<countJ; ++j){           if(items[j].get('media') == media)               return playList;       }   }   return undefined; },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){    var self = this;   var stateChangeFunction = function(event){       if(event.data.state == 'stopped'){           dispose();       }   };   var changeFunction = function(){       var index = playListDispatcher.get('selectedIndex');       if(index != -1){           indexDispatcher = index;           dispose();       }   };   var dispose = function(){       playList.set('selectedIndex', -1);       playListDispatcher.set('selectedIndex', indexDispatcher);       if(player)           player.unbind('stateChange', stateChangeFunction, self);       if(sameViewerArea){           if(playList != playListDispatcher)               playListDispatcher.unbind('change', changeFunction, self);       }       else{           viewerArea.set('visible', false);       }   };   var playListDispatcher = undefined;   if(!mediaDispatcher){       var currentIndex = playList.get('selectedIndex');       var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.MainViewer;       if(currentPlayer.get('panorama')) mediaDispatcher = currentPlayer.get('panorama');       else if(currentPlayer.get('video')) mediaDispatcher = currentPlayer.get('video');       else if(currentPlayer.get('photoAlbum')) mediaDispatcher = currentPlayer.get('photoAlbum');       else if(currentPlayer.get('map')) mediaDispatcher = currentPlayer.get('map');   }   var playListDispatcher = this.getPlayListWithMedia(mediaDispatcher, true);   if(!playListDispatcher){       playList.set('selectedIndex', index);       return;   }   var indexDispatcher = playListDispatcher.get('selectedIndex');   if(playList.get('selectedIndex') == index || indexDispatcher == -1){       return;   }   var item = playList.get('items')[index];   var itemDispatcher = playListDispatcher.get('items')[indexDispatcher];   var viewerArea = item.get('player').get('viewerArea');   var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea');   if(sameViewerArea){       if(playList != playListDispatcher){           playListDispatcher.set('selectedIndex', -1);           playListDispatcher.bind('change', changeFunction, this);       }   }   else{       viewerArea.set('visible', true);   }   playList.set('selectedIndex', index);   if(item.get('player') != itemDispatcher.get('player')){       var player = item.get('player');       player.bind('stateChange', stateChangeFunction, this);   }   this.executeFunctionWhenChange(playList, index, dispose); },
  "pauseGlobalAudios": function(){    var audios = window.currentGlobalAudios;   if(!audios) return;   for(var i = 0, count = audios.length; i<count; i++){       audios[i].pause();   } },
  "shareGoogle": function(url){    window.open('https://plus.google.com/share?url=' + url, '_blank'); },
  "pausePlayList": function(playList, containsAudio){    if(playList){       var player = playList.get('items')[playList.get('selectedIndex')].get('player');       if(player){           if(!containsAudio && typeof player.pauseCamera !== 'undefined'){               player.pauseCamera();           }           else{               player.pause();           }       }   } },
  "updatePlayListsUI": function(playLists){    var changeFunction = function(event){       var playListDispatched = event.source;       var selectedIndex = playListDispatched.get('selectedIndex');       if(selectedIndex < 0)           return;       var media = playListDispatched.get('items')[selectedIndex].get('media');       for(var i = 0, count = playLists.length; i<count; ++i){           var playList = playLists[i];           if(playList != playListDispatched){               var items = playList.get('items');               for(var j = 0, countJ = items.length; j<countJ; ++j){                   if(items[j].get('media') == media){                       if(playList.get('selectedIndex') != j){                           playList.set('selectedIndex', j);                       }                       break;                   }               }           }       }   };   for(var i = 0, count = playLists.length; i<count; ++i){       playLists[i].bind('change', changeFunction, this);   } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){    var changeFunction = function(event){       if(event.data.previousSelectedIndex == index){           this.stopGlobalAudio(audio);           playList.unbind('change', changeFunction, this);           if(endCallback)               endCallback();       }   };   playList.bind('change', changeFunction, this);   this.playGlobalAudio(audio, endCallback); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){    var changeFunction = function(){       var index = playList.get('selectedIndex');       if(index >= 0){           var beginFunction = function(){               playListItem.unbind('begin', beginFunction);               setMediaLabel(index);           };           var setMediaLabel = function(index){               var media = playListItem.get('media');               var text = media.get('data');               if(!text)                   text = media.get('label');               setHtml(text);           };           var setHtml = function(text){               htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>');                          };           var playListItem = playList.get('items')[index];           if(htmlText.get('html')){               setHtml('Loading...');               playListItem.bind('begin', beginFunction);           }           else{               setMediaLabel(index);           }       }   };   var disposeFunction = function(){       htmlText.set('html', undefined);       playList.unbind('change', changeFunction, this);       playListItemStopToDispose.unbind('stop', disposeFunction, this);   };   if(playListItemStopToDispose){       playListItemStopToDispose.bind('stop', disposeFunction, this);   }   playList.bind('change', changeFunction, this);   changeFunction(); },
  "playAudioList": function(audios){    if(audios.length == 0) return;   var currentAudioCount = -1;   var currentAudio;   var playGlobalAudioFunction = this.playGlobalAudio;   var playNext = function(){       if(++currentAudioCount >= audios.length)           currentAudioCount = 0;       currentAudio = audios[currentAudioCount];       playGlobalAudioFunction(currentAudio, playNext);   };   playNext(); },
  "updateVideoCues": function(playList, index){    var playListItem = playList.get('items')[index];   var video = playListItem.get('media');   if(video.get('cues').length == 0)       return;   var player = playListItem.get('player');   var cues = [];   var changeFunction = function(){       if(playList.get('selectedIndex') != index){           video.unbind('cueChange', cueChangeFunction, this);           playList.unbind('change', changeFunction, this);       }   };   var cueChangeFunction = function(event){       var activeCues = event.data.activeCues;       for(var i = 0, count = cues.length; i<count; ++i){           var cue = cues[i];           if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){               cue.trigger('end');           }       }       cues = activeCues;   };   video.bind('cueChange', cueChangeFunction, this);   playList.bind('change', changeFunction, this); },
  "showWindow": function(w, autoCloseMilliSeconds, currentPlayListToPause, containsAudio){    var closeFunction = function(){       clearAutoClose();       this.resumePlayList(currentPlayListToPause, containsAudio);       w.unbind('close', closeFunction, this);   };   var clearAutoClose = function(){       w.unbind('click', clearAutoClose, this);       if(timeoutID != undefined){           clearTimeout(timeoutID);       }   };   var timeoutID = undefined;   if(autoCloseMilliSeconds){       var autoCloseFunction = function(){           w.hide();       };       w.bind('click', clearAutoClose, this);       timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds);   }   this.pausePlayList(currentPlayListToPause, containsAudio);   w.bind('close', closeFunction, this);   w.show(this, true); },
  "playGlobalAudio": function(audio, endCallback){    var endFunction = function(){       audio.unbind('end', endFunction, this);       this.stopGlobalAudio(audio);       if(endCallback)           endCallback();   };   var audios = window.currentGlobalAudios;   if(!audios){       audios = window.currentGlobalAudios = [audio];   }   else if(audios.indexOf(audio) == -1){       audios.push(audio);   }   audio.bind('end', endFunction, this);   audio.play(); },
  "resumeGlobalAudios": function(){    var audios = window.currentGlobalAudios;   if(!audios) return;   for(var i = 0, count = audios.length; i<count; i++){       audios[i].play();   } },
  "resumePlayList": function(playList, containsAudio){    if(playList){       var player = playList.get('items')[playList.get('selectedIndex')].get('player');       if(player){           if(!containsAudio && typeof player.resumeCamera !== 'undefined'){               player.resumeCamera();           }           else{               player.play();           }       }   } },
  "stopGlobalAudio": function(audio){    var audios = window.currentGlobalAudios;   if(audios){       var index = audios.indexOf(audio);       if(index != -1){           audios.splice(index, 1);       }   }   audio.stop(); },
  "autotriggerAtStart": function(player, callback){    var stateChangeFunction = function(event){        if(event.data.state == 'playing'){           callback();           player.unbind('stateChange', stateChangeFunction, this);       }   };   player.bind('stateChange', stateChangeFunction, this); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){    var changeVisibility = function(){        if(effect && propertyEffect){            component.set(propertyEffect, effect);        }        component.set('visible', visible);       if(component.get('class') == 'ViewerArea'){           if(visible) component.restart();           else        component.pause();       }   };   var effectTimeoutName = 'effectTimeout_'+component.get('id');   if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){       var effectTimeout = window[effectTimeoutName];       if(effectTimeout instanceof Array){           for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) }       }else{           clearTimeout(effectTimeout);       }       delete window[effectTimeoutName];   }   else if(visible == component.get('visible') && !ignoreClearTimeout)       return;   if(applyAt && applyAt > 0){       var effectTimeout = setTimeout(function(){            if(window[effectTimeoutName] instanceof Array) {                var arrayTimeoutVal = window[effectTimeoutName];               var index = arrayTimeoutVal.indexOf(effectTimeout);               arrayTimeoutVal.splice(index, 1);               if(arrayTimeoutVal.length == 0){                   delete window[effectTimeoutName];               }           }else{               delete window[effectTimeoutName];            }           changeVisibility();        }, applyAt);       if(window.hasOwnProperty(effectTimeoutName)){           window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout];       }else{           window[effectTimeoutName] = effectTimeout;       }   }   else{       changeVisibility();   } },
  "changeBackgroundWhilePlay": function(playList, index, color){    var changeFunction = function(event){       if(event.data.previousSelectedIndex == index){           playList.unbind('change', changeFunction, this);           if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){               viewerArea.set('backgroundColor', backgroundColorBackup);               viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup);           }       }   };   var playListItem = playList.get('items')[index];   var player = playListItem.get('player');   var viewerArea = player.get('viewerArea');   var backgroundColorBackup = viewerArea.get('backgroundColor');   var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios');   var colorRatios = [0];   if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){       viewerArea.set('backgroundColor', color);       viewerArea.set('backgroundColorRatios', colorRatios);       playList.bind('change', changeFunction, this);   } },
  "fixTogglePlayPauseButton": function(player){    var state = player.get('state');   var button = player.get('buttonPlayPause');   if(typeof button !== 'undefined' && player.get('state') == 'playing'){       button.set('pressed', true);   } },
  "shareTwitter": function(url){    window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "loopAlbum": function(playList, index){    var playListItem = playList.get('items')[index];   var player = playListItem.get('player');   var loopFunction = function(){       player.play();   };   this.executeFunctionWhenChange(playList, index, loopFunction); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){    var rollOutFunction = function(){       var rollOverFunction = function(){           clearTimeout(timeoutID);           dispose();       };       var timeoutFunction = function(){           setVisibility(false);           dispose();       };       var dispose = function(){           parentComponent.unbind('rollOver', rollOverFunction, this);       };       parentComponent.unbind('rollOut', rollOutFunction, this);       parentComponent.bind('rollOver', rollOverFunction, this);       var timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut);   };   var setVisibility = function(visible){       for(var i = 0, length = components.length; i<length; i++){           components[i].set('visible', visible);       }   };   parentComponent.bind('rollOut', rollOutFunction, this);   setVisibility(true); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, playListToPause, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){    var self = this;   var closed = false;   var playerClickFunction = function() {       zoomImage.unbind('loaded', loadedFunction, self);       hideFunction();   };   var clearAutoClose = function(){       zoomImage.unbind('click', clearAutoClose, this);       if(timeoutID != undefined){           clearTimeout(timeoutID);       }   };   var loadedFunction = function(){       self.unbind('click', playerClickFunction, self);       veil.set('visible', true);       setCloseButtonPosition();       closeButton.set('visible', true);       zoomImage.unbind('loaded', loadedFunction, this);       zoomImage.bind('userInteractionStart', userInteractionStartFunction, this);       zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this);       timeoutID = setTimeout(timeoutFunction, 200);   };   var timeoutFunction = function(){       timeoutID = undefined;       if(autoCloseMilliSeconds){           var autoCloseFunction = function(){               hideFunction();           };           zoomImage.bind('click', clearAutoClose, this);           timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds);       }       zoomImage.bind('backgroundClick', hideFunction, this);       if(toggleImage) {           zoomImage.bind('click', toggleFunction, this);           zoomImage.set('imageCursor', 'hand');       }       closeButton.bind('click', hideFunction, this);       if(loadedCallback)           loadedCallback();   };   var hideFunction = function() {       closed = true;       if(timeoutID)           clearTimeout(timeoutID);       if(autoCloseMilliSeconds)           clearAutoClose();       if(hideCallback)           hideCallback();       zoomImage.set('visible', false);       if(hideEffect && hideEffect.get('duration') > 0){           hideEffect.bind('end', endEffectFunction, this);       }       else{           zoomImage.set('image', null);       }       closeButton.set('visible', false);       veil.set('visible', false);       self.unbind('click', playerClickFunction, self);       zoomImage.unbind('backgroundClick', hideFunction, this);       zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this);       zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true);       if(toggleImage) {           zoomImage.unbind('click', toggleFunction, this);           zoomImage.set('cursor', 'default');       }       closeButton.unbind('click', hideFunction, this);       if(playListToPause){           self.resumePlayList(playListToPause, audio != null && stopBackgroundAudio);       }       if(audio){           if(stopBackgroundAudio){               self.resumeGlobalAudios();           }           self.stopGlobalAudio(audio);       }   };   var endEffectFunction = function() {       zoomImage.set('image', null);       hideEffect.unbind('end', endEffectFunction, this);   };   var toggleFunction = function() {       zoomImage.set('image', isToggleVisible() ? image : toggleImage);   };   var isToggleVisible = function() {       return zoomImage.get('image') == toggleImage;   };   var setCloseButtonPosition = function() {       var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10;       var top = zoomImage.get('imageTop') + 10;       if(right < 10) right = 10;       if(top < 10) top = 10;       closeButton.set('right', right);       closeButton.set('top', top);   };   var userInteractionStartFunction = function() {       if(timeoutUserInteractionID){           clearTimeout(timeoutUserInteractionID);           timeoutUserInteractionID = undefined;       }       else{           closeButton.set('visible', false);       }   };   var userInteractionEndFunction = function() {       if(!closed){           timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300);       }   };   var userInteractionTimeoutFunction = function() {       timeoutUserInteractionID = undefined;       closeButton.set('visible', true);       setCloseButtonPosition();   };   var veil = this.veilPopupPanorama;   var zoomImage = this.zoomImagePopupPanorama;   var closeButton = this.closeButtonPopupPanorama;   if(closeButtonProperties){       for(var key in closeButtonProperties){           closeButton.set(key, closeButtonProperties[key]);       }   }   if(playListToPause){       this.pausePlayList(playListToPause, audio != null && stopBackgroundAudio);   }   if(audio){       if(stopBackgroundAudio){           this.pauseGlobalAudios();       }       this.playGlobalAudio(audio);   }   var timeoutID = undefined;   var timeoutUserInteractionID = undefined;   zoomImage.bind('loaded', loadedFunction, this);   setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0);   zoomImage.set('image', image);   zoomImage.set('customWidth', customWidth);   zoomImage.set('customHeight', customHeight);   zoomImage.set('showEffect', showEffect);   zoomImage.set('hideEffect', hideEffect);   zoomImage.set('visible', true);   return zoomImage; },
  "shareFacebook": function(url){    window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "loadFromCurrentMediaPlayList": function(playList, delta){    var currentIndex = playList.get('selectedIndex');   var totalItems = playList.get('items').length;   var newIndex = (currentIndex + delta) % totalItems;   while(newIndex < 0){       newIndex = totalItems + newIndex;   };   if(currentIndex != newIndex){       playList.set('selectedIndex', newIndex);   }; },
  "startPanoramaWithCamera": function(playList, index, camera){    var playListItem = playList.get('items')[index];   var previousCamera = playListItem.get('camera');   playListItem.set('camera', camera);   var restoreCameraOnStop = function(){       playListItem.set('camera', previousCamera);       playListItem.unbind('stop', restoreCameraOnStop, this);   };   playListItem.bind('stop', restoreCameraOnStop, this);   playList.set('selectedIndex', index); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){    var self = this;   var changePlayListFunction = function(event){       if(event.data.previousSelectedIndex == index){           if(changeFunction) changeFunction();           if(endFunction) endObject.unbind('end', endFunction, self);           playList.unbind('change', changePlayListFunction, self);       }   };   if(endFunction){       var playListItem = playList.get('items')[index];       var camera = playListItem.get('camera');       if(camera){           var endObject = camera.get('initialSequence');           if(!endObject) return;       }       else{           endObject = playListItem.get('media');       }       endObject.bind('end', endFunction, this);   }   playList.bind('change', changePlayListFunction, this); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){    var resetFunction = function(){       panoramaPlayListItem.unbind('stop', resetFunction, this);       player.set('mapPlayer', null);   };   panoramaPlayListItem.bind('stop', resetFunction, this);   var player = panoramaPlayListItem.get('player');   player.set('mapPlayer', mapPlayer); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index){    var audios = window.currentGlobalAudios;   if(!audios) return;   var resumeFunction = this.resumeGlobalAudios;   var endFunction = function(){       resumeFunction();   };   this.pauseGlobalAudios();   this.executeFunctionWhenChange(playList, index, endFunction, endFunction); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){    var endFunction = function(){       if(playList.get('selectedIndex') == fromIndex)           playList.set('selectedIndex', toIndex);   };   this.executeFunctionWhenChange(playList, fromIndex, endFunction); }
 },
 "verticalAlign": "top",
 "gap": 10,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "scrollBarMargin": 2
})