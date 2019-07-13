const printHtml = message => {
  return `<html>
  <head>
    <title>Example of server-side rendering in Netlify</title>
    <meta name="generator" value="Hand-crafted HTML" />
  </head>
  <body>
    <article>
      <h1>An example of server-side rendering in Netlify</h1>
      <p>
        This page is HTML produced with server-side-rendering, served using Netlify Functions
      </p>
      <p>
        ${message}
      </p>
    </article>
    <nav>
      <ul>
        <li><a href="/">A static HTML page</a></li>
        <li>
          <a href="/some-server-side-page">
            A server-side rendered HTML page
          </a>
        </li>
        <li>
          <a href="/page/that/renders/server/side">
            Another server-side rendered HTML page
          </a>
        </li>
        <li>
          <form method="POST" action="/do/something">
            <button type="submit">
              A server-side rendered form submission
            </button>
          </form>
        </li>
      </ul>
    </nav>
  </body>
</html>`;
};

exports.handler = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: printHtml(`This was a ${event.httpMethod} HTTP request to ${event.path}`)
  });
};
