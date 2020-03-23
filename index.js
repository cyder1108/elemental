"use strict";
const EventEmitter = require("events").EventEmitter;
const _ = require("lodash")
const $ = require("jquery")

class Elemental extends EventEmitter {
  constructor( tagName = "div", attr= {}, content = null) {
    super()
    this.$$typeof = "Elemental"
    this.tagName  = tagName
    this.attr = attr
    this.el   = document.createElement(this.tagName)
    this.$el  = $(this.el)
    this.$el.attr(this.attr)
    this.setContent(content)
  }
  render() {
    return this;
  }
  setContent(content) {
    if( _.isArray( content ) ){
      _.each(content, (arg) => this.append(arg))
    } else  {
      this.append( content );
    }
    return this;
  }

  append( content ){
    if( _.isArray( content ) ) {
      let _tagName = content[0] || "div"
      let _attr    = content[1] || {}
      let _content = content[2] || null
      let e = new this.constructor(_tagName,_attr,_content)
      this.$el.append(e.el);
    } else if( _.isString( content ) ) {
      this.$el.append(content);
    } else {
      this.$el.append(content);
    }
  }
}

const el = (tagName, attr, content) => {
  return new Elemental(tagName, attr, content)
}

module.exports = { el, Elemental }
