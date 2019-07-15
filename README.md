# Server Side Rendering in Netlify

[Netlify](https://www.netlify.com) is famous for hosting static assets. Using a static-site-generator, you can host content that doesn't change on their platform, which has a lot of nice features.

But what about if you want to host dynamic content?

One option is to use [Netlify Functions](https://www.netlify.com/docs/functions/), which run JS Code on a server in the cloud somewhere, to host an API. You could then use client-side JS to load data from your API and update your page.

But what if you want server-side rendering of dynamic content?

This repo is an example of how to do that.

## Demo

This repo is deployed to https://hopeful-mcclintock-db6149.netlify.com/

## How it works

Basically it works using this config:

```
[build]
functions = "./functions"

[[redirects]]
  # Any routes we don't have a static page for, use a server-side-render function
  # The 200 status means it leaves the browser URL in place, it doesn't behave as a browser redirect.
  from = "/*"
  to = "/.netlify/functions/server-side-render"
  status = 200
```

You rewrite routes - in this case, using a wildcard - so any route for which we don't have a static page generated, gets rewritten to our Netlify Function.

(Note: the status 200 is used in the config to mean we should perform a rewrite, not a redirect. With a rewrite it is still possible for your server-side page to return a different HTTP status code.)

We can then use a Netlify Function to render a page:

```js
exports.handler = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: `<html>This was a ${event.httpMethod} HTTP request to ${event.path}</html>`
    )
  });
}
```

You can also set custom HTTP status codes:

```js
exports.handler = (event, context, callback) => {
  callback(null, {
    statusCode: 404,
    body: `<html>This event is returning a custom 404 Not Found status</html>`
  });
}
```

Or do a redirect, using HTTP headers to set the location:

```js
exports.handler = (event, context, callback) => {
  callback(null, {
    statusCode: 302,
    headers: {
      location: "https://html5zombo.com/"
    }
  });
}
```

In short, you can create a full server-side application using Netlify functions.

## FAQ

**Why would you want this?**

This allows you to write traditional server-side-rendered applications, which have some benefits - especially for users where JS is turned off, slow to run, or otherwise undesirable.

Server rendered pages also generally load faster than pages which fetch their data after loading.

**Isn't static site generation faster, cheaper, and more environmentally friendly?**

Yes. You should still statically generate any pages that don't change.

You get a certain number of Netlify Functions free per month, after that they cost money. They cost money because they use a server to execute JS to generate the HTML, for every page load. That's using real power in a real data centre somewhere, and takes real time to happen.

So for the sake of your bank account, your load times, and your environmental footprint, static generation still makes sense: especially on a high traffic site.

**Should I use this?**

I'm not sure! It isn't how the Netlify was designed, but it works. I did this because it seemed interesting, and I wanted to see if it works. Think carefully before relying on this for an important site.