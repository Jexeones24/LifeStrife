import React, { Component } from 'react'
import { Input, Menu, Image, Header, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';


export default class NavBar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    this.props.renderDecisionForm()
  }

  render() {
    const { activeItem } = this.state

    return (
      <div className="navbar">
        <Menu secondary>
          <Button basic color='blue'><Link to="/">Home</Link></Button>
          <Button basic color='blue'><Link to="/new">New Decision</Link></Button>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
            <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick} />
          </Menu.Menu>
        </Menu>
        <div className="title">
          <Header as='h2' textAlign='center'>
            <Header.Content>
              <h1>LIFE STRIFE</h1>
            </Header.Content>
          </Header>
          <Image centered size='large' src='/assets/images/wireframe/centered-paragraph.png' />
        </div>
      </div>
    )
  }
}
