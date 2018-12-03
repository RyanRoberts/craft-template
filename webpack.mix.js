// Set the mix variable
const mix = require("laravel-mix");

/* Mix Plugins */
require("laravel-mix-purgecss");
require("laravel-mix-tailwind");
require("laravel-mix-banner");
require("laravel-mix-eslint");
require("laravel-mix-critical");

/**
 * Start the Mix function
 */
mix
  .setPublicPath("./web/dist")
  .banner({
    banner: (function() {
      const moment = require("moment");
      const gitRevSync = require("git-rev-sync");

      return [
        "/**",
        " * @project        Marbles Website",
        " * @author         Marbles",
        " * @build          " + moment().format("llll") + " GMT+1",
        " * @release        " +
          gitRevSync.long() +
          " [" +
          gitRevSync.branch() +
          "]",
        " * @copyright      Copyright (c) " +
          moment().format("YYYY") +
          ", Marbles",
        " *",
        " */",
        ""
      ].join("\n");
    })(),
    raw: true,
    entryOnly: true
  })
  .js("./src/js/site.js", "./web/dist/js/")
  .eslint()
  .sass("./src/scss/site.scss", "./web/dist/css")
  .tailwind()
  .critical({
    urls: [
      {
        src: process.env.BASE_URL + "/",
        dest: "./templates/index_critical.min.css"
      }
    ],
    options: {
      minify: true,
      width: 1200,
      height: 1200
    }
  })
  .purgeCss({
    enabled: mix.inProduction(),
    globs: [
      path.join(__dirname, "/templates/**/*.{html,twig}"),
      path.join(__dirname, "/src/scss/*.scss")
    ],
    extensions: ["html", "js", "php", "vue", "twig", "scss", "css"],
    whitelistPatterns: [/ls-blur-up-img/],
    whitelistPatternsChildren: [/body/, /ls-blur-up-img/]
  })
  .version();
