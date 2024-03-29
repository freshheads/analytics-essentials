# Tagmanager setup

## For Nextjs

#### **`app.tsx`**

```jsx
const App = () => {
  return (
    <>
      {process.env.NEXT_PUBLIC_GTM_ID && (
        <LoadTagManager
            measurementID={process.env.NEXT_PUBLIC_GTM_ID}
        />
      )}
    </>
  );
};
```

## Usage

```js
import {
    EventType,
    pushDataLayerEvent,
} from '@freshheads/analytics-essentials';

pushDataLayerEvent({
    type: EventType.CLICK,
    name: 'hero_button_click',
});
```

## Optional params

```js
pushDataLayerEvent({
    type: EventType.CLICK,
    name: 'hero_button_click',
    context: {
      // context is typed based on type
      // you can always extend context with your custom properties
    }
}),

```
