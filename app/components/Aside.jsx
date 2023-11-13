/**
 * A side bar component with Overlay that works without JavaScript.
 * @example
 * ```jsx
 * <Aside id="search-aside" heading="SEARCH">
 *  <input type="search" />
 *  ...
 * </Aside>
 * ```
 * @param {{
 *   children?: React.ReactNode;
 *   heading: React.ReactNode;
 *   id?: string;
 * }}
 */
export function Aside({children, heading, id = 'aside'}) {
  return (
    <div aria-modal className="overlay " id={id} role="dialog">
      <button
        className="close-outside"
        onClick={() => {
    
          window.location.hash = '';
        }}
      />
      <aside className="md:pt-8">
        <header className="">
          <h4>Panier</h4>
          <CloseAside />
        </header>
        <main>{children}</main>
      </aside>
    </div>
  );
}

function CloseAside() {
  return (
    /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
    <a className="close" href="" >
      <h4>
      &times;
      </h4>
    
    </a>
  );
}
