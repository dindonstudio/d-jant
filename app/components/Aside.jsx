export function Aside({children, heading, id = 'aside'}) {
  return (
    <div aria-modal className="overlay" id={id} role="dialog">
      <button
        className="close-outside"
        onClick={() => {
          // Find the hidden link and click it
          document.getElementById('reset-hash-link').click();
        }}
      />
      <aside className="md:pt-8">
        <header className="">
          <h4>Panier</h4>
          <CloseAside />
        </header>
        <main>{children}</main>
      </aside>
      {/* Hidden link to reset the hash */}
      <a href="#close" id="reset-hash-link" style={{ display: 'none' }}></a>
    </div>
  );
}

function CloseAside() {
  return (
    <a
      className="close"
      href="#&&&"
      onClick={(e) => {
        e.preventDefault(); // Prevents default link action
        document.getElementById('reset-hash-link').click();
      }}
    >
      <h4>&times;</h4>
    </a>
  );
}

