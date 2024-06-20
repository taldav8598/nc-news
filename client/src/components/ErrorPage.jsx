export default function ErrorPage({ error }) {
  return (
    <>
      <h3>{error?.message}</h3>
    </>
  );
}
