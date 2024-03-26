import React, { Component } from "react";

export default class MyTextArea extends Component {
  render() {
    const className =
      !this.props.touched || this.props.valid
        ? "form-control"
        : "form-control control-error";
    return (
      <div className="form-group">
        <label>{this.props.label} </label>
        <textarea className={className} {...this.props} />
      </div>
    );
  }
}

MyTextArea.defaultProps = {
  label: "",
  name: "textarea",
  placeholder: "",
  defaultValue: "",
};
