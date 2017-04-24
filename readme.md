# Toki Reference Implementation
> A sample toki setup

## Getting up and running

```javascript
npm install
npm start
```

We've already configured this for you, but at minimum to get started with toki you need three things:

+ A webserver, in this case we're using `hapi`
+ Toki itself, under the `toki` module.
+ The appropriate bridge for your webserver, in this case `toki-hapi-bridge`

As we've shown in the included index.js file, you simply set up your webserver as normal, register the bridge as you would any other server plugin/router/middleware, and bring your server up.

Toki will by default get any configs from your config/ folder, starting with the `default.json` config and then loading any environment specific configs (`qa.json`, `production.json`).

## Logging

Toki allows you to use your own logger out of the box, simply pass it in to the bridge under `logging` when you hook it up. Whatever you pass in the logging config slot should meet the log4j logging standard, or in another words, expose at least an `info` and an `error` method. If it supports `warn`, `debug` and/or `trace` then toki will make use of those, or fall back to `info/error` as appropriate.

## Methods and Config

Toki is controlled through it's config. A simple config is as follows:

```
{
    "toki": {
        "routes": [
            {
                "path"       : "/test",
                "httpAction" : "GET",
                "tags"       : ["api"],
                "description": "Example endpoint",
                "actions"    : [
                    {
                        "name": "action 1",
                        "type": "toki-method-http",
                        "inputConfiguration": {
                            "url": "http://example.com",
                            "method": "get"
                        },
                        "clientResponseConfiguration": true
                    }
                ]
            }
        ]
    }
}
```

### Proxy Config

To have Toki simply proxy an existing test api, you can use the toki-method-proxy:

```
{
    "toki": {
        "routes": [
            {
                "path"       : "/proxy",
                "httpAction" : "GET",
                "tags"       : ["api"],
                "description": "Example endpoint",
                "actions"    : [
                    {
                        "name": "action 1",
                        "type": "toki-method-proxy",
                        "destination": "http://example.com"
                    }
                ]
            }
        ]
    }
}
```
