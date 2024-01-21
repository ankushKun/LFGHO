# Karma Vouch

It provides a set of components and functions that can be used to implement the vouching contract in your web app.

[![npm version](https://badge.fury.io/js/karma-vouch.svg)](https://badge.fury.io/js/karma-vouch)

Made during [LFGHO](https://ethglobal.com/events/lfgho/home)

## Installation

```bash
npm i karma-vouch
```

## Usage

```tsx
import useVouch from 'karma-vouch'

...

// In a react component
const {
    JoinDAOButton,
    ExitDAOButton,
    VouchButton,
    getVouches,
    isInDAO 
} = useVouch(
    "0xYOUR_ADDRESS",     // required (used in VouchButton)
    "0xCONTRACT_ADDRESS" // optional
)
```

### `JoinDAOButton` Component

A button that will join the DAO when clicked. It should only be visible if the user is not already in the DAO.

Props and styles can be added like a regular button

```jsx
<JoinDAOButton className="..." style={{...}}/>
```

### `ExitDAOButton` Component

A button that will exit the DAO when clicked. It should only be visible if the user is already in the DAO.

Props and styles can be added like a regular button

```jsx
<ExitDAOButton className="..." style={{...}}/>
```

### `VouchButton` Component

A button that will vouch for the given user when clicked. It should only be visible if the user is already joined in the DAO.

Props and styles can be added like a regular button

```jsx
<VouchButton className="..." style={{...}}/>
```

### `getVouches` Function

Returns the details about the addresses that have vouched for a specific person and their facilitator details.

```jsx
const {addresses, facilitator} = await getVouches("0xUSER_ADDRESS")
```

```tsx
addresses: string[]
facilitator: {
    bucketCapacity: number
    bucketLevel: number
    label: string
    count: number
    value: number
    addrs: string
}
```

### `isInDAO` Function

Returns a `boolean` indicating whether the given address is in the DAO or not.

```jsx
const joined = await isInDAO("0xUSER_ADDRESS")
```

```tsx
joined:boolean
```