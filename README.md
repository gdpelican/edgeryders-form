# Edgeryders Form


## 1. Overview

**Description.** A standalone, Vue.js based survey form builder software that posts its collected data as topics to a [Discourse](https://discourse.org/) forum. It is meant as a low-barrier way for potential new users to interact with a Discourse forum. Their first post is just about filling out a simple, minimalist looking form, and afterwards they already have a full Discourse account, will receive e-mail notifications about responses to their topic, and can engage further if they feel like it.

**Requirements.** Out of the box, the software works only with the modified Discourse installations of [edgeryders.eu](https://edgeryders.eu/) and its associated forums called "Edgeryders Communities". You can set up an equivalent installation with a separate SSO provider and SSO client Discourse installation, as per the instructions below. But if you operate a normal Discourse forum with direct login, it will be simpler to adapt this software accordingly.

**Architecture.** The application is a single-page web application made with Vue.js, using the API of two Discourse installations as its backend. One Discourse installation is the SSO provider, needed for creating a new user account. The other Discourse installation is the actual forum, needed to post a survey response under the Discourse account created for the user.


## 2. Installation

Installation is not trivial as this software needs a few modifications on the Discourse side to function (two API extension plugins plus configuration).

**1. Make sure all your Discourse sites use HTTPS**

Since we transfer API keys and passwords to them via API, this is strongly encouraged. Also if your Discourse Form Vue.js application is served by HTTPS, the Discourse APIs it accesses also need to use HTTPS or the browser will refuse to send the API requests due to "mixed content error".

**2. Install the multisite account Discourse plugin**

This plugin has to be installed on the Discourse instance used as the SSO provider. For the plugin source code and installation instructions, [see here](https://github.com/edgeryders/discourse/tree/multisite/plugins/edgeryders-multisite-accounts).

Note that this plugin needs a configuration section in `config/secrets.yml` of your Discourse installation where you define the `auth_key` (an anti-spam measure, [see here](https://edgeryders.eu/t/-/7904#heading--3-4)) and also enter the master API keys (called the "All Users" API keys in the Discourse backend) of all SSO client Discourse instances on which you want your installation(s) of this survey software to post. The configuration section will look like this:

```
production:
  auth_key: …
  sso_provider:
    hostname: login.example.com
    api_key: …
  communities:
    - hostname: forum1.example.com
      api_key: …
    - hostname: forum2.example.com
      api_key: …
    - hostname: forum3.example.com
      api_key: …
```


**3. Install the permit-api-cors Discourse plugin**

This plugin has to be installed on the Discourse instance providing the actual forum. For the plugin source code and installation instructions, [see here](https://github.com/edgeryders/permit-api-cors).

**4. Enable and configure CORS in Discourse**

This has to be done in both Discourse instances:

1. In a standalone ("no Docker") Discourse installation, edit the file `config/discourse.conf` and set `enable_cors = true` in there. Restart your Discourse web server afterwards. In a Docker-based installation, the configuration goes into `app.yml` in the project root folder in a slightly different form; we did not test that yet.

2. Add the domain that will host the Edgeryders Form Vue.js application to the `cors_origins` Discourse setting via the admin panel.

**5. Install the Egeryders Form software**

1. Clone the repository into a folder for serving a website:

    ```
    git clone https://github.com/edgeryders/edgeryders-form.git
    ```
2. Create a file `.env.production` in the root directory of the Git repository, with the following content adapted to the settings you need:

    ```
    # Our custom user creation endpoint at the Discourse SSO provider site.
    VUE_APP_DISCOURSE_USER_URL=http://login.example.com/multisite_account.json
    # auth_key, as configured in our multisite accounts Discourse plugin.
    VUE_APP_DISCOURSE_AUTH_KEY=<auth_key>
    # Domain of the Discourse forum to post survey responses on.
    VUE_APP_DISCOURSE_DOMAIN=forum1.example.com
    # API endpoint for posting survey responses.
    VUE_APP_DISCOURSE_TOPIC_URL=https://forum1.example.com/posts.json
    # Numeric category ID of a category where to post the survey responses.
    # The category must allow all users to post. To find the ID, see https://edgeryders.eu/t/-/6647#heading--2-1
    VUE_APP_DISCOURSE_CATEGORY=343
    ```

3. Install required package dependencies:

    ```
    yarn install
    ```
    
4. Compile and minify the site for production use:

    ```
    yarn run build
    ```

5. Configure your webserver to serve the website as static files, using the `build/` sub-directory as document root.

6. Enable HTTPS for serving the website. Not strictly required though.


## 3. Building the survey form

The form slide types, texts and buttons can be configured with JSON files as documented below.

[TODO]


## 4. Development

* To compile and hot-reload the site during development:

   ```
    yarn run serve
    ```

* To run the tests:

    ```
    yarn run test
    ```

* To lint and fix files:

    ```
    yarn run lint
    ```

* To customize your configuration, see [Configuration Reference](https://cli.vuejs.org/config/).


## 5. Documentation

API documentation:

* **multisite_account.json.** The custom Discourse API extension created by Edgeryders that allows to create a new account with Discourse as a SSO provider. See: [API documentation](https://edgeryders.eu/t/-/7904#heading--3-4), [plugin source code](https://github.com/edgeryders/discourse/tree/multisite/plugins/edgeryders-multisite-accounts).

* **posts.json.** Part of the standard [Discourse API](https://docs.discourse.org/), and used to create a new topic with the survey response, under a Discourse account created for that user. See: [API documentation](https://docs.discourse.org/#tag/Posts/paths/~1posts.json/post).
