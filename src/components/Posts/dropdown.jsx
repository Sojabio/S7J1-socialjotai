import Dropdown from 'react-bootstrap/Dropdown'

const DropdownButton = () => {

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        5
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">10</Dropdown.Item>
        <Dropdown.Item href="#/action-2">15</Dropdown.Item>
        <Dropdown.Item href="#/action-3">20</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

  )
}

export default DropdownButton;
