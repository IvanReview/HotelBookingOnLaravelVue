(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_admin_BookingSchedule_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/admin/BookingSchedule.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/admin/BookingSchedule.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'Schedule',
  data: function data() {
    return {
      focus: '',
      type: 'week',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days'
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party']
    };
  },
  mounted: function mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    viewDay: function viewDay(_ref) {
      var date = _ref.date;
      this.focus = date;
      this.type = 'day';
    },
    getEventColor: function getEventColor(event) {
      return event.color;
    },
    setToday: function setToday() {
      this.focus = '';
    },
    prev: function prev() {
      this.$refs.calendar.prev();
    },
    next: function next() {
      this.$refs.calendar.next();
    },
    showEvent: function showEvent(_ref2) {
      var _this = this;

      var nativeEvent = _ref2.nativeEvent,
          event = _ref2.event;

      var open = function open() {
        _this.selectedEvent = event;
        _this.selectedElement = nativeEvent.target;
        setTimeout(function () {
          _this.selectedOpen = true;
        }, 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange: function updateRange(_ref3) {
      var start = _ref3.start,
          end = _ref3.end;
      var events = [];
      var min = new Date("".concat(start.date, "T00:00:00"));
      var max = new Date("".concat(end.date, "T23:59:59"));
      var days = (max.getTime() - min.getTime()) / 86400000;
      var eventCount = this.rnd(days, days + 20);

      for (var i = 0; i < eventCount; i++) {
        var allDay = this.rnd(0, 3) === 0;
        var firstTimestamp = this.rnd(min.getTime(), max.getTime());
        var first = new Date(firstTimestamp - firstTimestamp % 900000);
        var secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        var second = new Date(first.getTime() + secondTimestamp);
        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay
        });
      }

      this.events = events;
    },
    rnd: function rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    }
  }
});

/***/ }),

/***/ "./resources/js/components/admin/BookingSchedule.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/admin/BookingSchedule.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BookingSchedule_vue_vue_type_template_id_10e5d5f5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BookingSchedule.vue?vue&type=template&id=10e5d5f5& */ "./resources/js/components/admin/BookingSchedule.vue?vue&type=template&id=10e5d5f5&");
/* harmony import */ var _BookingSchedule_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BookingSchedule.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/BookingSchedule.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _BookingSchedule_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _BookingSchedule_vue_vue_type_template_id_10e5d5f5___WEBPACK_IMPORTED_MODULE_0__.render,
  _BookingSchedule_vue_vue_type_template_id_10e5d5f5___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/BookingSchedule.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/BookingSchedule.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/admin/BookingSchedule.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BookingSchedule_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BookingSchedule.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/admin/BookingSchedule.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BookingSchedule_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/components/admin/BookingSchedule.vue?vue&type=template&id=10e5d5f5&":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/admin/BookingSchedule.vue?vue&type=template&id=10e5d5f5& ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BookingSchedule_vue_vue_type_template_id_10e5d5f5___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BookingSchedule_vue_vue_type_template_id_10e5d5f5___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BookingSchedule_vue_vue_type_template_id_10e5d5f5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BookingSchedule.vue?vue&type=template&id=10e5d5f5& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/admin/BookingSchedule.vue?vue&type=template&id=10e5d5f5&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/admin/BookingSchedule.vue?vue&type=template&id=10e5d5f5&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/admin/BookingSchedule.vue?vue&type=template&id=10e5d5f5& ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-row",
    { staticClass: "fill-height" },
    [
      _c(
        "v-col",
        [
          _c(
            "v-sheet",
            { attrs: { height: "64" } },
            [
              _c(
                "v-toolbar",
                { attrs: { flat: "" } },
                [
                  _c(
                    "v-btn",
                    {
                      staticClass: "mr-4",
                      attrs: { outlined: "", color: "orange" },
                      on: { click: _vm.setToday }
                    },
                    [_vm._v("\n                    Today\n                ")]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { fab: "", text: "", small: "", color: "white" },
                      on: { click: _vm.prev }
                    },
                    [
                      _c("v-icon", { attrs: { small: "" } }, [
                        _vm._v(
                          "\n                        mdi-chevron-left\n                    "
                        )
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { fab: "", text: "", small: "", color: "white" },
                      on: { click: _vm.next }
                    },
                    [
                      _c("v-icon", { attrs: { small: "" } }, [
                        _vm._v(
                          "\n                        mdi-chevron-right\n                    "
                        )
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm.$refs.calendar
                    ? _c("v-toolbar-title", [
                        _vm._v(
                          "\n                    " +
                            _vm._s(_vm.$refs.calendar.title) +
                            "\n                "
                        )
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c("v-spacer"),
                  _vm._v(" "),
                  _c(
                    "v-menu",
                    {
                      attrs: { bottom: "", right: "" },
                      scopedSlots: _vm._u([
                        {
                          key: "activator",
                          fn: function(ref) {
                            var on = ref.on
                            var attrs = ref.attrs
                            return [
                              _c(
                                "v-btn",
                                _vm._g(
                                  _vm._b(
                                    {
                                      attrs: { outlined: "", color: "primary" }
                                    },
                                    "v-btn",
                                    attrs,
                                    false
                                  ),
                                  on
                                ),
                                [
                                  _c("span", [
                                    _vm._v(_vm._s(_vm.typeToLabel[_vm.type]))
                                  ]),
                                  _vm._v(" "),
                                  _c("v-icon", { attrs: { right: "" } }, [
                                    _vm._v(
                                      "\n                                mdi-menu-down\n                            "
                                    )
                                  ])
                                ],
                                1
                              )
                            ]
                          }
                        }
                      ])
                    },
                    [
                      _vm._v(" "),
                      _c(
                        "v-list",
                        [
                          _c(
                            "v-list-item",
                            {
                              on: {
                                click: function($event) {
                                  _vm.type = "day"
                                }
                              }
                            },
                            [_c("v-list-item-title", [_vm._v("Day")])],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-list-item",
                            {
                              on: {
                                click: function($event) {
                                  _vm.type = "week"
                                }
                              }
                            },
                            [_c("v-list-item-title", [_vm._v("Week")])],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-list-item",
                            {
                              on: {
                                click: function($event) {
                                  _vm.type = "month"
                                }
                              }
                            },
                            [_c("v-list-item-title", [_vm._v("Month")])],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-list-item",
                            {
                              on: {
                                click: function($event) {
                                  _vm.type = "4day"
                                }
                              }
                            },
                            [_c("v-list-item-title", [_vm._v("4 days")])],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-sheet",
            { attrs: { height: "600" } },
            [
              _c("v-calendar", {
                ref: "calendar",
                attrs: {
                  locale: "ru-RU",
                  "header-color": "purple darken-3",
                  color: "primary",
                  events: _vm.events,
                  "event-color": _vm.getEventColor,
                  type: _vm.type
                },
                on: {
                  "click:event": _vm.showEvent,
                  "click:more": _vm.viewDay,
                  "click:date": _vm.viewDay,
                  change: _vm.updateRange
                },
                model: {
                  value: _vm.focus,
                  callback: function($$v) {
                    _vm.focus = $$v
                  },
                  expression: "focus"
                }
              }),
              _vm._v(" "),
              _c(
                "v-menu",
                {
                  attrs: {
                    "close-on-content-click": false,
                    activator: _vm.selectedElement,
                    "offset-x": ""
                  },
                  model: {
                    value: _vm.selectedOpen,
                    callback: function($$v) {
                      _vm.selectedOpen = $$v
                    },
                    expression: "selectedOpen"
                  }
                },
                [
                  _c(
                    "v-card",
                    {
                      attrs: {
                        color: "grey lighten-4",
                        "min-width": "350px",
                        flat: ""
                      }
                    },
                    [
                      _c(
                        "v-toolbar",
                        { attrs: { color: _vm.selectedEvent.color, dark: "" } },
                        [
                          _c(
                            "v-btn",
                            { attrs: { icon: "" } },
                            [_c("v-icon", [_vm._v("mdi-pencil")])],
                            1
                          ),
                          _vm._v(" "),
                          _c("v-toolbar-title", {
                            domProps: {
                              innerHTML: _vm._s(_vm.selectedEvent.name)
                            }
                          }),
                          _vm._v(" "),
                          _c("v-spacer"),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            { attrs: { icon: "" } },
                            [_c("v-icon", [_vm._v("mdi-heart")])],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            { attrs: { icon: "" } },
                            [_c("v-icon", [_vm._v("mdi-dots-vertical")])],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("v-card-text", [
                        _c("span", {
                          domProps: {
                            innerHTML: _vm._s(_vm.selectedEvent.details)
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c(
                        "v-card-actions",
                        [
                          _c(
                            "v-btn",
                            {
                              attrs: { text: "", color: "secondary" },
                              on: {
                                click: function($event) {
                                  _vm.selectedOpen = false
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                            Cancel\n                        "
                              )
                            ]
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);