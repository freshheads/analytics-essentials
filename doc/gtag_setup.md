# Gtag setup

## For Nextjs

#### **`app.tsx`**

```jsx
const App = () => {
  return (
    <>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <LoadGA4
          measurementID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
          debug={true} // optional
          defaultConsent={{
            ad_storage: 'denied',
            analytics_storage: 'denied',
          }} // optional
        />
      )}
    </>
  );
};
```