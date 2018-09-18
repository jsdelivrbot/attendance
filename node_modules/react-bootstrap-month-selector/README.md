# React Bootstrap powered month selector

Form control to select a single month or a range of months.

<img src="https://raw.githubusercontent.com/joshduck/react-bootstrap-month-selector/master/docs/popover.png" alt="Month range selector" width="307" />

## Usage

    npm install react-bootstrap-month-selector --save

Render a month range popover:

    import RangePopover from 'react-bootstrap-month-selector';
    <RangePopover
      start={{ month: 1, year: 2012 }}
      end={{ month: 6, year: 2012 }}
      onSave={console.log}
    />

Render a trigger element that reveals the popover:

    <OverlayTrigger
      rootClose
      trigger="click"
      placement="right"
      overlay={
        <RangePopover
          start={{ month: 1, year: 2012 }}
          end={{ month: 6, year: 2012 }}
          showButtons={false}
          onChange={console.log}
        />
      }
    >
      <Button>Show Popover</Button>
    </OverlayTrigger>

For a single month selector:

    import { MonthSelector } from 'react-bootstrap-month-selector';
    <MonthSelector
      month={1}
      year={2012}
      onSelect={console.log}
    />

## API

### <MonthSelector />

* **Properties**
  * onSelect - function to call when a month is clicked.
  * month - number of default month (zero indexed).
  * year - number of default year.

### <RangePopover />

* **Properties**
  * onSave - function to call when save button is clicked.
  * onClose - function to call when close button is clicked.
  * onChange - function to call when and month is clicked.
  * start - object containing `month` and `year` keys.
  * end - object containing `month` and `year` keys.
  * showButtons - optional boolean to show or hide the save and close buttons.
