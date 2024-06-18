export default function ErrorPage({ error }) {
  return (
    <>
      <h2>Error</h2>
      <h3>{error?.err.message}</h3>
    </>
  );
}
