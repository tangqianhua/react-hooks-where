import React, { Component, PureComponent, memo } from 'react'

const Footer = memo((props) => {
  console.log(props)
    return (
      <div>
          footer: {props.footer}
      </div>
    )
})
export default class Header extends Component {
  state = {
    footer: 1
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   if(nextState.footer > 10) {
  //     return false
  //   }
  //   return true
  // }
  render() {
    const { footer } = this.state
    return (
      <div>
        header
        <button onClick={() => this.setState({footer: 1})}>change footer</button>
        <Footer footer={footer} />
      </div>
    )
  }
}
