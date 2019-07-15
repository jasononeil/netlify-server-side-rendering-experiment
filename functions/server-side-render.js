exports.handler = (event, context, callback) => {
  switch (event.path) {
    case "/status":
      // Demonstrate setting a custom status, despite the redirect file specifying "200"
      callback(null, {
        statusCode: 404,
        body: printHtml(`This event is returning a custom 404 Not Found status`)
      });
      break;
    case "/redirect":
      // Demonstrate setting a redirect, despite the function being called from a rediriect.
      callback(null, {
        statusCode: 302,
        headers: {
          location: "https://html5zombo.com/"
        }
      });
      break;
    default:
      // Demonstrate normal server-side rendering
      callback(null, {
        statusCode: 200,
        body: printHtml(
          `This was a ${event.httpMethod} HTTP request to ${event.path}`
        )
      });
  }
};

function printHtml(message) {
  return `<html>
  <head>
    <title>Example of server-side rendering in Netlify</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro"></link>
    <link rel="stylesheet" href="/style.css"></link>
    <meta name="generator" value="Server-Rendered HTML!" />
  </head>
  <body>
    <header>
      <h1>An example of server-side rendering in Netlify</h1>
    </header>
    <article>
      <p>
        ${message}
      </p>
      <p><a href="https://github.com/jasononeil/netlify-server-side-rendering-experiment">What is this? (and how? and why?)</a></p>
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
          <a href="/status">
            A "Not Found 404" page
          </a>
        </li>
        <li>
          <a href="/redirect">
            A HTTP 302 Redirect
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
</html>
`;
}
