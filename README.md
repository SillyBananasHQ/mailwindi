<div align="center">
  <h1>
    <br/>
    <br/>
    📫
    <br />
    mailwindi
    <br />
    <br />
    <br />
    <br />
  </h1>
  <sup>
    <br />
    WindiCSS Email template compiler</em>
    <br />
    <br />
  </sup>
  <br />
  <br />
</div>

## ❓ What?

Creating HTML email template has, and probably always will, be a pain.
This package is designed to try & make it a bit easier to use by letting you use [WindiCSS](https://windicss.org/) to handle styles for your email templates.

## 👶 Example

A basic example to show how it works:

```html
<!-- input.html -->
<html>
  <body>
    <p class="font-bold text-lg">Welcome</p>
  </body>
</html>
```

Run the following command:

```zsh
mailwindi -i input.html
```

And will generate the following inlined HTML file:

```html
<html>
  <body>
    <p class="font-bold text-lg" style="font-size: 18px; font-weight: 700;">
      Welcome
    </p>
  </body>
</html>
```

## 🚀 Install

Install the CLI globally

```zsh
npm i -g mailwindi
```

Or use `npx`

```zsh
npx mailwindi
```

## 🦄 Usage

Design your email template in plain HTML & [WindiCSS utility classes](https://windicss.org/) like you normally would for the web.

Then run the following command to generate the same email template but with all styles inlined.

```zsh
mailwind -i input.html
```

## 🔧 Options

`--input`: Input file path

- Default: `index.html`
- Optional: `true`

`--minify`: Output file path

- Default: `[NAME]-inline.html`
- Optional: `true`

`-c`: Config file path

- Default: `./windi.config.js`
- Optional: `true`

### ❤️ Credits

- [Soheil Rashidi](https://github.com/soheilpro) - Original project inspiration with [Mailwind](https://github.com/soheilpro/mailwind)
