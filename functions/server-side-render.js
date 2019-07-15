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
  // Demonstrate setting a custom status, despite the redirect file specifying "200"
  if (event.path === "/status") {
    callback(null, {
      statusCode: 404,
      body: printHtml(`This event is returning a custom 404 Not Found status`)
    });
    return;
  }
  // Demonstrate setting a redirect, despite the function being called from a rediriect.
  if (event.path === "/redirect") {
    callback(null, {
      statusCode: 302,
      headers: {
        location: 'https://html5zombo.com/'
      }
    });
    return;
  }
  callback(null, {
    statusCode: 200,
    body: printHtml(`This was a ${event.httpMethod} HTTP request to ${event.path}`)
  });
};
