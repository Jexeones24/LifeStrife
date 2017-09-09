import React, { Component } from 'react'
import { Input, Menu, Icon, Image, Header } from 'semantic-ui-react'
import { Link } from 'react-router'

export default class NavBar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    console.log("clicked me")
  }



  render() {
    const { activeItem } = this.state

    return (
      <div className="navbar">
        <Menu secondary>
          <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Item name='new decision' active={activeItem === 'new decision'} onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
            <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick} />
          </Menu.Menu>
        </Menu>
        <div className="title">
          <Header as='h2' icon textAlign='center'>
            <Icon name='users' circular />
            <Header.Content>
              LIFE STRIFE
            </Header.Content>
          </Header>
          <Image centered size='large' src='/assets/images/wireframe/centered-paragraph.png' />
        </div>
      </div>
    )
  }
}
