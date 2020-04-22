import React, { Component } from 'react';


class CounterWigdet extends Component {
  render () {
    return (
      <div className={'card prod-p-card card-' + (this.props.color ?? 'blue')}>
        <div className="card-body">
          <div className="row align-items-center mb-30">
              <div className="col">
                  <h6 className={ this.props.color ? 'mb-5 text-white' : 'mb-5 text-black'}>{this.props.title ?? ''}</h6>
                  <h3 className={this.props.color ? 'mb-0 fw-700 text-white' : 'mb-0 fw-700 text-black'}>{this.props.top_value ?? ''}</h3>
              </div>
              <div className="col-auto">
                  <i className={'fas fa-' + (this.props.icon ?? 'fa-gear') + ' text-' + (this.props.color ?? 'blue') + ' f-18'}></i>
              </div>
          </div>
          <p className={ this.props.color ? 'mb-0 text-white' : 'mb-0 text-black'}><span className="label label-primary mr-10">{this.props.bottom_value ?? ''}</span>{this.props.label ?? ''}</p>
        </div>
      </div>
    );
  }
}

export default CounterWigdet;