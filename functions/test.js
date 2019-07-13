exports.handler = (event, context, callback) => {
    callback(null, {
      statusCode: 200,
      body: 'This is coming from an API!'
    })
  }