function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-secondary fixed-top">
      <div class="container col-lg-12">
        <a class="navbar-brand" href="/">
          VocabGREview
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            {/* <li class="nav-item">
              <a class="nav-link" href="/">
                Some Page
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/">
                Other Page
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
